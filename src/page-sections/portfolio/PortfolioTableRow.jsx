import { useState } from "react";
import { Avatar, Box, Button, Checkbox, Chip, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { AddCircleOutline, DeleteOutline, Edit, PauseCircleFilled, PlayArrow, PlayCircleFilled } from "@mui/icons-material";
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



const PortfolioTableRow = props => {
  const {
    data,
    isSelected,
    handleSelectRow,
    handleDeleteBudgetStrategy,
    loadDataEditById,
    handleActionPortfolio
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
          }}
          onClick={()=>{
            navigate(`/portfolio/${data.ID}`)
          }}
          >
              {data.Name}
            </Paragraph>

          </Box>
        </FlexBox>
      </TableCell>
      <TableCell padding="normal"><Typography sx={{ color :'warning.main'}}>{data.BudgetStratetyName}</Typography></TableCell>

      <TableCell padding="normal"><Typography sx={{ color : data.CurrentProfit >= 0 ? 'success.main' : 'error.main'}}>{numberFormat(data.CurrentProfit) >= 0 ? `+${numberFormat(data.CurrentProfit)}`:`${numberFormat(data.CurrentProfit)}`}</Typography></TableCell>

      <TableCell padding="normal"><Typography sx={{ color : data.Day_Profit >= 0 ? 'success.main' : 'error.main'}}>{numberFormat(data.Day_Profit) >= 0 ? `+${numberFormat(data.Day_Profit)}`:`${numberFormat(data.Day_Profit)}`}</Typography></TableCell>

      <TableCell padding="normal">
      <FlexBox alignItems="center" gap={1}>
        {!data.IsRunning ? <>

          <Chip label={t('Inactive')} sx={{width : '100px'}} color="secondary" variant="contained" />
          <IconButton
          onClick={()=>{
            handleActionPortfolio(data.ID, "START")
          }}
            sx={{
              color: "success.main", // Use a color from your theme or a CSS color value
            }}
          >
            <PlayCircleFilled sx={{ fontSize: 35 }} />
          </IconButton>
        </> : <>
        <Chip label={t('Ongoing')}  sx={{width : '100px'}} color="primary" variant="contained" />
          <IconButton
           onClick={()=>{
            handleActionPortfolio(data.ID, "PAUSE")
          }}
            sx={{
              color: "warning.main", // Use a color from your theme or a CSS color value
            }}
          >
            <PauseCircleFilled sx={{ fontSize: 35 }} />
          </IconButton>
        </>}
  
      <TableMoreMenu open={openMenuEl} handleOpen={handleOpenMenu} handleClose={handleCloseOpenMenu}>
          <TableMoreMenuItem Icon={Edit} title={t('edit')} handleClick={() => {
          handleCloseOpenMenu();
          loadDataEditById(data.ID)
        }} />
          <TableMoreMenuItem Icon={DeleteOutline} title={t('delete')} handleClick={() => {
          handleCloseOpenMenu();
          handleActionPortfolio(data.ID, "DELETE")
        }} />
        </TableMoreMenu>
        </FlexBox>
       
      </TableCell>
    </TableRow>;
};
export default PortfolioTableRow;