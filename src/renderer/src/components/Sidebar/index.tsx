import * as Collapsible from "@radix-ui/react-collapsible";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { CaretDoubleLeft } from "phosphor-react";
import { CreatePage } from "./CreatePage";
import * as Navigation from "./Navigation";
import { Profile } from "./Profile";
import { Search } from "./Search";

export function Sidebar() {
  const { data } = useQuery(["documents"], () => window.api.getDocuments());

  const isMacOS = process.platform === "darwin";

  return (
    <Collapsible.Content asChild>
      <aside className="bg-rotion-800 border-rotion-600 data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out group relative h-screen flex-shrink-0 overflow-hidden border-r">
        <Collapsible.Trigger
          className={clsx(
            "text-rotion-200 hover:text-rotion-50 absolute right-4 inline-flex h-5 w-5 items-center justify-center",
            isMacOS ? "top-[1.125rem]" : "top-6",
          )}
        >
          <CaretDoubleLeft className="h-4 w-4" />
        </Collapsible.Trigger>

        <div
          className={clsx("region-drag h-14", isMacOS ? "block" : "hidden")}
        />

        <div
          className={clsx(
            "flex h-full w-[240px] flex-1 flex-col gap-8 transition-opacity duration-200 group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0",
            {
              "pt-6": !isMacOS,
            },
          )}
        >
          <Profile />
          <Search />

          <Navigation.Root>
            <Navigation.Section>
              <Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
              <Navigation.SectionContent>
                {data?.map(document => (
                  <Navigation.Link key={document.id}>
                    {document.title}
                  </Navigation.Link>
                ))}
              </Navigation.SectionContent>
            </Navigation.Section>
          </Navigation.Root>

          <CreatePage />
        </div>
      </aside>
    </Collapsible.Content>
  );
}
