import { cn } from "@/lib/utils";
import {
  dunePath,
  ridgePath,
  skylinePath,
  type Composition,
  type Palette,
} from "@/lib/art";
import { rng } from "@/lib/utils";

const W = 1600;
const H = 1000;

type Props = {
  palette: Palette;
  composition: Composition;
  seed: number;
  className?: string;
  /** Draws a dashed great-circle route with a marker — used by the diaspora map. */
  route?: boolean;
};

/**
 * A generated cinematic plate.
 *
 * Renders as pure inline SVG: no network request, no layout shift, no
 * decoding cost, and it grades correctly against the charcoal ground in a
 * way stock photography usually does not. Swap in real photography by
 * setting `src` on the matching entry in `src/lib/images.ts`.
 */
export function Plate({ palette, composition, seed, className, route }: Props) {
  const id = `p${seed.toString(36)}`;
  const random = rng(seed);
  const horizon = composition === "aerial" ? 0.52 : 0.62;
  const sunX = 0.2 + random() * 0.6;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky[0]} />
          <stop offset="100%" stopColor={palette.sky[1]} />
        </linearGradient>

        <radialGradient id={`${id}-glow`} cx={sunX} cy={horizon} r="0.62">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.85" />
          <stop offset="38%" stopColor={palette.glow} stopOpacity="0.28" />
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.22" />
          <stop offset="45%" stopColor={palette.water ?? palette.land} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#07090b" stopOpacity="1" />
        </linearGradient>

        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07090b" stopOpacity="0" />
          <stop offset="100%" stopColor="#07090b" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />

      {/* Haze bands sitting just above the horizon read as atmosphere. */}
      {composition !== "aerial" &&
        Array.from({ length: 3 }).map((_, i) => {
          const y = H * horizon - 60 - i * (40 + random() * 60);
          return (
            <rect
              key={i}
              x="0"
              y={y}
              width={W}
              height={10 + random() * 16}
              fill={palette.glow}
              opacity={0.05 + random() * 0.05}
            />
          );
        })}

      {composition === "aerial" && (
        <g>
          {/* Bright band right on the horizon: the view from the window seat. */}
          <rect
            x="0"
            y={H * horizon - 6}
            width={W}
            height="12"
            fill={palette.glow}
            opacity="0.5"
          />
          <rect
            x="0"
            y={H * horizon - 46}
            width={W}
            height="46"
            fill={palette.glow}
            opacity="0.14"
          />

          {/* Cloud deck below the horizon, thinning towards the far edge. */}
          {Array.from({ length: 11 }).map((_, i) => {
            const t = i / 10;
            const cy = H * (horizon + 0.03) + t * H * 0.44;
            return (
              <ellipse
                key={i}
                cx={W * random()}
                cy={cy}
                rx={200 + random() * 460}
                ry={14 + t * 44 + random() * 20}
                fill={palette.glow}
                opacity={0.1 + t * 0.16}
              />
            );
          })}
        </g>
      )}

      {palette.water && composition !== "aerial" && (
        <rect
          x="0"
          y={H * horizon}
          width={W}
          height={H * (1 - horizon)}
          fill={`url(#${id}-water)`}
        />
      )}

      {/* Landform: three depth layers, each darker and nearer than the last. */}
      {composition === "city" ? (
        <>
          <path
            d={skylinePath(seed, { baseline: H * horizon, maxHeight: 300, count: 30, width: W, height: H })}
            fill={palette.land}
            opacity="0.55"
          />
          <path
            d={skylinePath(seed + 7, { baseline: H * horizon + 34, maxHeight: 220, count: 20, width: W, height: H })}
            fill="#07090b"
            opacity="0.8"
          />
        </>
      ) : composition === "desert" ? (
        <>
          <path d={dunePath(seed, { baseline: H * horizon + 20, amplitude: 90, width: W, height: H })} fill={palette.land} opacity="0.7" />
          <path d={dunePath(seed + 3, { baseline: H * horizon + 120, amplitude: 130, width: W, height: H })} fill="#07090b" opacity="0.85" />
        </>
      ) : composition === "aerial" ? null : (
        <>
          <path
            d={ridgePath(seed, {
              baseline: H * horizon,
              amplitude: composition === "peaks" ? 220 : 90,
              roughness: composition === "peaks" ? 1.5 : 0.6,
              points: composition === "peaks" ? 11 : 7,
              width: W,
              height: H,
            })}
            fill={palette.land}
            opacity="0.6"
          />
          <path
            d={ridgePath(seed + 11, {
              baseline: H * horizon + (composition === "peaks" ? 90 : 46),
              amplitude: composition === "peaks" ? 150 : 60,
              roughness: composition === "peaks" ? 1.2 : 0.5,
              points: composition === "peaks" ? 9 : 6,
              width: W,
              height: H,
            })}
            fill="#07090b"
            opacity="0.86"
          />
        </>
      )}

      {route && (
        <g>
          <path
            d={`M ${W * 0.22} ${H * 0.66} Q ${W * 0.5} ${H * 0.3} ${W * 0.78} ${H * 0.48}`}
            fill="none"
            stroke="#5dbb63"
            strokeWidth="3"
            strokeDasharray="14 12"
            opacity="0.85"
          />
          <circle cx={W * 0.22} cy={H * 0.66} r="9" fill="#5dbb63" />
          <circle cx={W * 0.78} cy={H * 0.48} r="9" fill="#8fc7e8" />
        </g>
      )}

      {/* Grade the base of every plate into the page ground. */}
      <rect x="0" y={H * 0.68} width={W} height={H * 0.32} fill={`url(#${id}-fade)`} />
    </svg>
  );
}
