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

function Victor4BudgetMethod({
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
      {values.budget_method === 5 && (
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
              3. {t("set_row")} 1 ({values.row_1_victor4.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_1_victor4"
              onBlur={handleBlur}
              value={values.row_1_victor4}
              onChange={handleChange}
              helperText={
                touched.row_1_victor4 && errors.row_1_victor4
              }
              error={Boolean(
                touched.row_1_victor4 && errors.row_1_victor4
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
              3. {t("set_row")} 2 ({values.row_2_victor4.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_2_victor4"
              onBlur={handleBlur}
              value={values.row_2_victor4}
              onChange={handleChange}
              helperText={
                touched.row_2_victor4 && errors.row_2_victor4
              }
              error={Boolean(
                touched.row_2_victor4 && errors.row_2_victor4
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
              3. {t("set_row")} 3 ({values.row_3_victor4.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_3_victor4"
              onBlur={handleBlur}
              value={values.row_3_victor4}
              onChange={handleChange}
              helperText={
                touched.row_3_victor4 && errors.row_3_victor4
              }
              error={Boolean(
                touched.row_3_victor4 && errors.row_3_victor4
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
              4. {t("set_row")} 4 ({values.row_4_victor4.split('-').length} {t('step')})
            </Typography>
            <TextField
              variant="standard" // <== no border
              fullWidth
              size="large"
              name="row_4_victor4"
              onBlur={handleBlur}
              value={values.row_4_victor4}
              onChange={handleChange}
              helperText={
                touched.row_4_victor4 && errors.row_4_victor4
              }
              error={Boolean(
                touched.row_4_victor4 && errors.row_4_victor4
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
              {t("find_out_more_about")} Victor 4 {' '}
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
                  {t("line_1_about_victor4")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_2_about_victor4")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_3_about_victor4")}
                </Typography>
                <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_4_about_victor4")}
                </Typography>  <Typography
                  fontSize={14}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("line_5_about_victor4")}
                </Typography>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default Victor4BudgetMethod;
