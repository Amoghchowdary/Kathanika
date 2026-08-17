import logo from "@/assets/kathanika-logo-client.png";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Kathanika Media"
      width={1919}
      height={717}
      className={cn("h-9 w-auto object-contain sm:h-10", className)}
    />
  );
}
