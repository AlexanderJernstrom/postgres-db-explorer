import { ipcMain } from "electron";
import { Client, Pool } from "pg";
import { GetClientArgs, InitialQueryResult } from "../types/interfaces";

export let client: Client | null;

export const getClient = async ({
  user,
  host,
  database,
  password,
  port,
}: GetClientArgs) => {
  try {
    client = new Client({ user, host, database, password, port });
    await client.connect();
    const result = await client.query<InitialQueryResult>(
      "select * from pg_catalog.pg_tables where schemaname != 'pg_catalog' and schemaname != 'information_schema'"
    );
    return {
      fields: result.fields,
      rows: result.rows,
      rowCount: result.rowCount,
      databaseName: database,
    };
  } catch (err) {
    throw new Error(err);
  }
};
