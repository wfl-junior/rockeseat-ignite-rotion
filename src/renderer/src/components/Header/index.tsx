import * as Collapsible from "@radix-ui/react-collapsible";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { CaretDoubleRight, Code, TrashSimple } from "phosphor-react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Document } from "~/shared/types/ipc";
import * as Breadcrumbs from "./Breadcrumbs";

interface HeaderProps {
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: deleteDocument, isLoading: isDeletingDocument } =
    useMutation(
      async () => {
        await window.api.documents.delete({ id: id! });
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<Document[]>(
            ["documents"],
            (documents = []) => {
              return documents.filter(document => document.id !== id);
            },
          );

          navigate("/");
        },
      },
    );

  const isMacOS = process.platform === "darwin";

  async function handleDeleteDocument() {
    await deleteDocument();
  }

  return (
    <div
      id="header"
      className={clsx(
        "border-rotion-600 duration-250 region-drag flex h-[57px] items-center gap-4 border-b py-[1.125rem] px-6 leading-tight transition-all",
        isSidebarOpen ? "w-[calc(100vw-240px)]" : "w-screen",
        {
          "pl-24": !isSidebarOpen && isMacOS,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          "text-rotion-200 hover:text-rotion-50 h-5 w-5",
          isSidebarOpen ? "hidden" : "block",
        )}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {Boolean(id) && (
        <Fragment>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="region-no-drag inline-flex">
            <button
              onClick={handleDeleteDocument}
              disabled={isDeletingDocument}
              className="text-rotion-100 hover:text-rotion-50 inline-flex items-center gap-1 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};
