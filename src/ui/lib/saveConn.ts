interface RecentConnection {
  databaseName: string;
  host: string;
  port: number;
  user: string;
}

const saveConn = (newRecentConnection: RecentConnection) => {
  console.log(window.localStorage);
  const recentConnectionsString = window.localStorage.getItem("connections");
  const recentConnections: RecentConnection[] = JSON.parse(
    recentConnectionsString || "[]"
  );
  const newRecentConnections = [newRecentConnection, ...recentConnections];
  window.localStorage.setItem(
    "connections",
    JSON.stringify(newRecentConnections)
  );
};

export default saveConn;
