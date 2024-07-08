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



function FiboXStepBudgetMethod({values, isMobile,setFieldValue, handleChange, touched, handleBlur, errors, option_increase}) {
  const { t } = useTranslation();
        
  const handleIncrementLoss = () => {
    const a_loss_will_advance = values.a_loss_will_advance || 1;

    setFieldValue("a_loss_will_advance", parseInt(a_loss_will_advance) + 1);

  };

  const handleDecrementLoss = () => {
    const a_loss_will_advance = values.a_loss_will_advance || 1;

    setFieldValue(
      "a_loss_will_advance",
      Math.max(0, parseInt(a_loss_will_advance) - 1)
    );
  };

          
  const handleIncrementWin = () => {
    const a_win_will_set_back = values.a_win_will_set_back || 1;

    setFieldValue("a_win_will_set_back", parseInt(a_win_will_set_back) + 1);

  };

  const handleDecrementWin = () => {
    const a_win_will_set_back = values.a_win_will_set_back || 1;

    setFieldValue(
      "a_win_will_set_back",
      Math.max(0, parseInt(a_win_will_set_back) - 1)
    );
  };
    return (
        <>
        {values.budget_method === 2 && (
                  <>
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
                        3. {t("set_order_value")} ({values.order_value_fibo.split('-').length} {t('step')})
                      </Typography>
                      <TextField
                    variant="standard" // <== no border
                    fullWidth
                    size="large"
                    name="order_value_fibo"
                    onBlur={handleBlur}
                    value={values.order_value_fibo}
                    onChange={handleChange}
                    helperText={touched.order_value_fibo && errors.order_value_fibo}
                    error={Boolean(
                      touched.order_value_fibo && errors.order_value_fibo
                    )}
                  />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        borderRight: "none",
                        borderBottom: isMobile ? "1px solid rgb(241, 242, 244)" : "none",
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
                    4. {t("option")}
                  </Typography>
                     <TextField
                    fullWidth
                    name="option_increase"
                    onBlur={handleBlur}
                    value={values.option_increase}
                    onChange={handleChange}
                    helperText={touched.option_increase && errors.option_increase}
                    error={Boolean(
                      touched.option_increase && errors.option_increase
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
                    {IncreaseConfigType.map((option) => (
                      option.Type < 2 &&
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
                      md={6}
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
                     { option_increase === 0 ? t("a_loss_will_advance") : t("a_win_will_advance")}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={handleDecrementLoss}
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
                          value={values.a_loss_will_advance} // Format the value as a localized string
                          onChange={handleChange}
                          name="a_loss_will_advance"
                          type="number" // Use "text" type for TextField to properly format the number
                         
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
                          onClick={handleIncrementLoss}
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
                      md={6}
                      sx={{
                        borderRight: "none",
                        borderBottom: "1px solid rgb(241, 242, 244)",
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
                     { option_increase === 0 ? t("a_win_will_set_back") : t("a_loss_will_set_back")}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={handleDecrementWin}
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
                          value={values.a_win_will_set_back} // Format the value as a localized string
                          onChange={handleChange}
                          name="a_win_will_set_back"
                          type="number" // Use "text" type for TextField to properly format the number
                         
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
                          onClick={handleIncrementWin}
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
                    
                  </>
                )}
        </>
    );
}

export default FiboXStepBudgetMethod;