import * as React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  Chip,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import CapitalConfigType from "../CapitalConfigType";
import axios from "../../../utils/axios";
import { useSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { WalletTypeContext } from "contexts/walletTypeContext";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import Iconify from "components/Iconify";
import useTabs from "hooks/useTabs";
import BotAiSettingContent from "./BotAiSettingContent";
import FollowLeaderContent from "./FollowLeaderContent";

function PortfolioRightSideContent({ setIsOpen,loadPortfolios,dataEdit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { state: walletState, dispatch } = React.useContext(WalletTypeContext);

  const { t } = useTranslation();
  const {enqueueSnackbar} = useSnackbar();

  const initialValues = {
    plan_name: "",  
    investment_fund : 100,//InvestAmount
    budget_strategy : 0,//CapitalConfigID
    base_amount : 1,//MoneyPerOrder
    pause_plan_condition : false,
    Stop_WhenProfit : 0,
    Stop_WhenLoss : 0,
    Stop_WhenWinTotal: 0,
    Stop_WhenLoseTotal: 0,
    Stop_WhenWinStreak: 0,
    Stop_WhenLoseStreak:0,
    IsReverseOrder: false,
    BrokerMode: false,
    LeaderUsername: "",
    PrivateMode : false,
    ChildLoss : 0,
    ChildProfit : 0,
    OrderSecond: 15
  };
  const validationSchema = Yup.object().shape({
    plan_name: Yup.string().required("Plan name is required"),
    investment_fund: Yup.number().required("Investment fund is required"),

  });

  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let Name = values.plan_name.trim();
        let AccountType =  walletState.type;
        let MoneyPerOrder = parseFloat(values.base_amount);
        let OrderSecond = 15;
        let CapitalConfigID = values.budget_strategy;
        let InvestAmount= values.investment_fund;


        let Stop_WhenProfit = !values.pause_plan_condition  ? 0 :values.Stop_WhenProfit;
        let Stop_WhenLoss = !values.pause_plan_condition  ? 0 :values.Stop_WhenLoss;
        let Stop_WhenWinTotal = !values.pause_plan_condition  ? 0 :values.Stop_WhenWinTotal;
        let Stop_WhenLoseTotal = !values.pause_plan_condition  ? 0 :values.Stop_WhenLoseTotal;
        let Stop_WhenWinStreak = !values.pause_plan_condition  ? 0 :values.Stop_WhenWinStreak;
        let Stop_WhenLoseStreak = !values.pause_plan_condition  ? 0 :values.Stop_WhenLoseStreak;

        let IsReverseOrder = values.IsReverseOrder;
        let BrokerMode = values.BrokerMode;
        let LeaderUsername = values.LeaderUsername;
        let Type = currentTab === "Bot AI" ? 0 : 1
        let PrivateMode = values.PrivateMode;

        const {data} = !dataEdit ? await axios.post('/api/bot/new', {
          Name,
          AccountType,
          MoneyPerOrder,
          OrderSecond,
          CapitalConfigID,
          InvestAmount,
          Stop_WhenProfit,Stop_WhenLoss,Stop_WhenWinTotal,Stop_WhenLoseTotal,
          Stop_WhenWinStreak,Stop_WhenLoseStreak,
          IsReverseOrder,BrokerMode,LeaderUsername,
          Type,
          PrivateMode
        }) :  await axios.post('/api/bot/update', {
          ID : dataEdit.ID,
          Name,
          AccountType,
          MoneyPerOrder,
          OrderSecond,
          CapitalConfigID,
          InvestAmount,
          Stop_WhenProfit,Stop_WhenLoss,Stop_WhenWinTotal,Stop_WhenLoseTotal,
          Stop_WhenWinStreak,Stop_WhenLoseStreak,
          IsReverseOrder,BrokerMode,LeaderUsername,
          Type,
          PrivateMode
        })
        if(!data.ok){
          enqueueSnackbar(t(data.d.err_code || data.m), {variant : 'error'})

        }else{
          enqueueSnackbar(t(!dataEdit ? 'create_a_successful_strategy' : 'success'), {variant : 'success'})
          loadPortfolios();
          setIsOpen(false)
        }
        console.log(data);


      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;


  React.useEffect(()=>{
    if(dataEdit){

      console.log('portfolio dataedit', dataEdit);
      setFieldValue('plan_name', dataEdit.Name);
      setFieldValue('investment_fund', dataEdit.InvestAmount);
      setFieldValue('budget_strategy', dataEdit.CapitalConfigID);
      setFieldValue('base_amount', dataEdit.MoneyPerOrder);
      let pause_plan_condition = Boolean(dataEdit.Stop_WhenLoseStreak >0 || 
      dataEdit.Stop_WhenLoseTotal > 0 || dataEdit.Stop_WhenLoss > 0 ||
      dataEdit.Stop_WhenProfit > 0 || dataEdit.Stop_WhenWinStreak > 0 || dataEdit.Stop_WhenWinTotal> 0);
      console.log('pause_plan_condition', pause_plan_condition);
      setFieldValue('pause_plan_condition', pause_plan_condition);
      setFieldValue('Stop_WhenProfit', dataEdit.Stop_WhenProfit);
      setFieldValue('Stop_WhenLoss', dataEdit.Stop_WhenLoss);
      setFieldValue('Stop_WhenWinTotal', dataEdit.Stop_WhenWinTotal);
      setFieldValue('Stop_WhenLoseTotal', dataEdit.Stop_WhenLoseTotal);
      setFieldValue('Stop_WhenWinStreak', dataEdit.Stop_WhenWinStreak);
      setFieldValue('Stop_WhenLoseStreak', dataEdit.Stop_WhenLoseStreak);
      setFieldValue('IsReverseOrder', dataEdit.IsReverseOrder);
      setFieldValue('BrokerMode', dataEdit.BrokerMode);
      setFieldValue('LeaderUsername', dataEdit.LeaderUsername);
      setFieldValue('ChildLoss', dataEdit.ChildLoss);
      setFieldValue('ChildProfit', dataEdit.ChildProfit);
      setFieldValue('OrderSecond', dataEdit.OrderSecond);
      setFieldValue('PrivateMode', dataEdit.PrivateMode); // chua update


    }



  }, [dataEdit])

  const handleIncrementInvestmentFund = () => {
    const investment_fund = values.investment_fund || 1;

    setFieldValue("investment_fund", parseFloat(investment_fund) + 1);
  };

  const handleDecrementInvestmentFund = () => {
    const investment_fund = values.investment_fund || 1;

    setFieldValue(
      "investment_fund",
      Math.max(0, parseFloat(investment_fund) - 1)
    );
  };
  const { currentTab, onChangeTab } = useTabs("Bot AI");

  const CONFIG_TYPE_TABS = [
    {
      value: "Bot AI",
      icon: <Iconify icon={'fluent:bot-sparkle-20-filled'} width={20} height={20} />,
      component: (
       <BotAiSettingContent  formik={formik}/>
      ),
    },
    {
      value: "Follow Leader",
      icon: <Iconify icon={'fluent-mdl2:party-leader'} width={20} height={20} />,
      component: (
        <FollowLeaderContent  formik={formik}/>

      ),
    },
  ];
 

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
                {t("Step")} 1: {t("plan_profile")} <Chip label={walletState.type} color={walletState.type === "LIVE" ?"success" : "error"}/> 
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              sx={{
                border: "1px solid #424242",
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
                      ? "1px solid #424242"
                      : "none",
                    borderBottom: isMobile
                      ? "1px solid #424242"
                      : "none",
                    padding: 1,
                  }}
                >
                  <Typography
                    fontSize={14}
                    mb={1.5}
                    sx={{ color: "rgb(160, 174, 192) !important" }}
                  >
                   {t("plan_name")}
                  </Typography>
                  <TextField
                    variant="standard" // <== no border
                    fullWidth
                    size="large"
                    name="plan_name"
                    onBlur={handleBlur}
                    value={values.plan_name}
                    onChange={handleChange}
                    placeholder={t("enter_plan_name")}
                    helperText={touched.plan_name && errors.plan_name}
                    error={Boolean(
                      touched.plan_name && errors.plan_name
                    )}
                  />
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
                    {t("investment_fund")}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={handleDecrementInvestmentFund}
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
                          value={values.investment_fund} // Format the value as a localized string
                          onChange={handleChange}
                          name="investment_fund"
                          type="text" // Use "text" type for TextField to properly format the number
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
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
                          onClick={handleIncrementInvestmentFund}
                          size="large"
                          sx={{borderRadius: "50%",
                          color: "success.main", // Use a color from your theme or a CSS color value
                          "&:hover": {
                            backgroundColor: "success.light", // Adjust hover background color
                          }, }}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </Box>
                </Grid>

              
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "3%", marginTop : "3%" }}>
              <Typography sx={{ fontWeight: "bold" }}>
              {t("Step")} 2: {t("setup_your_plan")}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} sx={{ 
            paddingBottom : 2}}>
            <Tabs
        allowScrollButtonsMobile
        variant="fullWidth"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
        centered
      >
        {CONFIG_TYPE_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>
      <Box sx={{ mb: 3 }} />

      {CONFIG_TYPE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
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
            borderTop: "1px solid #424242"
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

export default PortfolioRightSideContent;
