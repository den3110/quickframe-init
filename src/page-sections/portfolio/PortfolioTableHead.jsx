import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// CUSTOM COMPONENT
import { Span } from "components/typography";
import { useTranslation } from "react-i18next";
// CUSTOM UTILS METHOD
import { isDark } from "utils/constants";
import { numberFormat } from "utils/numberFormat";

// ==============================================================

// ==============================================================

const headCells = [{
  id: "plan_name",
  numeric: false,
  disablePadding: false,
  label: "plan_name"
},
{
  id: "budget_strategy",
  numeric: false,
  disablePadding: false,
  label: "budget_strategy"
},
{
  id: "pnl",
  numeric: true,
  disablePadding: false,
  label: "pnl"
}, {
  id: "today_pnl",
  numeric: true,
  disablePadding: false,
  label: "today_pnl"
}, {
  id: "actions",
  numeric: true,
  disablePadding: false,
  label: "actions"
}
//   { id: "" },
];

const PortfolioTableHead = props => {
  const {
    onSelectAllRows,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    rows
  } = props;

  const {t} = useTranslation();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return <TableHead sx={{
    backgroundColor: theme => isDark(theme) ? "grey.700" : "grey.100"
  }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox size="small" color="primary" onChange={onSelectAllRows} checked={rowCount > 0 && numSelected === rowCount} indeterminate={numSelected > 0 && numSelected < rowCount} />
        </TableCell>

        {headCells.map(headCell => <TableCell key={headCell.id} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false} sx={{
        color: "text.primary",
        fontWeight: 600
      }}>
            <TableSortLabel active={orderBy === headCell.id} onClick={createSortHandler(headCell.id)} direction={orderBy === headCell.id ? order : "asc"}>
              {t(headCell.label)} {headCell.id === "today_pnl" && <>({numberFormat(rows.reduce((sum, item) => sum + item.Day_Profit, 0))})</>}
              {headCell.id === "pnl" && <>({numberFormat(rows.reduce((sum, item) => sum + item.CurrentProfit, 0))})</>}
              {orderBy === headCell.id ? <Span sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Span> : null}
            </TableSortLabel>
          </TableCell>)}
      </TableRow>
    </TableHead>;
};
export default PortfolioTableHead;