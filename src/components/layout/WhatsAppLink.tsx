import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappLink, whatsappMessage } from "@/content/site.config";
import { cn } from "@/lib/utils";

type Props = Omit<ButtonProps, "asChild"> & {
  message?: string;
  label?: string;
  showIcon?: boolean;
};

/**
 * Every WhatsApp CTA on the site routes through here.
 *
 * If `contact.whatsapp` is unset in site.config.ts, this renders nothing at
 * all rather than a dead link or an invented number.
 */
export function WhatsAppLink({
  message = whatsappMessage,
  label = "WhatsApp Us",
  showIcon = true,
  className,
  variant = "whatsapp",
  size,
  ...props
}: Props) {
  const href = whatsappLink(message);
  if (!href) return null;

  return (
    <Button asChild variant={variant} size={size} className={cn(className)} {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {showIcon && <MessageCircle aria-hidden="true" />}
        {label}
      </a>
    </Button>
  );
}
