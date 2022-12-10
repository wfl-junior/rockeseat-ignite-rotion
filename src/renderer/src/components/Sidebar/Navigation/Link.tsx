import clsx from "clsx";
import { DotsThree } from "phosphor-react";
import { ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
}

export function Link({ children }: LinkProps) {
  return (
    <a
      href="#"
      className={clsx(
        "text-rotion-100 hover:text-rotion-50 hover:bg-rotion-700 group flex items-center gap-2 rounded py-1 px-3 text-sm",
      )}
    >
      <span className="flex-1 truncate">{children}</span>

      <div className="text-rotion-100 ml-auto flex h-full items-center group-hover:visible">
        <button className="hover:bg-rotion-500 rounded-sm px-px">
          <DotsThree weight="bold" className="h-4 w-4" />
        </button>
      </div>
    </a>
  );
}
