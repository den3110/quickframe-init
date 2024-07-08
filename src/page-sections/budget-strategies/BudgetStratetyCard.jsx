import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { TableMoreMenu, TableMoreMenuItem } from "components/table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutline, Edit } from "@mui/icons-material";
import CapitalConfigType from "./CapitalConfigType";
import { useTranslation } from "react-i18next";
import { numberFormat } from "utils/numberFormat";

function BudgetStratetyCard({
  index,
  row,
  handleDeleteBudgetStrategy,
  loadDataEditById,
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography variant="h6" component="h2">
              {row.Name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="textSecondary">
              {t("method_using")} :{" "}
              {t(CapitalConfigType.find((a) => a.Type === row.Type)?.Name)}
            </Typography>
            <Typography variant="body2" component="p">
              {t("day_profit")} : {numberFormat(row.Day_profit)}
            </Typography>
          </div>

          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            <TableMoreMenuItem
              Icon={Edit}
              title={t("edit")}
              handleClick={() => {
                handleCloseOpenMenu();
                loadDataEditById(row.ID);
              }}
            />
            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("delete")}
              handleClick={() => {
                handleCloseOpenMenu();
                handleDeleteBudgetStrategy(row.ID);
              }}
            />
          </TableMoreMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default BudgetStratetyCard;
