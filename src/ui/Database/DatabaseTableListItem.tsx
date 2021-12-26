import {
  ListItem,
  IconButton,
  ListItemText,
  Typography,
  List,
} from "@material-ui/core";
import { ChevronRight, KeyboardArrowDown, GridOn } from "@material-ui/icons";
import React from "react";
import { DatabaseRow, Tab, TabType } from "../../types/interfaces";

interface Props {
  getTableInformation: (tableName: string, index: number) => void;
  row: DatabaseRow;
  index: number;
}

export const DatabaseTableListItem: React.FC<Props> = ({
  row,
  getTableInformation,
  index,
}) => {
  return (
    <>
      <ListItem button>
        <IconButton
          size="small"
          style={{ paddingRight: "0.2rem" }}
          onClick={() => getTableInformation(row.values.tablename, index)}
        >
          {!row.expanded ? <ChevronRight /> : <KeyboardArrowDown />}
        </IconButton>
        <GridOn />
        <ListItemText
          style={{ textAlign: "center" }}
          title={row.values.tablename}
        >
          <Typography variant="body1">{row.values.tablename}</Typography>
        </ListItemText>
      </ListItem>
      {row.expanded && (
        <List style={{ paddingLeft: "0.5rem" }}>
          {row.expandedValue.map((column) => (
            <ListItem>
              <ListItemText style={{ textAlign: "left" }}>
                {column.column_name}
              </ListItemText>
              <Typography variant="subtitle2" color="textSecondary">
                {column.data_type}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
