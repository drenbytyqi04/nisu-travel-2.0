import { hashSeed, rng } from "./utils";

/**
 * Art direction for the destination plates.
 *
 * Each palette is sampled from the light of the real place — Santorini's
 * bleached blue, Dubai's amber dusk, Bali's wet green — so the imagery is
 * specific to the subject rather than a generic gradient set.
 */
export type Palette = {
  /** Sky, top to horizon. */
  sky: [string, string];
  /** Low sun / haze bloom. */
  glow: string;
  /** Landmass silhouette, far to near is derived from this. */
  land: string;
  /** Water or ground plane. Omit for inland scenes. */
  water?: string;
};

export type Composition =
  | "coast"
  | "peaks"
  | "city"
  | "desert"
  | "tropic"
  | "aerial";

export const PALETTES = {
  /** Bosphorus dusk — minarets against a smoke-and-rose sky. */
  bosphorus: {
    sky: ["#131a2a", "#8a5a6b"],
    glow: "#e0a06a",
    land: "#1c2436",
    water: "#16202f",
  },
  /** Gulf heat haze, amber over sand. */
  gulf: {
    sky: ["#171320", "#b4763f"],
    glow: "#f0b167",
    land: "#25202a",
    water: "#241d24",
  },
  /** Aegean noon — the blue everything is measured against. */
  aegean: {
    sky: ["#0f2233", "#5f9fc4"],
    glow: "#eae3d2",
    land: "#16202b",
    water: "#123044",
  },
  /** Volcanic green, humid light. */
  tropic: {
    sky: ["#0d1c1a", "#3f8c72"],
    glow: "#cfe6b8",
    land: "#122320",
    water: "#0f2622",
  },
  /** Alpine — cold blue shadow, snow catching the last light. */
  alpine: {
    sky: ["#101823", "#6f93b5"],
    glow: "#e6ecf2",
    land: "#161e2a",
  },
  /** Nile evening, dry gold. */
  nile: {
    sky: ["#16131b", "#a8763c"],
    glow: "#e8c07a",
    land: "#1e1a1e",
    water: "#1a1c22",
  },
  /** Mediterranean city, warm terracotta dusk. */
  catalan: {
    sky: ["#131521", "#9c5f57"],
    glow: "#e9a279",
    land: "#1a1c28",
  },
  /** Northern Europe — cool, composed, low contrast. */
  rhine: {
    sky: ["#101620", "#5d7086"],
    glow: "#c9d6e2",
    land: "#161b24",
    water: "#141a23",
  },
  /** House jade — used where no single place is meant. */
  jade: {
    sky: ["#08120e", "#2f7a58"],
    glow: "#8ad98f",
    land: "#0d1815",
    water: "#0a1512",
  },
  /** Altitude: the view from the window seat. */
  altitude: {
    sky: ["#050912", "#4e7fa8"],
    glow: "#f2e2c8",
    land: "#0b1119",
  },
  /** Night departure — the terminal at 05:00. */
  terminal: {
    sky: ["#080a0e", "#2c3a4a"],
    glow: "#9fb6c7",
    land: "#0c1118",
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

/**
 * A smooth seeded ridge across the plate, returned as an SVG path.
 * `roughness` controls how jagged the profile reads: alpine vs. dune.
 */
export function ridgePath(
  seed: number,
  {
    baseline,
    amplitude,
    points = 9,
    roughness = 1,
    width = 1600,
    height = 1000,
  }: {
    baseline: number;
    amplitude: number;
    points?: number;
    roughness?: number;
    width?: number;
    height?: number;
  },
) {
  const random = rng(seed);
  const ys: number[] = [];
  for (let i = 0; i <= points; i++) {
    // Blend a slow swell with a faster, seeded jitter.
    const swell = Math.sin((i / points) * Math.PI * 1.3 + random()) * 0.5;
    const jitter = (random() - 0.5) * roughness;
    ys.push(baseline - (swell + jitter) * amplitude);
  }

  const step = width / points;
  let d = `M 0 ${ys[0].toFixed(1)}`;
  for (let i = 1; i <= points; i++) {
    const x = i * step;
    const prevX = (i - 1) * step;
    const cx1 = prevX + step * 0.5;
    const cx2 = x - step * 0.5;
    d += ` C ${cx1.toFixed(1)} ${ys[i - 1].toFixed(1)}, ${cx2.toFixed(1)} ${ys[i].toFixed(1)}, ${x.toFixed(1)} ${ys[i].toFixed(1)}`;
  }
  d += ` L ${width} ${height} L 0 ${height} Z`;
  return d;
}

/** Seeded skyline for city plates — towers, not mountains. */
export function skylinePath(
  seed: number,
  {
    baseline,
    maxHeight,
    width = 1600,
    height = 1000,
    count = 26,
  }: {
    baseline: number;
    maxHeight: number;
    width?: number;
    height?: number;
    count?: number;
  },
) {
  const random = rng(seed);
  let d = `M 0 ${height} L 0 ${baseline}`;
  let x = 0;
  while (x < width) {
    const w = (width / count) * (0.5 + random() * 1.4);
    // Bias towards a cluster in the middle third of the frame.
    const centreBias = 1 - Math.abs(x / width - 0.5) * 1.2;
    const h = maxHeight * (0.2 + random() * 0.8) * Math.max(0.25, centreBias);
    const top = baseline - h;
    d += ` L ${x.toFixed(1)} ${top.toFixed(1)} L ${Math.min(x + w, width).toFixed(1)} ${top.toFixed(1)}`;
    x += w;
  }
  d += ` L ${width} ${baseline} L ${width} ${height} Z`;
  return d;
}

/** Rolling dunes: same idea as a ridge, but soft and overlapping. */
export function dunePath(
  seed: number,
  { baseline, amplitude, width = 1600, height = 1000 }: { baseline: number; amplitude: number; width?: number; height?: number },
) {
  return ridgePath(seed, { baseline, amplitude, points: 4, roughness: 0.35, width, height });
}

export type PlateSpec = {
  palette: Palette;
  composition: Composition;
  seed: number;
};

export function plateSpec(
  key: string,
  paletteName: PaletteName,
  composition: Composition,
): PlateSpec {
  return {
    palette: PALETTES[paletteName],
    composition,
    seed: hashSeed(key),
  };
}
