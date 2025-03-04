import { Fragment, useRef, useState } from "react";
import { Box, styled, Avatar, Divider, ButtonBase } from "@mui/material";
// CUSTOM COMPONENTS
import PopoverLayout from "./PopoverLayout";
import { FlexBox } from "components/flexbox";
import { AvatarLoading } from "components/avatar-loading";
import { H6, Paragraph, Small } from "components/typography";
// CUSTOM DEFINED HOOK
import useAuth from "hooks/useAuth";
import useNavigate from "hooks/useNavigate";
// CUSTOM UTILS METHOD
import { isDark } from "utils/constants";

// STYLED COMPONENTS
const StyledButtonBase = styled(ButtonBase)(({
  theme
}) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[isDark(theme) ? 800 : 200]}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));
const StyledSmall = styled(Paragraph)(({
  theme
}) => ({
  fontSize: 13,
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));
const ProfilePopover = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const {
    logout,user
  } = useAuth();
  const [open, setOpen] = useState(false);
  const handleMenuItem = path => () => {
    navigate(path);
    setOpen(false);
  };
  return <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading alt="user" percentage={60} src="/static/user/bot.png" sx={{
        width: 35,
        height: 35
      }} />
      </StyledButtonBase>

      <PopoverLayout hiddenViewButton maxWidth={230} minWidth={200} popoverOpen={open} anchorRef={anchorRef} popoverClose={() => setOpen(false)} title={<FlexBox alignItems="center" gap={1}>
      <Avatar sx={{ width: 35, height: 35 }}>
    {user?.nick_name ? user.nick_name.split(' ').slice(0, 2).map(name => name[0]).join('').toUpperCase() : ''}
  </Avatar>

            <Box>
              <H6 fontSize={14}>{user?.nick_name}</H6>
              <Small color="text.secondary" display="block">
                {user?.email}
              </Small>
            </Box>
          </FlexBox>}>
        <Box pt={1}>
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Set Status</StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Profile & Account
          </StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/account")}>Settings</StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Manage Team</StyledSmall>

          <Divider sx={{
          my: 1
        }} />

          <StyledSmall onClick={logout}>Sign Out</StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>;
};
export default ProfilePopover;