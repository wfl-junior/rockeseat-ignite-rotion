import { ReactNode } from "react";

interface ToCRootProps {
  children: ReactNode;
}

export function ToCRoot(props: ToCRootProps) {
  return (
    <div
      className="text-rotion-100 mt-2 flex flex-col gap-2 text-sm"
      {...props}
    />
  );
}
