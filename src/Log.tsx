import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface LogPropsType {
  host: string;
};

const Log = (props: LogPropsType) => {
  const [log, setLog] = useState<string[] | object[]>();

  useEffect(() => {
    fetch(props.host + "/api/log")
    .then((response) => response.json())
    .then((data) => setLog(data));
  }, [props.host, setLog]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Log on {props.host}</TableCell>
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
