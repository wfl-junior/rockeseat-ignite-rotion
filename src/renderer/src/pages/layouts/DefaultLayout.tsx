import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export const DefaultLayout: React.FC = () => (
  <div className="bg-rotion-900 text-rotion-100 flex h-screen w-screen">
    <Sidebar />

    <div className="flex max-h-screen flex-1 flex-col">
      <Header />
      <Outlet />
    </div>
  </div>
);
