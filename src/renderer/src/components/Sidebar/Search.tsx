import { MagnifyingGlass } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "p" && (event.ctrlKey || event.metaKey)) {
        setIsOpen(state => !state);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleOpenSearchBar() {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <button
        onClick={handleOpenSearchBar}
        className="text-rotion-100 hover:text-rotion-50 mx-5 flex items-center gap-2 text-sm"
      >
        <MagnifyingGlass className="h-5 w-5" />
        Busca rápida
      </button>

      <SearchBar isOpen={isOpen} onOpenChange={setIsOpen} />
    </Fragment>
  );
};
