import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// CUSTOM COMPONENT
import { Span } from "components/typography";
import { useTranslation } from "react-i18next";
// CUSTOM UTILS METHOD
import { isDark } from "utils/constants";

// ==============================================================

// ==============================================================

const headCells = [{
  id: "strategy_name",
  numeric: false,
  disablePadding: false,
  label: "strategy_name"
}, {
  id: "method_using",
  numeric: true,
  disablePadding: false,
  label: "method_using"
}, {
  id: "day_profit",
  numeric: true,
  disablePadding: false,
  label: "day_profit"
}, {
  id: "actions",
  numeric: true,
  disablePadding: false,
  label: "actions"
}
//   { id: "" },
];

const BudgetStrategyTableHead = props => {
  const {
    onSelectAllRows,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
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
              {t(headCell.label)}
              {orderBy === headCell.id ? <Span sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Span> : null}
            </TableSortLabel>
          </TableCell>)}
      </TableRow>
    </TableHead>;
};
export default BudgetStrategyTableHead;