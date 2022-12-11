import { Editor } from "../components/Editor";
import { ToC } from "../components/ToC";

export const Document: React.FC = () => (
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
      <Editor />
    </section>
  </main>
);
