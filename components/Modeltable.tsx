import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function Modeltable(props: {
  table: Array<{ date: string; uuid: string }>;
}) {
  const numberOfRows = props.table.length;
  const generatedJSX: Array<JSX.Element> = [];

  for (let i = 0; i < numberOfRows; i++) {
    generatedJSX.push(
      <TableRow
        key={props.table[i].date}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {props.table[i].date}
        </TableCell>
        <TableCell align="left">{props.table[i].uuid}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>UUID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{generatedJSX}</TableBody>
      </Table>
    </TableContainer>
  );
}
