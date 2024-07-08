import { Fragment, useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// LAYOUT BASED HOOK
import useLayout from "./context/useLayout";
// SITE SETTINGS CONTEXT FILE
import { SettingsContext } from "contexts/settingsContext";
// CUSTOM ICON COMPONENTS
import Menu from "icons/Menu";
import MenuLeft from "icons/MenuLeft";
import ThemeIcon from "icons/ThemeIcon";
// import SearchIcon from "icons/SearchIcon";
import Search from "icons/duotone/Search";
import MenuLeftRight from "icons/MenuLeftRight";
// CUSTOM COMPONENTS
import SearchBar from "../layout-parts/SearchBar";
import ProfilePopover from "../layout-parts/popovers/ProfilePopover";
import ServicePopover from "../layout-parts/popovers/ServicePopover";
import LanguagePopover from "../layout-parts/popovers/LanguagePopover";
import NotificationsPopover from "../layout-parts/popovers/NotificationsPopover";
// STYLED COMPONENTS
import {
  DashboardHeaderRoot,
  StyledToolBar,
} from "../layout-parts/styles/header";
import { useTranslation } from "react-i18next";
import axiosInstance from "utils/axios";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BetAccountType from "components/betAccountType/BetAccountType";

const DashboardHeader = () => {
  const { handleOpenMobileSidebar } = useLayout();
  const [openSearchBar, setSearchBar] = useState(false);
  const { settings, saveSettings } = useContext(SettingsContext);
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const downMd = useMediaQuery((theme) => theme.breakpoints.down(1200));
  const handleChangeDirection = (value) => {
    saveSettings({
      ...settings,
      direction: value,
    });
  };
  const handleChangeTheme = (value) => {
    saveSettings({
      ...settings,
      theme: value,
    });
  };


  const { t } = useTranslation();

  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {/* SMALL DEVICE SIDE BAR OPEN BUTTON */}
        {downMd && (
          <IconButton onClick={handleOpenMobileSidebar}>
            <Menu />
          </IconButton>
        )}

        {/* SEARCH ICON BUTTON */}
        {/* <ClickAwayListener onClickAway={() => setSearchBar(false)}>
          <Box>
            {!openSearchBar ? (
              <IconButton onClick={() => setSearchBar(true)}>
                <Search
                  sx={{
                    color: "grey.400",
                    fontSize: 18,
                  }}
                />
              </IconButton>
            ) : null}

            <SearchBar
              open={openSearchBar}
              handleClose={() => setSearchBar(false)}
            />
          </Box>
        </ClickAwayListener> */}

        <Box flexGrow={1} ml={1} />

        <BetAccountType/> 

        {/* THEME SWITCH BUTTON */}
        <IconButton
          onClick={() => {
            handleChangeTheme(settings.theme === "light" ? "dark" : "light");
          }}
        >
          <ThemeIcon />
        </IconButton>
        <LanguagePopover />
        {upSm && (
          <Fragment>
        
            <NotificationsPopover />
            <ServicePopover />
          </Fragment>
        )}

        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
};
export default DashboardHeader;
