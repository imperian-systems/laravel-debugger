import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { HostType } from "./App";
import { getAndThen } from "./fetchAndThen";

interface LaravelTablePropsType {
  host: HostType;
  setIsError: Function;
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
    getAndThen(props.host.host + "/api/table/" + table, props.host.key, setTableMetaData, props.setIsError);
    getAndThen(props.host.host + "/api/table/" + table + "/row", props.host.key, setTableData, props.setIsError);
  }, [props.host, table, setTableMetaData, setTableData, props.setIsError]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={tableMetaData?.columns.length || 1}>Table {table} on {props.host.host}</TableCell>
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
