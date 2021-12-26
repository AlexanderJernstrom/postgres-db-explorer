import { Button, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Editor } from "./Editor";

interface Props {
  runQuery: (query: string) => void;
}

export const SQLEditor: React.FC<Props> = ({ runQuery }) => {
  const [sqlValue, setSqlValue] = useState("");

  const updateSqlValue = (
    editor: CodeMirror.Editor,
    change: CodeMirror.EditorChange
  ) => {
    setSqlValue(editor.getValue());
  };

  return (
    <Paper
      style={{
        width: "100%",
        height: "35vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Editor value={sqlValue} onChange={updateSqlValue} />
        <Button
          style={{ zIndex: 999, position: "absolute", right: "0", bottom: "0" }}
          color="primary"
          variant="contained"
          onClick={() => runQuery(sqlValue)}
        >
          Run query
        </Button>
      </div>
    </Paper>
  );
};
