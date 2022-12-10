import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root(props: RootProps) {
  return (
    <div className="flex flex-1 items-center overflow-hidden">
      <div className="text-rotion-100 region-no-drag inline-flex items-center gap-2 whitespace-nowrap text-sm">
        {props.children}
      </div>
    </div>
  );
}
