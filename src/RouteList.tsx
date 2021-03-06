import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAndThen } from "./fetchAndThen";
import { HostType } from "./App";

interface RouteType {
  uri: string;
  methods: string[];
  action: string;
};

interface TableEntryPropsType {
  route: RouteType;
};

const TableEntry = (props: TableEntryPropsType) => {
  return <TableRow>
    <TableCell>{props.route.uri}</TableCell>
    <TableCell>{props.route.methods.join(', ')}</TableCell>
    <TableCell>{props.route.action}</TableCell>
  </TableRow>;
};

interface RouteListPropsType {
  host: HostType;
  setIsError: Function;
};

const RouteList = (props: RouteListPropsType) => {
  const [routes, setRouteList] = useState<RouteType[]>();

  useEffect(() => {
    getAndThen(props.host.host + "/api/route", props.host.key, setRouteList, props.setIsError);
  }, [props.host, setRouteList, props.setIsError]);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={3}>RouteList on {props.host.host}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>URI</TableCell>
        <TableCell>Methods</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {routes?.map((route, k) => <TableEntry key={k} route={route} />)}
    </TableBody>
  </Table>;
};

export default RouteList;
