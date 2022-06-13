import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface LaravelTablePropsType {
  host: string;
};

interface TableMetaDataType {
  columns: string[];
  rows: number;
};

interface TableDataType {
  [key:string]: string;
};

const LaravelTable = (props: LaravelTablePropsType) => {
  const { table } = useParams();

  const [tableMetaData, setTableMetaData] = useState<TableMetaDataType>();
  const [tableData, setTableData] = useState<TableDataType[]>();

  useEffect(() => {
    fetch(props.host + "/api/table/" + table)
    .then((response) => response.json())
    .then((data) => setTableMetaData(data));

    fetch(props.host + "/api/table/" + table + "/row")
    .then((response) => response.json())
    .then((data) => setTableData(data));
  }, [props.host, table, setTableMetaData, setTableData]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={tableMetaData?.columns.length || 1}>Table {table} on {props.host}</TableCell>
      </TableRow>
      <TableRow>
        {tableMetaData?.columns.map((column, k) => <TableCell key={k}>{column}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {
        tableData?.map((row, k) => {
          return <TableRow key={k}>
            {tableMetaData?.columns.map((column, k) => <TableCell key={k}>{row[column]}</TableCell>)}
          </TableRow>;
        })
      }
    </TableBody>
  </Table>;
};

export default LaravelTable;
