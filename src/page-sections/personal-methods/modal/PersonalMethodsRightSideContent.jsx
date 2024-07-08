import * as React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import CapitalConfigType from "../CapitalConfigType";
import AllOrderBudgetMethod from "./budget-methods/AllOrderBudgetMethod";
import MartingaleBudgetMethod from "./budget-methods/MartingaleBudgetMethod";
import FiboXStepBudgetMethod from "./budget-methods/FiboXStepBudgetMethod";
import Victor2BudgetMethod from "./budget-methods/Victor2BudgetMethod";
import Victor3BudgetMethod from "./budget-methods/Victor3BudgetMethod ";
import Victor4BudgetMethod from "./budget-methods/Victor4BudgetMethod";
import CustomAutowinBudgetMethod from "./budget-methods/CustomAutowinBudgetMethod";
import axios from "../../../utils/axios";
import { useSnackbar } from "notistack";
import { useTheme } from "@emotion/react";

function PersonalMethodsRightSideContent({ setIsOpen,loadPersonalMethods,dataEdit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { t } = useTranslation();
  const {enqueueSnackbar} = useSnackbar();

  const initialValues = {
    strategy_name: "",
    budget_method: 0,
    tradeAmountAllOrder: "1",
    order_value_martingale: "1-2-4-8-17-35",
    order_value_fibo: "1-2-3-5-8-13-21-34-55-89-144",
    option_increase: 0,
    a_loss_will_advance: 1,
    a_win_will_set_back : 1,
    row_1_victor2 : "1-1-2-2-3-4-5-7-10-13-18-24-32-44-59-80-108-146-197-271",
    row_2_victor2 : "1-2-4-4-6-8-10-14-20-26-36-48-64-88-118-160-216-292-394-542",
    row_1_victor3 : "1-1-1-1-1-1-1.5-2-2-2-2.5-3-3.5-4-4.5-5.4-6-7-8-9.5-11",
    row_2_victor3 : "1-2-2-2-2-2-3-3.9-3.9-3.9-4.875-5.85-6.825-7.8-8.775-10.53-11.7-13.65-15.6-18.525-21.45",
    row_3_victor3 : "1-4-4-4-4-4-6-7.605-7.605-7.605-9.50625-11.4075-13.30875-15.21-17.11125-20.5335-22.815-26.6175-30.42-36.12375-41.8275",
    row_1_victor4 : "1-1-1-1-1-1-1-1-1-1-1-1-1-1-1.23-1.25-1.28-1.3-1.47-1.6-1.74-1.88-2.04-2.22",
    row_2_victor4 : "1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-1.95-2.28-2.32-2.36-2.41-2.73-2.96-3.21-3.48-3.78",
    row_3_victor4 : "3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-3.8-4.22-4.29-4.37-4.45-5.04-5.47-5.94-6.44-6.99-7.59",
    row_4_victor4 : "7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.41-7.81-7.94-8.08-8.24-9.33-10.12-10.99-11.92-12.93-14.03",
    row_1_custom_autowin : "1-1-2-6-4-3",
    row_2_custom_autowin : "1-2-4-8-17-35",
    row_3_custom_autowin : "2-3-4-5-6-1",

  };
  const validationSchema = Yup.object().shape({
    strategy_name: Yup.string().required("Stratety name is required"),
  });
  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        let Name = values.strategy_name?.trim();
        let Type = parseInt(values.budget_method);
        let Increase_Value_Type = parseInt(values.option_increase);
        let StepX1 = parseInt(values.a_loss_will_advance);
        let StepX2 = parseInt(values.a_win_will_set_back);
        let Value = "";

        if(Type === 0){
          Value = values.tradeAmountAllOrder?.toString();
        }else if(Type === 1)
        {
          Value = values.order_value_martingale?.toString();
        }
        else if(Type === 2){
          Value = values.order_value_fibo?.toString();
        }
        else if(Type === 3){
          Value = `${values.row_1_victor2.toString()}\n${values.row_2_victor2.toString()}`
        }
        else if(Type === 4){
          Value = `${values.row_1_victor3.toString()}\n${values.row_2_victor3.toString()}\n${values.row_3_victor3.toString()}`
        }
        else if(Type === 5){
          Value = `${values.row_1_victor4.toString()}\n${values.row_2_victor4.toString()}\n${values.row_3_victor4.toString()}\n${values.row_4_victor4.toString()}`
        }
        else if(Type === 6){
          Value = `${values.row_1_custom_autowin.toString()}\n${values.row_2_custom_autowin.toString()}\n${values.row_3_custom_autowin.toString()}`
        }

        const {data} = !dataEdit ? await axios.post('/api/bot/capital-config/new', {
          Name,
          Type,
          Increase_Value_Type,
          StepX1,
          StepX2,
          Value
        }) : await axios.post('/api/bot/capital-config/update', {
          ID : dataEdit.ID,
          Name,
          Type,
          Increase_Value_Type,
          StepX1,
          StepX2,
          Value
        });

        if(!data.ok){
          enqueueSnackbar(t(data.d.err_code || data.m), {variant : 'error'})

        }else{
          enqueueSnackbar(t(!dataEdit ? 'create_a_successful_strategy' : 'success'), {variant : 'success'})
          loadPersonalMethods();
          setIsOpen(false)
        }
        console.log(data);


      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });


  React.useEffect(()=>{

    if(dataEdit){
      setFieldValue('strategy_name', dataEdit.Name);
      setFieldValue('budget_method', dataEdit.Type);
      const type = parseInt(dataEdit.Type);
      if(type ===0){
        setFieldValue('tradeAmountAllOrder', dataEdit.Value);
      }
      else if(type === 1){
        setFieldValue('order_value_martingale', dataEdit.Value);
      }
      else if(type === 2){
        setFieldValue('order_value_fibo', dataEdit.Value);
      }
      else if(type === 3){
        const rows = dataEdit.Value.split('\n');
        setFieldValue('row_1_victor2', rows[0]);
        setFieldValue('row_2_victor2', rows[1]);
      }
      else if(type === 4){
        const rows = dataEdit.Value.split('\n');
        setFieldValue('row_1_victor3', rows[0]);
        setFieldValue('row_2_victor3', rows[1]);
        setFieldValue('row_3_victor3', rows[2]);

      }
      else if(type === 5){
        const rows = dataEdit.Value.split('\n');
        setFieldValue('row_1_victor4', rows[0]);
        setFieldValue('row_2_victor4', rows[1]);
        setFieldValue('row_3_victor4', rows[2]);
        setFieldValue('row_4_victor4', rows[2]);
      }
      else if(type === 6){
        const rows = dataEdit.Value.split('\n');
        setFieldValue('row_1_custom_autowin', rows[0]);
        setFieldValue('row_2_custom_autowin', rows[1]);
        setFieldValue('row_3_custom_autowin', rows[2]);
      }

      setFieldValue('option_increase', dataEdit.Increase_Value_Type);
      setFieldValue('a_loss_will_advance', dataEdit.StepX1);
      setFieldValue('a_win_will_set_back', dataEdit.StepX2);
    }




  }, [])
 

  return (
    // Inside your component
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%", // Make sure this Box takes up the full container height
        }}
      >
        <Box
          role="presentation"
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Only the content should scroll, not the entire modal
            p: 3,
          }}
        >
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid item xs={12} md={12} sx={{ marginBottom: "3%" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {t("setup_your_strategy")} {dataEdit && <span style={{ color: "green"}}>: {dataEdit.Name}</span>}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              sx={{
                border: "1px solid rgb(241, 242, 244)",
                borderRadius: "1em",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderRight: !isMobile
                      ? "1px solid rgb(241, 242, 244)"
                      : "none",
                    borderBottom: isMobile
                      ? "1px solid rgb(241, 242, 244)"
                      : "none",
                    padding: 1,
                  }}
                >
                  <Typography
                    fontSize={14}
                    mb={1.5}
                    sx={{ color: "rgb(160, 174, 192) !important" }}
                  >
                    1. {t("strategy_name")}
                  </Typography>
                  <TextField
                    variant="standard" // <== no border
                    fullWidth
                    size="large"
                    name="strategy_name"
                    onBlur={handleBlur}
                    value={values.strategy_name}
                    onChange={handleChange}
                    helperText={touched.strategy_name && errors.strategy_name}
                    error={Boolean(
                      touched.strategy_name && errors.strategy_name
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderBottom: isMobile
                      ? "1px solid rgb(241, 242, 244)"
                      : "none",
                    padding: 1,
                  }}
                >
                  <Typography
                    fontSize={14}
                    mb={1.5}
                    sx={{ color: "rgb(160, 174, 192) !important" }}
                  >
                    2. {t("budget_method")}
                  </Typography>
                  <TextField
                    fullWidth
                    name="budget_method"
                    onBlur={handleBlur}
                    value={values.budget_method}
                    onChange={handleChange}
                    helperText={touched.budget_method && errors.budget_method}
                    error={Boolean(
                      touched.budget_method && errors.budget_method
                    )}
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
                    {CapitalConfigType.map((option) => (
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

                <AllOrderBudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />

                <MartingaleBudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                />

                <FiboXStepBudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                  option_increase={values.option_increase}
                />

<Victor2BudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                />
                <Victor3BudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                />
                 <Victor4BudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                />
                <CustomAutowinBudgetMethod
                  values={values}
                  isMobile={isMobile}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* Sticky Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // This will place the buttons on opposite ends
            p: 2, // Add padding as needed
            position: "sticky", // Sử dụng sticky để giữ nút ở cuối cùng
            bottom: 0, // Đặt ở cuối
            bgcolor: "background.paper", // Đặt màu nền nếu cần
            borderTop: "1px solid rgb(241, 242, 244)"
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
              <Button
                fullWidth
                size="large"
                onClick={() => {
                  setIsOpen(false);
                }}
                variant="outlined"
              >
                {t("close")}
              </Button>
            </Grid>
            <Grid item xs={9} md={9}>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="success"
              >
                {t("save_strategy")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
}

export default PersonalMethodsRightSideContent;
