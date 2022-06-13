import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Tables from "./Tables";
import LaravelTable from "./LaravelTable";
import RouteList from "./RouteList";
import Log from "./Log";

interface AppPropsType {
}

const styles = {
  addHost: {
    marginTop: "4%",
  },
  button: {
    marginLeft: "2%"
  }
};

const App = (props: AppPropsType) => {
  const [hosts, setHosts] = useState<string[]>([]);
  const [selectedHost, setSelectedHost] = useState<string>("");
  const [newHost, setNewHost] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [showAddRemoveHost, setShowAddRemoveHost] = useState<boolean>(false);
  const navigate = useNavigate();

  const saveSettings = () => {
    localStorage.setItem("hosts", JSON.stringify(hosts));
    setIsSaved(true);
  };

  useEffect(() => {
    const localHosts = localStorage.getItem("hosts");
    if(!localHosts) {
      localStorage.setItem("hosts", JSON.stringify([]));
      return;
    }
    setHosts(JSON.parse(localHosts));
  }, [setHosts]);

  const addNewHost = () => {
    if(!newHost) return;
    setHosts([...hosts, newHost])
    setSelectedHost(newHost);
    setNewHost("");
    setIsSaved(false);
  };

  const removeHost = () => {
    const newHosts = hosts.filter(host => host !== selectedHost);
    setSelectedHost("");
    setHosts(newHosts);
    setIsSaved(false);
  };

  return <Container>
    <Typography variant="h4" component="h1" align="center">
      Laravel Debugger 
      <Button color="error" disabled={isSaved} onClick={saveSettings} style={styles.button}>Save settings</Button>
    </Typography>
    <FormControl fullWidth>
      <InputLabel>Host</InputLabel>
      <div style={{display: "flex", alignItems: "center", width: "100%"}}>
        <Select
          value={selectedHost}
          label="Host"
          onChange={(e) => setSelectedHost(e.target.value)}
          style={{width: "90%"}}
        >
          {hosts?.map((host, k) => <MenuItem key={k} value={host}>{host}</MenuItem>)}
        </Select>
        <SettingsIcon style={styles.button} onClick={() => setShowAddRemoveHost(!showAddRemoveHost)}/>
      </div>
      {showAddRemoveHost &&
        <>
          <Button variant="contained" onClick={removeHost} disabled={!selectedHost}>Remove host</Button>
          <TextField fullWidth value={newHost} onChange={(e) => setNewHost(e.target.value)} style={styles.addHost} />
          <Button variant="contained" onClick={addNewHost}>Add host</Button>
        </>
      }
    </FormControl>
    {selectedHost &&
      <>
        <div>
          <Button onClick={() => navigate("/tables")}>Tables</Button>
          <Button onClick={() => navigate("/routes")}>Routes</Button>
          <Button onClick={() => navigate("/log")}>Log</Button>
        </div>
        <Routes>
          <Route
            path="/tables"
            element={<Tables host={selectedHost} />}
          />
          <Route
            path="/table/:table"
            element={<LaravelTable host={selectedHost} />}
          />
          <Route
            path="/routes"
            element={<RouteList host={selectedHost} />}
          />
          <Route
            path="/log"
            element={<Log host={selectedHost} />}
          />
        </Routes>
      </>
    }
  </Container>;
};

export default App;
