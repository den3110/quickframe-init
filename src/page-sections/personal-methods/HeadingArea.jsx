import { TabContext, TabList } from "@mui/lab";
import { Button, Grid, styled, Tab } from "@mui/material";
// CUSTOM DEFINED HOOK
import useNavigate from "hooks/useNavigate";
// CUSTOM COMPONENTS
import { Paragraph } from "components/typography";
import { IconWrapper } from "components/icon-wrapper";
import { FlexBetween, FlexBox } from "components/flexbox";
// CUSTOM ICON COMPONENTS
import GroupSenior from "icons/GroupSenior";
import Add from "icons/Add";
import { useTranslation } from "react-i18next";
import Iconify from "components/Iconify";

// STYLED COMPONENT
const TabListWrapper = styled(TabList)(({
  theme
}) => ({
  borderBottom: 0,
  [theme.breakpoints.down(727)]: {
    order: 3
  }
}));

// ===================================================================

// ===================================================================

const HeadingArea = ({
  value,
  changeTab,
  isOpenBSModal,
  setIsOpenBSModal,
  count
}) => {
  const navigate = useNavigate();

  const {t} = useTranslation();

  return <FlexBetween flexWrap="wrap" gap={1}>
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} md={10.5}>
      <FlexBox flex={4} alignItems="center">
      <IconWrapper>
        <Iconify icon={"mdi:signal"} sx={{ width: 27, height: 27, color: "primary.main" }} />
      </IconWrapper>
      <Paragraph fontSize={20}>{t('signal_list')} ({count})</Paragraph>
      </FlexBox>
     
    </Grid>
    <Grid item xs={12} md={1.5} alignItems="center">
      <Button fullWidth variant="contained" startIcon={<Add />} onClick={() => { setIsOpenBSModal(!isOpenBSModal) }}>
        {t('new_method')}
      </Button>
    </Grid>
  </Grid>
</FlexBetween>;

};
export default HeadingArea;