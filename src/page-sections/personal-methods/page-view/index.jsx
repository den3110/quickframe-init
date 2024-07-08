import { useEffect, useState } from "react";
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
import PersonalMethodsTableRow from "../PersonalMethodsTableRow";
import PersonalMethodsTableHead from "../PersonalMethodsTableHead";
// CUSTOM DEFINED HOOK
import useMuiTable, { getComparator, stableSort } from "hooks/useMuiTable";
// CUSTOM DUMMY DATA
import axios from "utils/axios";
import { LoadingButton } from "theme/components/button";
import { LoadingProgress } from "components/loader";
import { Add } from "@mui/icons-material";
import PersonalMethodCard from "../PersonalMethodCard";
import axiosInstance from "utils/axios";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import RightSideModalCustom from "components/modals/RightSideModalCustom";
import PersonalMethodsRightSideContent from "../modal/PersonalMethodsRightSideContent";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";


function PersonalMethodsPageView(props) {

  const [personalMethodsData, setPersonalMethodsData] = useState([])
  const matches = useMediaQuery('(max-width:600px)');
  const {t} = useTranslation();

  const [dataEdit, setDataEdit] = useState(null);


  const loadDataEditById = (id)=>{
    try {
      axios.get(`/api/bot/capital-config/info?id=${id}`).then(({data})=>{

          if(data.ok){
            setDataEdit(data.d)
            setIsOpenBSModal(true)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }

  const loadPersonalMethods = ()=>{
    try {
      axios.get('/api/bot/capital-config/list').then(({data})=>{
          if(data.ok){
              setPersonalMethodsData(data.d)
          }
      }) 
  } catch (error) {
      console.error(error)
  }
  }

  useEffect(()=>{
    loadPersonalMethods();
  }, [])


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
  let filteredDatas = stableSort(personalMethodsData, getComparator(order, orderBy)).filter(
    (item) => {
      if (dataFilter.search)
        return item.Name
          .toLowerCase()
          .includes(dataFilter.search.toLowerCase());
      else return true;
    }
  );
  const handleDeletePersonalMethod = async(id) => {
    try{
      const {data} = await axiosInstance.delete(`/api/bot/capital-config/delete?id=${id}`);

      if(data.ok){
        setPersonalMethodsData((state) => state.filter((item) => item.ID !== id));
        enqueueSnackbar(t('success'), {variant : 'success'});
      }
    }catch(err){

    }
  };
  const handleAllPersonalMethodsDelete = async() => {
    try{
      const {data} = await axiosInstance.post(`/api/bot/capital-config/delete-multiple`, {ids : selected})
      if(data.ok){
        setPersonalMethodsData((state) => state.filter((item) => !selected.includes(item.ID)));
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

  return (
    <Box pt={2} pb={4}>
      <RightSideModalCustom isOpen={isOpenBSModal} setIsOpen={setIsOpenBSModal} children={<PersonalMethodsRightSideContent setIsOpen={setIsOpenBSModal} loadPersonalMethods={loadPersonalMethods} dataEdit={dataEdit}/>}/>
      <Card>
        <Box px={2} pt={2}>
          <HeadingArea setIsOpenBSModal={setIsOpenBSModal} isOpenBSModal={isOpenBSModal} value={dataFilter.role} changeTab={handleChangeTab} count={personalMethodsData?.length || 0}/>

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
            handleDeleteRows={handleAllPersonalMethodsDelete}
          />
        )}


        {/* TABLE HEAD & BODY ROWS */}
        <TableContainer>
          <Scrollbar autoHide={false}>
            {matches ? <>
              {filteredDatas.length === 0 && <TableDataNotFound />}
                {filteredDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <PersonalMethodCard row={row} key={row.ID} index={index}   handleDeletePersonalMethod={handleDeletePersonalMethod}
                    loadDataEditById={loadDataEditById}/>
      ))}
            </> : <Table>
              <PersonalMethodsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={filteredDatas.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={handleSelectAllRows(
                    filteredDatas.map((row) => row.ID)
                )}
              />

              <TableBody>

                {filteredDatas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <PersonalMethodsTableRow
                      key={data.ID}
                      data={data}
                      isSelected={isSelected(data.ID)}
                      handleSelectRow={handleSelectRow}
                      handleDeletePersonalMethod={handleDeletePersonalMethod}
                      loadDataEditById={loadDataEditById}
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
            rowsPerPageOptions={[6, 12,24]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('show_result')} // Sửa văn bản ở đây
            labelDisplayedRows={() => ''} // Ẩn thông tin phân trang
            ActionsComponent={TablePaginationActions} // Sử dụng TablePaginationActions

  
          />
        </Box>
      </Card>
    </Box>
  );
}

export default PersonalMethodsPageView;
