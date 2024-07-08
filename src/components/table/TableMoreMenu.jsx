import { Fragment } from "react";
import MoreVert from "@mui/icons-material/MoreVert";
import { IconButton, Menu } from "@mui/material";
import { MoreRounded, MoreVertOutlined, MoreVertRounded, MoreVertSharp } from "@mui/icons-material";
import MoreHorizontal from "icons/MoreHorizontal";

// ==============================================================

// ==============================================================

const TableMoreMenu = props => {
  const {
    open,
    handleClose,
    handleOpen,
    children
  } = props;
  return <Fragment>
      <IconButton color="secondary" onClick={handleOpen}>
      <MoreHorizontal />

      </IconButton>

      <Menu anchorEl={open} open={Boolean(open)} onClose={handleClose} transformOrigin={{
      vertical: "center",
      horizontal: "right"
    }}>
        {children}
      </Menu>
    </Fragment>;
};
export default TableMoreMenu;