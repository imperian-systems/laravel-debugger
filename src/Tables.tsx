import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAndThen } from "./fetchAndThen";
import { HostType } from "./App";

interface TableEntryPropsType {
  table: string;
};

const TableEntry = (props: TableEntryPropsType) => {
  const navigate = useNavigate();

  return <TableRow>
    <TableCell onClick={() => navigate("/table/" + props.table)}>{props.table}</TableCell>
  </TableRow>;
};

interface TablesPropsType {
  host: HostType;
  setIsError: Function;
};

const Tables = (props: TablesPropsType) => {
  const [tables, setTables] = useState<string[]>();

  useEffect(() => {
    getAndThen(props.host.host + "/api/table", props.host.key, setTables, props.setIsError);
  }, [props.host, props.setIsError]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Tables on {props.host.host}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tables?.map((table, k) => <TableEntry key={k} table={table} />)}
    </TableBody>
  </Table>;
};

export default Tables;
