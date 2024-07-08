import { Box, TableContainer, TablePagination, Typography } from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { TableDataNotFound } from "components/table";
import useMuiTable from "hooks/useMuiTable";
import React, { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import { PunchClock as  ClockIcon} from "@mui/icons-material";
import ClockIconSvg from "components/icons-svg/ClockIconSvg";
import { useTheme } from "@emotion/react";
import { numberFormat } from "utils/numberFormat";
import { useTranslation } from "react-i18next";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
//import { ReactComponent as ClockIcon } from './clock-icon.svg'; // Giả sử bạn đã có SVG này
import { TransitionGroup, CSSTransition } from 'react-transition-group';

  
function HistoryShowContent({ data,boPrice,portfolioInfo }) {

    const theme = useTheme();
    const isLight = theme.palette.mode === "light";

    const {t,i18n } = useTranslation();
  const {
    page,
    order,
    orderBy,
    selected,
    isSelected,
    rowsPerPage,
    handleSelectRow,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
  } = useMuiTable({
    defaultOrderBy: "name",
    defaultRowsPerPage : 6
  });




  const fomartUnixTimestamp = (ts) => {
    const date = new Date(ts);

    const formattedDate = date.toLocaleString(i18n.language, {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true
      });
    return formattedDate;
  }
  return (
    <div>
      {/* TABLE HEAD & BODY ROWS */}
      <TableContainer>
        <Scrollbar autoHide={false}>
  
    <TransitionGroup>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
       // console.log(order.dataBeforeTrade);
        const dataBeforeTrade = JSON.parse(order.dataBeforeTrade)
        return  (
          <CSSTransition key={order.ts} timeout={500} classNames="slide">
   <Accordion key={index} className="order-history-row accordion-animation}">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>                
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography  sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{fomartUnixTimestamp(order.ts)}</Typography>
                    <Typography variant="caption">{t('time')}</Typography>
                    {/* Ví dụ cách sử dụng SvgIcon với inline SVG */}
                    <ClockIconSvg style={{ color : '#0ba259', marginLeft :'3px'}}/>
    
                  </Grid>                  
                  { !['UP', 'DOWN'].includes(order.betType) ? <>
                  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : 'primary.main', fontSize : 13, fontWeight :700}}>{t(order.betType)}</Typography>
                    <Typography variant="caption">{t('type')}</Typography>

                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : 'primary.main', fontSize : 13, fontWeight :700}}>{t(order.message)}</Typography>
                    <Typography variant="caption">{t('descriptions')}</Typography>
                    
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : 'primary.main', fontSize : 13, fontWeight :700}}>{t(numberFormat(portfolioInfo?.Stop_WhenProfit))}/-{t(numberFormat(portfolioInfo?.Stop_WhenLoss))}</Typography>
                    <Typography variant="caption">{t('takeprofit/stoploss')}</Typography>
                    
                  </Grid>
                  </> :<>  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{order.betType}</Typography>
                    <Typography variant="caption">{t('type')}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{numberFormat(order.betAmount)}</Typography>
                    <Typography variant="caption">{t('trade_amount')}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{dataBeforeTrade.CurrentProfit > 0 && "+"}{numberFormat(dataBeforeTrade.CurrentProfit)}</Typography>
                    <Typography variant="caption">{t('pnl')}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    {
                        order.result === 3 ?   <Typography sx={{ color : 'warning.main', fontSize : 13, fontWeight :700}}>{t('waiting_result')} ({boPrice?.isBetSession ?`${30+boPrice?.order}s` : `${30- boPrice?.orderClose}s`})</Typography>:   <Typography sx={{ color : order.winAmount > 0 ? 'success.main' : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{order.winAmount > 0 && "+"}{numberFormat(order.winAmount)}</Typography>
                    }
                  
                    <Typography variant="caption">{t('payout')}</Typography>
                  </Grid></>}
                
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                {/* Nội dung chi tiết của mỗi order, ví dụ: */}
                <Typography sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{t('session')} : {order.sessionId}</Typography>
                <Typography sx={{ color : isLight ? 'black' : 'white', fontSize : 13, fontWeight :700}}>{t('trade_volume')} : {numberFormat(dataBeforeTrade.CurrentVolume)}</Typography>

              </AccordionDetails>
            </Accordion>
          </CSSTransition>
         
          )
      })}
    </TransitionGroup>
          
          
        </Scrollbar>
      </TableContainer>
      <Box padding={1}>
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage || 6}
          count={data.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[6, 12, 24]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('show_result')} // Sửa văn bản ở đây
          labelDisplayedRows={() => ''} // Ẩn thông tin phân trang
          ActionsComponent={TablePaginationActions} // Sử dụng TablePaginationActions

        />
      </Box>
    </div>
  );
}

export default HistoryShowContent;
