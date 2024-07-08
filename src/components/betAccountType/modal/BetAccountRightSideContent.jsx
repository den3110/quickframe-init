import * as React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../../../utils/axios";
import { useSnackbar } from "notistack";
import { CurrencyExchange } from "@mui/icons-material";
import CardAccountLive from "./CardAccountLive";
import CardAccountDemo from "./CardAccountDemo";
import SquareButtonIcon from "components/buttons/SquareButtonIcon";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DepositSvg from "components/icons-svg/DepositSvg";
import WithdrawSvg from "components/icons-svg/WithdrawSvg";
import TransferSvg from "components/icons-svg/TransferSvg";
import RefillBalanceSvg from "components/icons-svg/RefillBalanceSvg";
import { useContext } from "react";
import { WalletTypeContext } from "contexts/walletTypeContext";

function BetAccountRightSideContent({
  isMobile,
  setIsOpen,
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {};
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
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });
  const { state : walletState, dispatch } = useContext(WalletTypeContext);

  const handleSetBetAccountType = (accountType)=>{
    dispatch({ type: 'SET_WALLET_TYPE', payload: accountType });
  }

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                {t("exchange_wallet")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ marginBottom: "1%" }}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      handleSetBetAccountType(
                        walletState.type === "LIVE" ? "DEMO" : "LIVE"
                      );
                    }}
                    color={walletState.type === "LIVE" ? "primary" : "success"}
                    size="small"
                    startIcon={<CurrencyExchange />}
                  >
                    {" "}
                    {walletState.type === "LIVE"
                      ? t("switch_to_demo_mode")
                      : t("switch_to_live_mode")}
                  </Button>
                </Grid>
                {walletState.type === "LIVE" && (
                  <>
                    <Grid item xs={12} md={12}>
                      <CardAccountLive />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <SquareButtonIcon
                        text={t("withdraw")}
                        icon={
                         <WithdrawSvg/>
                        }
                      />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <SquareButtonIcon
                        text={t("deposit")}
                        icon={
                          <DepositSvg/>
                        }
                      />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <SquareButtonIcon
                        text={t("transfer")}
                        icon={
                        <TransferSvg/>
                        }
                      />
                    </Grid>
                  </>
                )}
                {walletState.type === "DEMO" && (
                  <>
                    <Grid item xs={12} md={12}>
                      <CardAccountDemo />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <SquareButtonIcon
                        text={t("refill_balance")}
                        icon={
                         <RefillBalanceSvg/>
                        }
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
}

export default BetAccountRightSideContent;
