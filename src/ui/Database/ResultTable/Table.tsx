import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { QueryResultField } from "../../../types/interfaces";

interface Props {
  fields: QueryResultField[];
  rows: any[];
}

export const ResultTable: React.FC<Props> = ({ fields, rows }) => {
  console.log({ fields, rows });
  return (
    <div style={{ marginTop: "2rem" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field.columnID}>{field.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                {fields.map((field) => (
                  <TableCell align="left" key={field.columnID}>
                    {field.dataTypeID === 1184
                      ? new Date(row[field.name]).toLocaleString()
                      : row[field.name]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
