import React, { useEffect } from "react";
import {
  TextField,
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Formik, Form, Field, FieldProps } from "formik";
import { GetClientArgs } from "../../types/interfaces";
import saveConn from "../lib/saveConn";
const { ipcRenderer } = window.require("electron");

const DBConnectionForm: React.FC = () => {
  const intialValues: GetClientArgs = {
    database: "",
    host: "",
    port: 0,
    password: "",
    user: "",
  };

  useEffect(() => {
    ipcRenderer.on("connectionError", (event, error) => {
      alert(error);
    });
  }, []);

  const savedConnections: any[] = JSON.parse(
    window.localStorage.getItem("connections") || "[]"
  );

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <Paper elevation={8} style={{ width: "50%" }}>
          <Typography variant="h4" align="center">
            Database Connection
          </Typography>
          <div style={{ padding: "2rem" }}>
            <Formik
              initialValues={intialValues}
              onSubmit={(values) => {
                saveConn({
                  user: values.user,
                  host: values.host,
                  databaseName: values.database,
                  port: values.port,
                });
                ipcRenderer.send("connect", values);
              }}
            >
              {({ isSubmitting, setValues }) => (
                <Form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Field name="database">
                    {({ field }: FieldProps) => (
                      <TextField placeholder="Database name" {...field} />
                    )}
                  </Field>
                  <Field name="host" placeholder="Host" component={TextField}>
                    {({ field }: FieldProps) => (
                      <TextField placeholder="Host" {...field} />
                    )}
                  </Field>
                  <Field name="port">
                    {({ field }: FieldProps) => (
                      <TextField placeholder="Port" type="number" {...field} />
                    )}
                  </Field>
                  <Field name="user" component={TextField}>
                    {({ field }: FieldProps) => (
                      <TextField placeholder="User" {...field} />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <TextField
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    )}
                  </Field>
                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ marginTop: "0.5rem" }}
                    type="submit"
                  >
                    Connect
                  </Button>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "4rem",
                    }}
                  >
                    <Paper elevation={8} style={{ width: "50%" }}>
                      <Typography variant="h4" align="center">
                        Recent connections
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <List dense style={{ width: "100%" }}>
                          {savedConnections.map((connection: any) => (
                            <ListItem
                              button
                              style={{ textAlign: "center" }}
                              onClick={() => {
                                setValues({
                                  database: connection.databaseName,
                                  host: connection.host,
                                  port: connection.port,
                                  user: connection.user,
                                  password: "",
                                });
                              }}
                            >
                              <ListItemText
                                style={{ wordBreak: "break-all" }}
                              >{`${connection.user}@${connection.host}:${connection.port}/${connection.databaseName}`}</ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </Paper>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default DBConnectionForm;
