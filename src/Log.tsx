import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAndThen } from "./fetchAndThen";
import { HostType } from "./App";

interface LogPropsType {
  host: HostType;
  setIsError: Function;
};

const Log = (props: LogPropsType) => {
  const [log, setLog] = useState<string[] | object[]>();

  useEffect(() => {
    getAndThen(props.host.host + "/api/log", props.host.key, setLog, props.setIsError);
  }, [props.host, setLog, props.setIsError]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Log on {props.host.host}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {log?.map((line, k) => {
        if(typeof line === "object") return null;
        return <TableRow key={k}>
          <TableCell>{line}</TableCell>
        </TableRow>;
      })}
    </TableBody>
  </Table>;
};

export default Log;
