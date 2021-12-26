import React, { useEffect } from "react";
import "codemirror/theme/dracula.css";
import CodeMirror from "@uiw/react-codemirror";

interface Props {
  value: string;
  onChange: (
    editor: CodeMirror.Editor,
    change: CodeMirror.EditorChange
  ) => void;
}

export const Editor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <CodeMirror
      options={{ theme: "dracula", mode: "sql", autofocus: true }}
      value={value}
      onChange={onChange}
    />
  );
};
