import { Button, IconButton, List, Paper, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ColumnsInTable,
  DatabaseRow,
  InitialQueryResult,
  QueryResultField,
} from "../../types/interfaces";

import { DatabaseTableListItem } from "./DatabaseTableListItem";
import { SQLEditor } from "./Editor";
import { ResultTable } from "./ResultTable/Table";
const ipcRenderer = window.require("electron").ipcRenderer;

export const Database: React.FC = () => {
  const { databaseName } = useParams();
  const location = useLocation();
  const [rows, setRows] = useState<DatabaseRow[]>([]);
  const [queryResult, setQueryResult] = useState<{
    fields: QueryResultField[];
    rows: any[];
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on("queryError", (event, error) => {
      alert(error);
    });

    ipcRenderer.on("sqlError", (event, error) => alert(error));

    ipcRenderer.on("columns", (event, data: ColumnsInTable[]) => {
      const rowsCopy = [...rows];
      let requestedTable = rowsCopy.find((row) =>
        data.some((column) => column.table_name === row.values.tablename)
      );

      if (requestedTable) {
        requestedTable.expanded = true;
        requestedTable.expandedValue = data;
        const requestedTableIndex = rowsCopy.indexOf(requestedTable);
        rowsCopy[requestedTableIndex] = requestedTable;
        setRows(rowsCopy);
      }
    });

    ipcRenderer.on("sqlQueryResult", (event, data) => {
      setQueryResult(data);
    });

    return () => {
      ipcRenderer.removeAllListeners("columns");
    };
  }, [rows]);

  useEffect(() => {
    if (location.state.rows) {
      setRows(
        location?.state?.rows.map((row: InitialQueryResult) => ({
          values: row,
          expanded: false,
          expandedValue: null as ColumnsInTable[] | null,
        }))
      );
    }
  }, [location.state]);

  const getTableInformation = (tableName: string, index: number) => {
    if (rows[index].expanded) {
      const rowsCopy = [...rows];
      rowsCopy[index].expanded = false;
      setRows(rowsCopy);
      return;
    }
    if (rows[index].expandedValue && !rows[index].expanded) {
      const rowsCopy = [...rows];
      rowsCopy[index].expanded = true;
      setRows(rowsCopy);
      return;
    }
    ipcRenderer.send("columnsInTable", { tableName });
  };

  const runQuery = (query: string) => {
    ipcRenderer.send("sqlQuery", { query });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "25%",
          overflowY: "scroll",
          height: "50%",
          overflowX: "hidden",
        }}
      >
        <Paper style={{ height: "100%" }}>
          <div style={{ position: "absolute" }}>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBack />
            </IconButton>
          </div>
          <Typography variant="h5" align="center">
            {databaseName}
          </Typography>
          <List>
            {rows?.map((row, index) => (
              <DatabaseTableListItem
                row={row}
                index={index}
                getTableInformation={getTableInformation}
              />
            ))}
          </List>
        </Paper>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: "1%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ width: "75%" }}>
          <SQLEditor runQuery={runQuery} />
          {queryResult && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ResultTable
                fields={queryResult.fields}
                rows={queryResult.rows}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
