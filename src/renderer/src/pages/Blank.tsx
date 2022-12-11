import { Link } from "react-router-dom";

export const Blank: React.FC = () => (
  <main className="text-rotion-400 flex flex-1 items-center justify-center">
    <span>Selecione ou crie um documento &nbsp;</span>

    <Link to="/document" className="hover:underline">
      Acessar document
    </Link>
  </main>
);
