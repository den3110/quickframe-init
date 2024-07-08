import { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
// CUSTOM COMPONENTS
import { Scrollbar } from "components/scrollbar";
import { TableDataNotFound, TableToolbar } from "components/table";
// CUSTOM PAGE SECTION COMPONENTS
import SearchArea from "../SearchArea";
import HeadingArea from "../HeadingArea";
import PortfolioTableRow from "../PortfolioTableRow";
import PortfolioTableHead from "../PortfolioTableHead";
// CUSTOM DEFINED HOOK
import useMuiTable, { getComparator, stableSort } from "hooks/useMuiTable";
// CUSTOM DUMMY DATA
import axios from "utils/axios";
import { LoadingButton } from "theme/components/button";
import { LoadingProgress } from "components/loader";
import { Add } from "@mui/icons-material";
import PortfolioCard from "../PortfolioCard";
import axiosInstance from "utils/axios";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { WalletTypeContext } from "contexts/walletTypeContext";
import RightSideModalCustom from "components/modals/RightSideModalCustom";
import PortfolioRightSideContent from "../modal/PortfolioRightSideContent";


function PortfolioPageView(props) {

  const [portfolioData, setPortfolioData] = useState([])
  const matches = useMediaQuery('(max-width:600px)');
  const {t} = useTranslation();

  const [dataEdit, setDataEdit] = useState(null);
  const { state: walletState } = useContext(WalletTypeContext);


  const loadDataEditById = (id)=>{
    try {
      axios.get(`/api/bot/info?id=${id}`).then(({data})=>{

          if(data.ok){
            setDataEdit(data.d)
            setIsOpenBSModal(true)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }

  const loadPortfolios = ()=>{
    try {
      axios.get(`/api/bot/list?account_type=${walletState.type}`).then(({data})=>{
          if(data.ok){
            setPortfolioData(data.d)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }

  useEffect(()=>{
    loadPortfolios();
  }, [walletState])


  const [dataFilter, setDataFilter] = useState({
    role: "",
    search: "",
  });
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
  const handleChangeFilter = (key, value) => {
    setDataFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };
  const handleChangeTab = (_, newValue) => {
    handleChangeFilter("role", newValue);
  };
  let filteredDatas = stableSort(portfolioData, getComparator(order, orderBy)).filter(
    (item) => {
      if (dataFilter.search)
        return item.Name
          .toLowerCase()
          .includes(dataFilter.search.toLowerCase());
      else return true;
    }
  );
  const handleDeleteBudgetStrategy = async(id) => {
    try{
      const {data} = await axiosInstance.delete(`/api/bot/capital-config/delete?id=${id}`);

      if(data.ok){
        setPortfolioData((state) => state.filter((item) => item.ID !== id));
        enqueueSnackbar(t('success'), {variant : 'success'});
      }
    }catch(err){

    }
  };
  const handleAllBudgetStrategyDelete = async() => {
    try{
      const {data} = await axiosInstance.post(`/api/bot/capital-config/delete-multiple`, {ids : selected})
      if(data.ok){
        setPortfolioData((state) => state.filter((item) => !selected.includes(item.ID)));
        handleSelectAllRows([])();
      }
    }catch(err){
      console.error(err)
    }


 
  };

  const [isOpenBSModal, setIsOpenBSModal] = useState(false);
  useEffect(()=>{
    if(!isOpenBSModal){
      setDataEdit(null);
    }
  }, [isOpenBSModal])



  const handleActionPortfolio =async (botId , actionType)=>{
    try {
      const {data} = await axiosInstance.post('/api/bot/action', {
        ID : botId,
        actionType
      });

      if(data.ok){
        loadPortfolios();
        enqueueSnackbar(t(data.m), {variant : 'success'})
      }else{
        enqueueSnackbar(t(data.m), {variant : 'error'})

      }

      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box pt={2} pb={4}>
         <RightSideModalCustom isOpen={isOpenBSModal} setIsOpen={setIsOpenBSModal} loadPortfolios={loadPortfolios} dataEdit={dataEdit} children={<PortfolioRightSideContent setIsOpen={setIsOpenBSModal} loadPortfolios={loadPortfolios} dataEdit={dataEdit}/>}/>
      <Card>
        <Box px={2} pt={2}>
          <HeadingArea setIsOpenBSModal={setIsOpenBSModal} isOpenBSModal={isOpenBSModal} value={dataFilter.role} changeTab={handleChangeTab} count={portfolioData?.length || 0}/>

          <SearchArea
            value={dataFilter.search}
            gridRoute="/dashboard/user-grid"
            listRoute="/dashboard/user-list"
            onChange={(e) => handleChangeFilter("search", e.target.value)}
          />
        </Box>

        {/* TABLE ROW SELECTION HEADER  */}
        {selected.length > 0 && (
          <TableToolbar
            selected={selected.length}
            handleDeleteRows={handleAllBudgetStrategyDelete}
          />
        )}


        {/* TABLE HEAD & BODY ROWS */}
        <TableContainer>
          <Scrollbar autoHide={false}>
            {matches ? <>            
                {filteredDatas.length === 0 && <TableDataNotFound />}
                {filteredDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <PortfolioCard row={row} index={index}   handleDeleteBudgetStrategy={handleDeleteBudgetStrategy}
                    loadDataEditById={loadDataEditById} handleActionPortfolio={handleActionPortfolio}/>
      ))}
            </> : <Table>
              <PortfolioTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={filteredDatas.length}
                onRequestSort={handleRequestSort}
                rows={filteredDatas}
                onSelectAllRows={handleSelectAllRows(
                    filteredDatas.map((row) => row.ID)
                )}
              />

              <TableBody>

                {filteredDatas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <PortfolioTableRow
                      key={data.ID}
                      data={data}
                      isSelected={isSelected(data.ID)}
                      handleSelectRow={handleSelectRow}
                      handleDeleteBudgetStrategy={handleDeleteBudgetStrategy}
                      loadDataEditById={loadDataEditById}
                      handleActionPortfolio={handleActionPortfolio}
                    />
                  ))}

                {filteredDatas.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>}
            
          </Scrollbar>
        </TableContainer>

        {/* PAGINATION SECTION */}
        <Box padding={1}>
          <TablePagination
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={filteredDatas.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[6,12,24]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default PortfolioPageView;
