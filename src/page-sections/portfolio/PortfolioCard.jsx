import { Button, Card, CardContent, Chip, Grid, IconButton, Typography } from "@mui/material";
import { TableMoreMenu, TableMoreMenuItem } from "components/table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutline, Edit, PauseCircleFilled, PlayCircleFilled } from "@mui/icons-material";
import CapitalConfigType from "./CapitalConfigType";
import { useTranslation } from "react-i18next";
import { FlexBox } from "components/flexbox";

function PortfolioCard({
  index,
  row,
  handleDeleteBudgetStrategy,
  loadDataEditById,
  handleActionPortfolio
}) {
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const { t } = useTranslation();
  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };
  const handleCloseOpenMenu = () => setOpenMenuEl(null);
  return (
    <Card key={index} sx={{ marginBottom: 2, border: "1px solid #E3E4D6" }}>
      <CardContent>
        <Grid container spacing={2}>
    <Grid item xs={12} md={12}>
    <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography variant="h6" component="h2" onClick={()=>{ navigate(`/portfolio/${row.ID}`) }}>
              {row.Name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="textSecondary">
              {t("method_using")} :{" "}
              {t(CapitalConfigType.find((a) => a.Type === row.Type)?.Name)}
            </Typography>
            <Typography variant="body2" component="p">
              {t("day_profit")} : {row.Day_Profit} $
            </Typography>
          </div>
        </div>
    </Grid>
    <Grid item xs={12} md={12}>
    <FlexBox alignItems="center" gap={1}>
        {!row.IsRunning ? <>

          <Chip sx={{width: '70%'}} label={t('Inactive')} color="secondary" variant="contained" />
          <IconButton
          onClick={()=>{
            handleActionPortfolio(row.ID, "START")
          }}
            sx={{
              color: "success.main", // Use a color from your theme or a CSS color value
            }}
          >
            <PlayCircleFilled  sx={{ fontSize: 35 }} />
          </IconButton>
        </> : <>
        <Chip sx={{width: '70%'}} label={t('Ongoing')} color="primary" variant="contained" />
          <IconButton
           onClick={()=>{
            handleActionPortfolio(row.ID, "PAUSE")
          }}
            sx={{
              color: "warning.main", // Use a color from your theme or a CSS color value

            }}
          >
          
            <PauseCircleFilled sx={{ fontSize: 35 }}  />
          </IconButton>
        </>}
  
      <TableMoreMenu open={openMenuEl} handleOpen={handleOpenMenu} handleClose={handleCloseOpenMenu}>
          <TableMoreMenuItem Icon={Edit} title={t('edit')} handleClick={() => {
          handleCloseOpenMenu();
          loadDataEditById(row.ID)
        }} />
          <TableMoreMenuItem Icon={DeleteOutline} title={t('delete')} handleClick={() => {
          handleCloseOpenMenu();
          handleActionPortfolio(row.ID, "DELETE")
        }} />
        </TableMoreMenu>
        </FlexBox>
      {/* <Grid container spacing={1}>
        <Grid item xs={8} md={8}>
          <Chip sx={{ width: '100%'}} label={t('Inactive')} color="secondary" variant="contained" />
        </Grid>
      </Grid> */}
    </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
}

export default PortfolioCard;
