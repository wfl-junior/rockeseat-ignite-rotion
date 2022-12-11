import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import { File, MagnifyingGlass } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Document } from "~/shared/types/ipc";
import { QueryKeys } from "../../lib/react-query";

interface SearchBarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: documents } = useQuery([QueryKeys.DOCUMENTS], async () => {
    const { documents } = await window.api.documents.getAll();
    return documents;
  });

  const filteredDocuments = useMemo(() => {
    if (!documents) return null;
    if (!query) return documents;

    return documents.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }, [documents, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  function handleOpenDocument(id: Document["id"]) {
    navigate(`/documents/${id}`);
    onOpenChange(false);
  }

  return (
    <Command.Dialog
      className="bg-rotion-800 text-rotion-100 border-rotion-600 fixed top-24 left-1/2 w-[480px] max-w-full -translate-x-1/2 rounded-md border shadow-2xl"
      open={isOpen}
      onOpenChange={onOpenChange}
      label="Search"
      shouldFilter={false}
    >
      <div className="border-rotion-700 flex items-center gap-2 border-b p-4">
        <MagnifyingGlass className="h-5 w-5" />

        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="text-rotion-50 placeholder:text-rotion-200 w-full bg-transparent text-sm focus:outline-none"
          value={query}
          onValueChange={setQuery}
        />
      </div>

      <Command.List className="scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800 max-h-48 py-2">
        <Command.Empty className="text-rotion-200 py-3 px-4 text-sm">
          Nenhum documento encontrado.
        </Command.Empty>

        {filteredDocuments?.map(({ id, title }) => (
          <Command.Item
            key={id}
            value={id}
            onSelect={handleOpenDocument}
            className="text-rotion-50 hover:bg-rotion-700 aria-selected:!bg-rotion-600 flex cursor-pointer items-center gap-2 py-3 px-4 text-sm"
          >
            <File className="h-5 w-5" />
            {title}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
};
