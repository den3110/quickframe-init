import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomMoreMenu from "components/CustomMoreMenu";
import Iconify from "components/Iconify";
import { TableMoreMenuItem } from "components/table";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "utils/axios";
import { enqueueSnackbar } from "notistack";
import useTabs from "hooks/useTabs";
import HistoryShowContent from "./HistoryShowContent";
import SocketContext from "contexts/SocketContext";
import SocketClient from "services/SocketClient";
import RightSideModalCustom from "components/modals/RightSideModalCustom";
import { WalletTypeContext } from "contexts/walletTypeContext";
import PortfolioRightSideContent from "page-sections/portfolio/modal/PortfolioRightSideContent";

function HistoryPageView(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };
  const handleCloseOpenMenu = () => setOpenMenuEl(null);
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();

  const { _botId = "" } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioInfo, setPortfolioInfo] = useState();

  const loadDataBot = useCallback(() => {
    // setLoading(true);
    axiosInstance
      .get(`/api/bot/info?id=${_botId}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.ok) {
          setPortfolioInfo(data.d);
        }
      });
    // .finally(() => {
    //     setLoading(false);
    // });
  }, [_botId]);

  const [historyData, setHistoryData] = useState([]);

  const fetchData = useCallback(() => {
    // setLoading(true);
    axiosInstance
      .get(`/api/bot/history?&botId=${_botId}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.ok) {
          setHistoryData(data.d.c);
        }
      });
  }, [currentPage, _botId]);

  useEffect(() => {
    loadDataBot();
  }, [loadDataBot]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { socketInitialized } = useContext(SocketContext);
  const [boPrice, setBoPrice] = useState();

  const handleBoPrice = (data)=>{
    setBoPrice(data);
    console.log('boprice' , data);
  }

  useEffect(() => {
    if (!socketInitialized) {
        return;
    }
    SocketClient.getInstance().socket().emit("BO_PRICE_SUBSCRIBE");
    SocketClient.getInstance().socket().emit("PORTFOLIO_HISTORY_SUBSCRIBE");

    SocketClient.getInstance().socket().on("PORTFOLIO_HISTORY", fetchData);
    SocketClient.getInstance().socket().on("BO_PRICE", handleBoPrice);

    return () => {
        SocketClient.getInstance().socket().emit("BO_PRICE_UNSUBSCRIBE");
        SocketClient.getInstance().socket().emit("PORTFOLIO_HISTORY_UNSUBSCRIBE");
        SocketClient.getInstance().socket().off("PORTFOLIO_HISTORY", fetchData);
        SocketClient.getInstance().socket().off("BO_PRICE", handleBoPrice);

    };
}, [socketInitialized]);

const [dataEdit, setDataEdit] = useState(null);
const [portfolioData, setPortfolioData] = useState([])
const { state: walletState } = useContext(WalletTypeContext);


const [isOpenBSModal, setIsOpenBSModal] = useState(false);
  useEffect(()=>{
    if(!isOpenBSModal){
      setDataEdit(null);
    }
  }, [isOpenBSModal])


  const loadPortfolios = ()=>{
    try {
      axiosInstance.get(`/api/bot/list?account_type=${walletState.type}`).then(({data})=>{
          if(data.ok){
            setPortfolioData(data.d)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }


  const handleActionPortfolio = async (botId, actionType) => {
    try {
      const { data } = await axiosInstance.post("/api/bot/action", {
        ID: botId,
        actionType,
      });

      if (data.ok) {
        enqueueSnackbar(t(data.m), { variant: "success" });
      } else {
        enqueueSnackbar(t(data.m), { variant: "error" });
      }

      loadDataBot();
    } catch (error) {
      console.error(error);
    }
  };


  const { currentTab, onChangeTab } = useTabs('plan_timeline');


  const tabs = [
    {
      key : 'plan_timeline',
      value: t('plan_timeline'),
      icon: <Iconify icon={'fluent:timeline-24-regular'} width={20} height={20} />,
      component: <HistoryShowContent portfolioInfo={portfolioInfo} data={historyData} boPrice={boPrice}/>,
    },
    {
      key : 'statistics',
      value: t('statistics'),
      icon: <Iconify icon={'wpf:statistics'} width={20} height={20} />,
      component: <>Coming soon</>,
    },
  ]
  const loadDataEditById = (id)=>{
    try {
      axiosInstance.get(`/api/bot/info?id=${id}`).then(({data})=>{

          if(data.ok){
            setDataEdit(data.d)
            setIsOpenBSModal(true)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }
  
  return (
    <>
     <RightSideModalCustom isOpen={isOpenBSModal} setIsOpen={setIsOpenBSModal} loadPortfolios={loadPortfolios} dataEdit={dataEdit} children={<PortfolioRightSideContent setIsOpen={setIsOpenBSModal} loadPortfolios={loadPortfolios} dataEdit={dataEdit}/>}/>
    <Box pt={2} pb={4}>
      <Card>
        <Grid container spacing={1} p={1}>
          {isMobile ? (
            <>
              <Grid item xs={1} md={1}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate("/portfolio");
                  }}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={
                    <Iconify
                      sx={{ color: "success.main", marginLeft: 1.1 }}
                      icon="eva:arrow-back-outline"
                    />
                  }
                />
              </Grid>
              <Grid item xs={4} md={4}></Grid>
              <Grid item xs={1} md={1}>
                {portfolioInfo?.IsRunning ? (
                  <Button
                    fullWidth
                    onClick={() => {
                      handleActionPortfolio(_botId, "PAUSE");
                    }}
                    size="small"
                    variant="contained"
                    color="warning"
                    startIcon={
                      <Iconify
                        sx={{ marginLeft: 1.1 }}
                        icon="carbon:pause-filled"
                      />
                    }
                  />
                ) : (
                  <Button
                    fullWidth
                    onClick={() => {
                      handleActionPortfolio(_botId, "START");
                    }}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={
                      <Iconify
                        sx={{ marginLeft: 1.1 }}
                        icon="carbon:continue-filled"
                      />
                    }
                  />
                )}
              </Grid>
              <Grid item xs={1} md={1} ml={5}>
                <Button
                  fullWidth
                  onClick={() => {
                    handleActionPortfolio(_botId, "RESTART");
                  }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={
                    <Iconify sx={{ marginLeft: 1.1 }} icon="mdi:restart" />
                  }
                />
              </Grid>
              <Grid item xs={1} md={1} ml={5}>
                <CustomMoreMenu
                  size="small"
                  open={openMenuEl}
                  handleOpen={handleOpenMenu}
                  handleClose={handleCloseOpenMenu}
                >
                  <TableMoreMenuItem
                    Icon={Edit}
                    title={t("edit")}
                    handleClick={() => {
                      handleCloseOpenMenu();
                      loadDataEditById(_botId)
                    }}
                  />
                  {/* <TableMoreMenuItem
                    Icon={DeleteOutline}
                    title={t("delete")}
                    handleClick={() => {
                      handleCloseOpenMenu();
                      handleActionPortfolio(_botId, "DELETE");
                    }}
                  /> */}
                </CustomMoreMenu>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={2} md={2}>
                <Button
                  onClick={() => {
                    navigate("/portfolio");
                  }}
                  size="large"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<Iconify icon="eva:arrow-back-outline" />}
                >
                  {t("return")}
                </Button>
              </Grid>
              <Grid item xs={5.5} md={5.5}></Grid>
              <Grid item xs={1.5} md={1.5}>
                {portfolioInfo?.IsRunning ? (
                  <Button
                    onClick={() => {
                      handleActionPortfolio(_botId, "PAUSE");
                    }}
                    size="large"
                    variant="contained"
                    color="warning"
                    fullWidth
                    startIcon={<Iconify icon="carbon:pause-filled" />}
                  >
                    {t("Inactive")}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleActionPortfolio(_botId, "START");
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Iconify icon="carbon:continue-filled" />}
                  >
                    {t("continue")}
                  </Button>
                )}
              </Grid>
              <Grid item xs={2} md={2}>
                <Button
                  onClick={() => {
                    handleActionPortfolio(_botId, "RESTART");
                  }}
                  size="large"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<Iconify icon="mdi:restart" />}
                >
                  {t("restart")}
                </Button>
              </Grid>
              <Grid item xs={1} md={1}>
                <CustomMoreMenu
                  size="large"
                  open={openMenuEl}
                  handleOpen={handleOpenMenu}
                  handleClose={handleCloseOpenMenu}
                >
                  <TableMoreMenuItem
                    Icon={Edit}
                    title={t("edit")}
                    handleClick={() => {
                      handleCloseOpenMenu();
                       loadDataEditById(_botId)
                    }}
                  />
                  {/* <TableMoreMenuItem
                    Icon={DeleteOutline}
                    title={t("delete")}
                    handleClick={() => {
                      handleCloseOpenMenu();
                      handleActionPortfolio(_botId, "DELETE");
                    }}
                  /> */}
                </CustomMoreMenu>
              </Grid>
            </>
          )}
        </Grid>
      </Card>       

    </Box>

    <Box>

      <Grid container spacing={1} p={2}>
       
      <Grid item xs={12} md={12} sx={{ 
            paddingBottom : 2}}>
               <Card  sx={{padding : 2}}><Tabs
        allowScrollButtonsMobile
        variant="fullWidth"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
        centered
      >
        {tabs.map((tab) => (
          <Tab disableRipple key={tab.key} label={tab.value} icon={tab.icon} value={tab.key} />
        ))}
      </Tabs></Card>
            
     
      <Box sx={{ mb: 2 }} />
      <Card sx={{padding : 2}}>
      {tabs.map((tab) => {
        const isMatched = tab.key === currentTab;
        return isMatched && <Box key={tab.key}>{tab.component}</Box>;
      })}
        </Card>
            </Grid>
        </Grid>
    

    </Box>
    </>
  );
}

export default HistoryPageView;
