import { Plus } from "phosphor-react";

export function CreatePage() {
  return (
    <button className="border-rotion-600 hover:bg-rotion-700 absolute bottom-0 left-0 right-0 flex w-[240px] items-center gap-2 border-t px-5 py-4 text-sm disabled:opacity-60">
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  );
}
