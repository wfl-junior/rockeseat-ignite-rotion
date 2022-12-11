import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "phosphor-react";
import type { Document } from "~/shared/types/ipc";

export const NewDocumentButton: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const { document } = await window.api.documents.create();
        return document;
      },
      {
        onSuccess: newDocument => {
          queryClient.setQueryData<Document[]>(
            ["documents"],
            (documents = []) => [...documents, newDocument],
          );
        },
      },
    );

  async function handleCreateNewDocument() {
    await createDocument();
  }

  return (
    <button
      onClick={handleCreateNewDocument}
      disabled={isCreatingNewDocument}
      className="border-rotion-600 hover:bg-rotion-700 absolute bottom-0 left-0 right-0 flex w-[240px] items-center gap-2 border-t px-5 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  );
};
