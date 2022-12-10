import clsx from "clsx";
import { ReactNode } from "react";

interface ItemProps {
  isActive?: boolean;
  children: ReactNode;
}

export function Item({ isActive = false, children }: ItemProps) {
  const Comp = isActive ? "span" : "a";

  return (
    <Comp
      href="#"
      className={clsx("hover:text-rotion-50 inline-flex items-center gap-2", {
        "text-rotion-50": isActive,
      })}
    >
      {children}
    </Comp>
  );
}
