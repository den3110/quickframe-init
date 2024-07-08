import { useTheme } from "@emotion/react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "utils/axios";
import PausePlanConditionContent from "./PausePlanConditionContent";
import { PortfolioContext } from "contexts/portfolioContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Iconify from "components/Iconify";
import { Icon } from "@iconify/react";

function BotAiSettingContent({ formik }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [budgetStrategiesData, setBudgetStrategiesData] = useState([]);
  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  const { state: portfolioState, dispatch } = useContext(PortfolioContext);

  const loadBudgetStrategies = () => {
    try {
      if (portfolioState.budgetStrategies.length > 0) {
        setFieldValue("budget_strategy", portfolioState.budgetStrategies[0].ID);
        setBudgetStrategiesData(portfolioState.budgetStrategies);
      }

      // axiosInstance.get("/api/bot/capital-config/list").then(({ data }) => {
      //   if (data.ok) {
      //     if (data.d) {
      //       if (data.d.length > 0) {
      //         console.log("budget_strategy", data.d[0].ID);
      //         setFieldValue("budget_strategy", data.d[0].ID);
      //         setBudgetStrategiesData(data.d);
      //       }
      //     }
      //   }
      // });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (budgetStrategiesData.length === 0) loadBudgetStrategies();
  }, []);

  const handleIncrementBaseAmount = () => {
    const base_amount = values.base_amount || 1;

    setFieldValue("base_amount", parseFloat(base_amount) + 1);
  };

  const handleDecrementBaseAmount = () => {
    const base_amount = values.base_amount || 1;

    setFieldValue("base_amount", Math.max(0, parseFloat(base_amount) - 1));
  };

  const isLight = theme.palette.mode === "light";
  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          border: "1px solid #424242",
          borderRadius: "1em",
          marginBottom: 3,
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderBottom: isMobile ? "1px solid #424242" : "none",
            borderRight: !isMobile ? "1px solid #424242" : "none",
            padding: 2,
          }}
        >
          <Typography
            fontSize={14}
            mb={1.5}
            sx={{ color: "rgb(160, 174, 192) !important" }}
          >
            {t("budget_strategy")}
          </Typography>
          <TextField
            fullWidth
            name="budget_strategy"
            onBlur={handleBlur}
            value={values.budget_strategy}
            onChange={handleChange}
            helperText={touched.budget_strategy && errors.budget_strategy}
            error={Boolean(touched.budget_strategy && errors.budget_strategy)}
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
            {budgetStrategiesData.map((option) => (
              <MenuItem key={option.ID} value={option.ID}>
                {t(option.Name)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 2,
          }}
        >
          <Typography
            fontSize={14}
            mb={1.5}
            sx={{ color: "rgb(160, 174, 192) !important" }}
          >
            {t("set_base_amount")}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handleDecrementBaseAmount}
              size="large"
              sx={{
                borderRadius: "50%",
                color: "error.main", // Use a color from your theme or a CSS color value
                "&:hover": {
                  backgroundColor: "error.light", // Adjust hover background color
                },
              }}
            >
              <RemoveCircleOutline />
            </IconButton>
            <TextField
              value={values.base_amount} // Format the value as a localized string
              onChange={handleChange}
              name="base_amount"
              type="text" // Use "text" type for TextField to properly format the number
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{
                "& input": {
                  padding: "10px", // Adjust padding to reduce the height of the input field
                  textAlign: "center", // Center the text inside the input field
                },
                "& .MuiInputBase-root": {
                  maxWidth: "100px", // Set a max-width to control the size of the input field
                },
              }}
            />
            <IconButton
              onClick={handleIncrementBaseAmount}
              size="large"
              sx={{
                borderRadius: "50%",
                color: "success.main", // Use a color from your theme or a CSS color value
                "&:hover": {
                  backgroundColor: "success.light", // Adjust hover background color
                },
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{
          border: "1px solid #424242",
          borderRadius: "1em",
          marginBottom: 3,
        }}
      >
        <Grid
          item
          xs={9}
          md={9}
          sx={{
            borderBottom: values.pause_plan_condition
              ? "1px solid #424242"
              : "none",
            padding: 2,
          }}
        >
          <Typography fontSize={17} mb={1.5} sx={{ fontWeight: "bold" }}>
            {t("pause_plan_condition")}
          </Typography>
          <Typography
            fontSize={14}
            mb={1.5}
            sx={{ color: "rgb(160, 174, 192) !important" }}
          >
            {t("the_plan_will_pause_when")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          md={3}
          sx={{
            borderBottom: values.pause_plan_condition
              ? "1px solid #424242"
              : "none",
            padding: 2,
          }}
        >
          <Switch
            color="primary"
            sx={{ marginTop: 2 }}
            name="pause_plan_condition"
            onBlur={handleBlur}
            checked={values.pause_plan_condition}
            onChange={handleChange}
            helperText={
              touched.pause_plan_condition && errors.pause_plan_condition
            }
            error={Boolean(
              touched.pause_plan_condition && errors.pause_plan_condition
            )}
          />
        </Grid>
        {values.pause_plan_condition && (
          <PausePlanConditionContent formik={formik} />
        )}
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{ border: "1px solid #424242", borderRadius: "1em" }}
      >
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Icon
              icon="uil:setting"
              style={{
                width: "23",
                height: "23",
                color: isLight ? "black" : "white",
              }}
            />

            <Typography
              fontSize={17}
              sx={{
                fontWeight: "bold",
                color: isLight ? "black" : "white",
                ml: 1,
              }}
            >
              {t("advanced_optional")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} sx={{ width: "100%", mt: 1 }}>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  padding: 2,
                }}
              >
                <Typography
                  fontSize={17}
                  mb={1}
                  sx={{
                    fontWeight: "550",
                    color: isLight ? "black" : "white",
                  }}
                >
                  {t("expert_mode")}
                </Typography>
                <Typography
                  fontSize={14}
                  mb={1.5}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("des_expert_mode")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{
                  padding: 2,
                }}
              >
                <Switch
                  color="primary"
                  sx={{ marginTop: 2 }}
                  name="BrokerMode"
                  onBlur={handleBlur}
                  checked={values.BrokerMode}
                  onChange={handleChange}
                  helperText={touched.BrokerMode && errors.BrokerMode}
                  error={Boolean(touched.BrokerMode && errors.BrokerMode)}
                />
              </Grid>

              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  padding: 2,
                }}
              >
                <Typography
                  fontSize={17}
                  mb={1}
                  sx={{
                    fontWeight: "550",
                    color: isLight ? "black" : "white",
                  }}
                >
                  {t("private_mode")}
                </Typography>
                <Typography
                  fontSize={14}
                  mb={1.5}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("des_private_mode")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{
                  padding: 2,
                }}
              >
                <Switch
                  color="primary"
                  sx={{ marginTop: 2 }}
                  name="PrivateMode"
                  onBlur={handleBlur}
                  checked={values.PrivateMode}
                  onChange={handleChange}
                  helperText={touched.PrivateMode && errors.PrivateMode}
                  error={Boolean(touched.PrivateMode && errors.PrivateMode)}
                />
              </Grid>

              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  padding: 2,
                }}
              >
                <Typography
                  fontSize={17}
                  mb={1}
                  sx={{
                    fontWeight: "550",
                    color: isLight ? "black" : "white",
                  }}
                >
                  {t("reverse_signal")}
                </Typography>
                <Typography
                  fontSize={14}
                  mb={1.5}
                  sx={{ color: "rgb(160, 174, 192) !important" }}
                >
                  {t("des_reverse_signal")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{
                  padding: 2,
                }}
              >
                <Switch
                  color="primary"
                  sx={{ marginTop: 2 }}
                  name="IsReverseOrder"
                  onBlur={handleBlur}
                  checked={values.IsReverseOrder}
                  onChange={handleChange}
                  helperText={touched.IsReverseOrder && errors.IsReverseOrder}
                  error={Boolean(touched.IsReverseOrder && errors.IsReverseOrder)}
                />
              </Grid>


            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}

export default BotAiSettingContent;
