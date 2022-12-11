import { Route, Router } from "electron-router-dom";
import { Blank } from "./pages/Blank";
import { Document } from "./pages/Document";
import { DefaultLayout } from "./pages/layouts/DefaultLayout";

export const Routes: React.FC = () => (
  <Router
    main={
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Blank />} />
        <Route path="/documents/:id" element={<Document />} />
      </Route>
    }
  />
);
