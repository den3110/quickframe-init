import { Fragment } from "react";
import MoreVert from "@mui/icons-material/MoreVert";
import { Button, IconButton, Menu } from "@mui/material";
import { MoreRounded, MoreVertOutlined, MoreVertRounded, MoreVertSharp } from "@mui/icons-material";
import MoreHorizontal from "icons/MoreHorizontal";
import Iconify from "components/Iconify";

// ==============================================================

// ==============================================================

const CustomMoreMenu = props => {
  const {
    open,
    handleClose,
    handleOpen,
    children
  } = props;
  return <Fragment>
    
      <Button fullWidth onClick={handleOpen} size={props.size || "small"} variant="outlined" color="secondary" startIcon={<Iconify sx={{ marginLeft : 1.1}} icon="uiw:more"/>}/>

      <Menu anchorEl={open} open={Boolean(open)} onClose={handleClose} transformOrigin={{
      vertical: "center",
      horizontal: "right"
    }}>
        {children}
      </Menu>
    </Fragment>;
};
export default CustomMoreMenu;