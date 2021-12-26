export interface GetClientArgs {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export interface InitialQueryResult {
  schemaname: "public";
  tablename: string;
  tableowner: string;
  tablespace: null;
  hasindexes: boolean;
  hasrules: boolean;
  hastriggers: boolean;
  rowsecurity: boolean;
}

export interface ColumnsInTable {
  table_name: string;
  column_name: string;
  data_type: string;
}

export interface DatabaseRow {
  values: InitialQueryResult;
  expanded: boolean;
  expandedValue: ColumnsInTable[] | null;
}

export interface QueryResultField {
  columnID: number;
  dataTypeID: number;
  dataTypeSize: number;
  dataTypeModifier: number;
  format: string;
  name: string;
  tableID: number;
}

export enum TabType {
  EDITOR = "EDITOR",
  DATABSE_TABLE = "DATABSE_TABLE",
}
export interface Tab {
  title: string;
  type: TabType;
}
