import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Document as DocumentDTO } from "~/shared/types/ipc";
import { Editor, OnContentUpdateParams } from "../components/Editor";
import { ToC } from "../components/ToC";
import { QueryKeys } from "../lib/react-query";

export const Document: React.FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isFetching: isFetchingDocument } = useQuery(
    [QueryKeys.DOCUMENT, id],
    async () => {
      const { document } = await window.api.documents.getOne({ id: id! });
      return document;
    },
  );

  const { mutateAsync: updateDocument } = useMutation(
    async (data: OnContentUpdateParams) => {
      const { document } = await window.api.documents.update({
        ...data,
        id: id!,
      });

      return document;
    },
    {
      onSuccess: updatedDocument => {
        queryClient.setQueryData<DocumentDTO[]>(
          [QueryKeys.DOCUMENTS],
          documents => {
            return documents?.map(document => {
              if (document.id === updatedDocument.id) {
                return updatedDocument;
              }

              return document;
            });
          },
        );
      },
    },
  );

  const initialContent = useMemo((): string => {
    if (!data) return "";
    return `<h1>${data.title}</h1>${data.content || "<p></p>"}`;
  }, [data]);

  async function handleEditorContentUpdate(params: OnContentUpdateParams) {
    await updateDocument(params);
  }

  return (
    <main className="flex flex-1 gap-8 py-12 px-10">
      <aside className="sticky top-0 hidden lg:block">
        <span className="text-rotion-300 text-xs font-semibold uppercase">
          Table of Contents
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>

          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex flex-1 flex-col items-center">
        {!isFetchingDocument && data && (
          <Editor
            content={initialContent}
            onContentUpdate={handleEditorContentUpdate}
          />
        )}
      </section>
    </main>
  );
};
