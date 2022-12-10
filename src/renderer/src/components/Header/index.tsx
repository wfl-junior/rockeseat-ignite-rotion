import clsx from "clsx";
import { CaretDoubleRight, Code, TrashSimple } from "phosphor-react";
import * as Breadcrumbs from "./Breadcrumbs";

export function Header() {
  const isMacOS = process.platform === "darwin";
  const isSidebarOpen = true;

  return (
    <div
      id="header"
      className={clsx(
        "border-rotion-600 duration-250 region-drag flex items-center gap-4 border-b py-[1.125rem] px-6 leading-tight transition-all",
        {
          "pl-24": !isSidebarOpen && isMacOS,
          "w-screen": !isSidebarOpen,
          "w-[calc(100vw-240px)]": isSidebarOpen,
        },
      )}
    >
      <button
        className={clsx("text-rotion-200 hover:text-rotion-50 h-5 w-5", {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </button>

      <>
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
          <button className="text-rotion-100 hover:text-rotion-50 inline-flex items-center gap-1 text-sm">
            <TrashSimple className="h-4 w-4" />
            Apagar
          </button>
        </div>
      </>
    </div>
  );
}
