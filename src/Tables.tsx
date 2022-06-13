import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

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
  host: string;
};

const Tables = (props: TablesPropsType) => {
  const [tables, setTables] = useState<string[]>();

  useEffect(() => {
    fetch(props.host + "/api/table")
    .then((response) => response.json())
    .then((data) => setTables(data));
  }, [props.host]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Tables on {props.host}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tables?.map((table, k) => <TableEntry key={k} table={table} />)}
    </TableBody>
  </Table>;
};

export default Tables;
