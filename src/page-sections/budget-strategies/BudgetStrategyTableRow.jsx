import { useState } from "react";
import { Avatar, Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
// CUSTOM DEFINED HOOK
import useNavigate from "hooks/useNavigate";
// CUSTOM COMPONENTS
import { FlexBox } from "components/flexbox";
import { Paragraph } from "components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "components/table";
import { useTranslation } from "react-i18next";
import CapitalConfigType from "./CapitalConfigType";
import { numberFormat } from "utils/numberFormat";
// ==============================================================

// ==============================================================



const BudgetStrategyTableRow = props => {
  const {
    data,
    isSelected,
    handleSelectRow,
    handleDeleteBudgetStrategy,
    loadDataEditById
  } = props;
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const handleOpenMenu = event => {
    setOpenMenuEl(event.currentTarget);
  };
  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  const {
    t
  } = useTranslation();

  return <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox size="small" color="primary" checked={isSelected} onClick={event => handleSelectRow(event, data.ID)} />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          {/* <Avatar src={user.avatar} alt={user.name} variant="rounded" /> */}

          <Box>
            <Paragraph fontWeight={500} color="text.primary" sx={{
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer"
            }
          }}>
              {data.Name}
            </Paragraph>

          </Box>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{t(CapitalConfigType.find(a=> a.Type === data.Type)?.Name)}</TableCell>

      <TableCell padding="normal"><Typography sx={{ color : data.Day_profit >= 0 ? 'success.main' : 'error.main'}}>{numberFormat(data.Day_profit) >= 0 ? `+${numberFormat(data.Day_profit)}`:`${numberFormat(data.Day_profit)}`}</Typography></TableCell>

      <TableCell padding="normal">
        <TableMoreMenu open={openMenuEl} handleOpen={handleOpenMenu} handleClose={handleCloseOpenMenu}>
          <TableMoreMenuItem Icon={Edit} title={t('edit')} handleClick={() => {
          handleCloseOpenMenu();
          loadDataEditById(data.ID)
        }} />
          <TableMoreMenuItem Icon={DeleteOutline} title={t('delete')} handleClick={() => {
          handleCloseOpenMenu();
          handleDeleteBudgetStrategy(data.ID);
        }} />
        </TableMoreMenu>
      </TableCell>
    </TableRow>;
};
export default BudgetStrategyTableRow;