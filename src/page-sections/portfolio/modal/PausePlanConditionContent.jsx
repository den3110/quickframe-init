import { useTheme } from "@emotion/react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function PausePlanConditionContent({ formik }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;


  const handleIncrementStopWinStreak = () => {
    const Stop_WhenWinStreak = values.Stop_WhenWinStreak || 1;

    setFieldValue("Stop_WhenWinStreak", parseFloat(Stop_WhenWinStreak) + 1);
  };

  const handleDecrementStopWinStreak = () => {
    const Stop_WhenWinStreak = values.Stop_WhenWinStreak || 1;

    setFieldValue("Stop_WhenWinStreak", Math.max(0, parseFloat(Stop_WhenWinStreak) - 1));
  };

  const handleIncrementStopLoseStreak = () => {
    const Stop_WhenLoseStreak = values.Stop_WhenLoseStreak || 1;

    setFieldValue("Stop_WhenLoseStreak", parseFloat(Stop_WhenLoseStreak) + 1);
  };

  const handleDecrementStopLoseStreak = () => {
    const Stop_WhenLoseStreak = values.Stop_WhenWinStreak || 1;

    setFieldValue("Stop_WhenLoseStreak", Math.max(0, parseFloat(Stop_WhenLoseStreak) - 1));
  };

  const handleIncrementStopWinTotal = () => {
    const Stop_WhenWinTotal = values.Stop_WhenWinTotal || 1;

    setFieldValue("Stop_WhenWinTotal", parseFloat(Stop_WhenWinTotal) + 1);
  };

  const handleDecrementStopWinTotal = () => {
    const Stop_WhenWinTotal = values.Stop_WhenWinTotal || 1;

    setFieldValue("Stop_WhenWinTotal", Math.max(0, parseFloat(Stop_WhenWinTotal) - 1));
  };

  const handleIncrementStopLoseTotal = () => {
    const Stop_WhenLoseTotal = values.Stop_WhenLoseTotal || 1;

    setFieldValue("Stop_WhenLoseTotal", parseFloat(Stop_WhenLoseTotal) + 1);
  };

  const handleDecrementStopLoseTotal = () => {
    const Stop_WhenLoseTotal = values.Stop_WhenWinTotal || 1;

    setFieldValue("Stop_WhenLoseTotal", Math.max(0, parseFloat(Stop_WhenLoseTotal) - 1));
  };

  const setTakeProfitTarget = (percent)=>{
    try {
        const investment_fund = values.investment_fund;

        const amount = investment_fund * percent / 100;

        setFieldValue("Stop_WhenProfit", amount)



    } catch (error) {
        console.error(error);
    }
  }
  const setStopLossTarget = (percent)=>{
    try {
        const investment_fund = values.investment_fund;

        const amount = investment_fund * percent / 100;

        setFieldValue("Stop_WhenLoss", amount)



    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          borderRight: !isMobile ? "1px solid #424242" : "none",
          borderBottom: "1px solid #424242",
          padding: 1,
        }}
      >
        <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          1.{t("set_take_profit")}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={5} md={5}>
            <TextField
              size="small"
              name="Stop_WhenProfit"
              onBlur={handleBlur}
              value={values.Stop_WhenProfit}
              onChange={handleChange}
              color="primary"

              placeholder={"0"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              helperText={touched.Stop_WhenProfit && errors.Stop_WhenProfit}
              error={Boolean(touched.Stop_WhenProfit && errors.Stop_WhenProfit)}
            />
          </Grid>
          <Grid item xs={7} md={7}>
          <Box display="flex" alignItems="center" gap={0.2} sx={{marginTop : 0.3}}>
          <Button
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                height: "100%",
              }}
              onClick={()=>{
                setTakeProfitTarget(10)
              }}
            >
              10%
            </Button>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                height: "100%",
              }}
              onClick={()=>{
                setTakeProfitTarget(20)
              }}
            >
              20%
            </Button>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              onClick={()=>{
                setTakeProfitTarget(50)
              }}
              sx={{
                height: "100%",
              }}
            >
              50%
            </Button>
          </Box>
          </Grid>
        
        </Grid>
      </Grid>

      
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: 1,
          borderBottom: "1px solid #424242",
        }}
      >
        <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          2.{t("set_stoploss")}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={5} md={5}>
            <TextField
              size="small"
              name="Stop_WhenLoss"
              color="warning"

              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={values.Stop_WhenLoss}
              onChange={handleChange}
              placeholder={"0"}
              helperText={touched.Stop_WhenLoss && errors.Stop_WhenLoss}
              error={Boolean(touched.Stop_WhenLoss && errors.Stop_WhenLoss)}
            />
          </Grid>
          <Grid item xs={7} md={7}>
          <Box display="flex" alignItems="center" gap={0.2} sx={{marginTop : 0.3}}>
          <Button
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                height: "100%",
              }}
              color="warning"
              onClick={()=>{
                setStopLossTarget(10)
              }}
            >
              10%
            </Button>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              color="warning"

              sx={{
                height: "100%",
              }}
              onClick={()=>{
                setStopLossTarget(20)
              }}
            >
              20%
            </Button>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              color="warning"

              onClick={()=>{
                setStopLossTarget(50)
              }}
              sx={{
                height: "100%",
              }}
            >
              50%
            </Button>
          </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          borderRight: !isMobile ? "1px solid #424242" : "none",
          borderBottom: "1px solid #424242",
          padding: 1,
        }}
      >
          <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          3.{t("win_streak")}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={handleDecrementStopWinStreak}
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
            value={values.Stop_WhenWinStreak} // Format the value as a localized string
            onChange={handleChange}
            name="Stop_WhenWinStreak"
            type="text" // Use "text" type for TextField to properly format the number         
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
            onClick={handleIncrementStopWinStreak}
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

      
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: 1,
          borderBottom : "1px solid #424242"
        }}
      >
        <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          4.{t("lose_streak")}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={handleDecrementStopLoseStreak}
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
            value={values.Stop_WhenLoseStreak} // Format the value as a localized string
            onChange={handleChange}
            name="Stop_WhenWinStreak"
            type="text" // Use "text" type for TextField to properly format the number         
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
            onClick={handleIncrementStopLoseStreak}
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

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          borderRight: !isMobile ? "1px solid #424242" : "none",
          borderBottom: isMobile ? "1px solid #424242" : "none",
          padding: 1,
        }}
      >
          <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          5.{t("win_total")}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={handleDecrementStopWinTotal}
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
            value={values.Stop_WhenWinTotal} // Format the value as a localized string
            onChange={handleChange}
            name="Stop_WhenWinTotal"
            type="text" // Use "text" type for TextField to properly format the number         
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
            onClick={handleIncrementStopWinTotal}
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

      
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: 1,
        }}
      >
        <Typography
          fontSize={14}
          mb={1.5}
          sx={{ color: "rgb(160, 174, 192) !important" }}
        >
          6.{t("lose_total")}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={handleDecrementStopLoseTotal}
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
            value={values.Stop_WhenLoseTotal} // Format the value as a localized string
            onChange={handleChange}
            name="Stop_WhenLoseTotal"
            type="text" // Use "text" type for TextField to properly format the number         
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
            onClick={handleIncrementStopLoseTotal}
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
    </>
  );
}

export default PausePlanConditionContent;
