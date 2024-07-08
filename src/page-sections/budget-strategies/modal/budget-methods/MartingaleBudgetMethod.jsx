import * as React from "react";
import {
  TextField,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useTranslation } from "react-i18next";
import IncreaseConfigType from "page-sections/budget-strategies/IncreaseConfigType";
import { Link } from "react-router-dom";

function MartingaleBudgetMethod({
  values,
  isMobile,
  setFieldValue,
  handleChange,
  touched,
  handleBlur,
  errors,
}) {
  const { t } = useTranslation();

  const [isShowAbout, setShowAbout] = React.useState(false);

  return (
    <>
      {values.budget_method === 1 && (
        <>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderRight: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderBottom: isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderTop: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              padding: 1,
            }}
          >
            <Typography
              fontSize={14}
              mb={1.5}
              sx={{ color: "rgb(160, 174, 192) !important" }}
            >
              3. {t("set_order_value")} ({values.order_value_martingale.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="order_value_martingale"
              onBlur={handleBlur}
              value={values.order_value_martingale}
              onChange={handleChange}
              helperText={
                touched.order_value_martingale && errors.order_value_martingale
              }
              error={Boolean(
                touched.order_value_martingale && errors.order_value_martingale
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderRight: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderBottom: isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderTop: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              padding: 1,
            }}
          >
            <Typography
              fontSize={14}
              mb={1.5}
              sx={{ color: "rgb(160, 174, 192) !important" }}
            >
              4. {t("option")}
            </Typography>
            <TextField
              fullWidth
              name="option_increase"
              onBlur={handleBlur}
              value={values.option_increase}
              onChange={handleChange}
              helperText={touched.option_increase && errors.option_increase}
              error={Boolean(touched.option_increase && errors.option_increase)}
              select
              SelectProps={{
                MenuProps: {
                  sx: { "& .MuiPaper-root": { maxHeight: 260 } },
                },
              }}
              sx={{
                maxWidth: { sm: "100%" },
                textTransform: "capitalize",
              }}
            >
              {IncreaseConfigType.map((option) => (
                <MenuItem
                  key={option.Type}
                  checked={option.Type === 0}
                  value={option.Type}
                >
                  {t(option.Name)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              borderRight: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderBottom: isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              borderTop: !isMobile ? "1px solid rgb(241, 242, 244)" : "none",
              padding: 1,
            }}
          >
            <Typography
              fontSize={14}
              mb={1.5}
              sx={{ color: "rgb(160, 174, 192) !important" }}
            >
              {t("find_out_more_about")} Martingale {" "}
              <Link
                onClick={() => {
                  setShowAbout(!isShowAbout);
                }}
              >
                {t(isShowAbout ? "hide" : "learn_more")}
              </Link>
            </Typography>

            {isShowAbout && (
              <>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_1_about_martingale")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_2_about_martingale")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_3_about_martingale")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_4_about_martingale")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_5_about_martingale")}
                </Typography>{" "}
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default MartingaleBudgetMethod;
