import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export const App: React.FC = () => (
  <div className="bg-rotion-900 text-rotion-100 flex h-screen w-screen">
    <Sidebar />

    <div className="flex max-h-screen flex-1 flex-col">
      <Header />

      <main className="text-rotion-400 flex flex-1 items-center justify-center">
        Selecione ou crie um documento
      </main>
    </div>
  </div>
);
