import { Link } from "react-router-dom";

export const Blank: React.FC = () => (
  <main className="text-rotion-400 flex flex-1 items-center justify-center">
    Selecione ou crie um documento
    <Link to="/document">Acessar document</Link>
  </main>
);
