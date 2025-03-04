import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline, StyledEngineProvider } from "@mui/material";
import NotistackProvider from './components/NotistackProvider';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// AUTH CONTEXT FILE
import { AuthProvider } from "contexts/jwtContext";
// RIGHT-TO-LEFT SUPPORT COMPONENT
import { RTL } from "components/rtl";
// ROUTES METHOD
import { routes } from "./routes";
// MUI THEME CREATION METHOD
import { createCustomTheme } from "./theme";
// SITE SETTINGS CUSTOM DEFINED HOOK
import useSettings from "hooks/useSettings";
// I18N FILE
import "./i18n";
import { WalletTypeProvider } from "contexts/walletTypeContext";
import { PortfolioProvider } from "contexts/portfolioContext";

const App = () => {
  const {
    settings
  } = useSettings();
  const theme = createCustomTheme(settings);
  // ROUTER CREATE
  const router = createBrowserRouter(routes());
   
  

  return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
       
        <ThemeProvider theme={theme}>
        <NotistackProvider>
          <AuthProvider>
            <RTL>
          
              <CssBaseline />
              <PortfolioProvider>
              <WalletTypeProvider>
              <RouterProvider router={router} />
              </WalletTypeProvider>
              </PortfolioProvider>
           
             
            </RTL>
          </AuthProvider>
          </NotistackProvider>
        </ThemeProvider>
      
      </StyledEngineProvider>
    </LocalizationProvider>;
};
export default App;