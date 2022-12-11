import { Route, Router } from "electron-router-dom";
import { Fragment } from "react";
import { Blank } from "./pages/Blank";
import { Document } from "./pages/Document";

export const Routes: React.FC = () => (
  <Router
    main={
      <Fragment>
        <Route path="/" element={<Blank />} />
        <Route path="/document" element={<Document />} />
      </Fragment>
    }
  />
);
