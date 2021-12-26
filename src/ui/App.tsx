import React, { useEffect } from "react";
import DBConnectionForm from "./DBConnection/Form";
const ipcRenderer = window.require("electron").ipcRenderer;
import { InitialQueryResult } from "../types/interfaces";
import { useNavigate } from "react-router";

export const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on(
      "tables",
      (event, data: { rows: InitialQueryResult; databaseName: string }) => {
        navigate(`/database/${data.databaseName}`, {
          state: { rows: data.rows },
        });
      }
    );
  }, []);

  return (
    <div>
      <DBConnectionForm />
    </div>
  );
};
