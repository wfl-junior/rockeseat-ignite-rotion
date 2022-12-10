import { MagnifyingGlass } from "phosphor-react";

export function Search() {
  return (
    <button className="text-rotion-100 hover:text-rotion-50 mx-5 flex items-center gap-2 text-sm">
      <MagnifyingGlass className="h-5 w-5" />
      Busca rápida
    </button>
  );
}
