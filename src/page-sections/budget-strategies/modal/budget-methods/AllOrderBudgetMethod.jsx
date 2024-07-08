import * as React from "react";
import {
  TextField,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useTranslation } from "react-i18next";



function AllOrderBudgetMethod({values, isMobile,setFieldValue, handleChange}) {
  const { t } = useTranslation();
    
  const handleIncrementAllOrder = () => {
    const tradeAmount = values.tradeAmountAllOrder || 1;

    setFieldValue("tradeAmountAllOrder", parseFloat(tradeAmount) + 1);
  };

  const handleDecrementAllOrder = () => {
    const tradeAmount = values.tradeAmountAllOrder || 1;

    setFieldValue(
      "tradeAmountAllOrder",
      Math.max(0, parseFloat(tradeAmount) - 1)
    );
  };
    return (
        <>
        {values.budget_method === 0 && (
                  <>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        borderRight: !isMobile
                          ? "1px solid rgb(241, 242, 244)"
                          : "none",
                        borderBottom: isMobile
                          ? "1px solid rgb(241, 242, 244)"
                          : "none",
                        borderTop: !isMobile
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
                        3. {t("set_trade_amount")}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={handleDecrementAllOrder}
                          size="large"
                          sx={{
                            borderRadius: "50%",
                            color: "error.main", // Use a color from your theme or a CSS color value
                            "&:hover": {
                              backgroundColor: "error.light", // Adjust hover background color
                            },
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <TextField
                          value={values.tradeAmountAllOrder} // Format the value as a localized string
                          onChange={handleChange}
                          name="tradeAmountAllOrder"
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
                          onClick={handleIncrementAllOrder}
                          size="large"
                          sx={{borderRadius: "50%",
                          color: "success.main", // Use a color from your theme or a CSS color value
                          "&:hover": {
                            backgroundColor: "success.light", // Adjust hover background color
                          }, }}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        borderRight: !isMobile
                          ? "1px solid rgb(241, 242, 244)"
                          : "none",
                        borderBottom: isMobile
                          ? "1px solid rgb(241, 242, 244)"
                          : "none",
                        borderTop: !isMobile
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
                         {t('about_all_orders')}
                      </Typography>
                    
                    </Grid>
                  </>
                )}
        </>
    );
}

export default AllOrderBudgetMethod;