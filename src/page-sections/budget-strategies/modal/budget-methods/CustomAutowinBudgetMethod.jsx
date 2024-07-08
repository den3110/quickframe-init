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

function CustomAutowinBudgetMethod({
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
      {values.budget_method === 6 && (
        <>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
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
              3. {t("set_row")} 1 ({values.row_1_custom_autowin.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_1_custom_autowin"
              onBlur={handleBlur}
              value={values.row_1_custom_autowin}
              onChange={handleChange}
              helperText={
                touched.row_1_custom_autowin && errors.row_1_custom_autowin
              }
              error={Boolean(
                touched.row_1_custom_autowin && errors.row_1_custom_autowin
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
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
              3. {t("set_row")} 2 ({values.row_2_custom_autowin.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_2_custom_autowin"
              onBlur={handleBlur}
              value={values.row_2_custom_autowin}
              onChange={handleChange}
              helperText={
                touched.row_2_custom_autowin && errors.row_2_custom_autowin
              }
              error={Boolean(
                touched.row_2_custom_autowin && errors.row_2_custom_autowin
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
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
              3. {t("set_row")} 3 ({values.row_3_custom_autowin.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_3_custom_autowin"
              onBlur={handleBlur}
              value={values.row_3_custom_autowin}
              onChange={handleChange}
              helperText={
                touched.row_3_custom_autowin && errors.row_3_custom_autowin
              }
              error={Boolean(
                touched.row_3_custom_autowin && errors.row_3_custom_autowin
              )}
            />
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
              {t("find_out_more_about")} Custom Autowin {' '}
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
                  {t("line_1_about_custom_autowin")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_2_about_custom_autowin")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_3_about_custom_autowin")}
                </Typography>      
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default CustomAutowinBudgetMethod;
