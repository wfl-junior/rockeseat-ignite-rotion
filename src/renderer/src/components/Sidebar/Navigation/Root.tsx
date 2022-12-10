import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root(props: RootProps) {
  return (
    <nav className="text-rotion-100 mx-2 flex flex-col gap-8" {...props} />
  );
}
