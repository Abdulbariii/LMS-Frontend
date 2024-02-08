/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import EditModal from '../modals/UpdateModal'

const options = ["View", "Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function MenuActions({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (option) => {
    console.log(option);
    if (option === "Delete") {
      setShowDelete(true);
    }else if (option === "Edit") {
      setShowEdit(true);
    }
    handleClose();
  };

  return (
    <div>
      {showDelete && (
        <DeleteModal
          bookId={data.id}
          setShowDelete={setShowDelete}
          showDelete={showDelete}
        />
      )}
       {showEdit&& (
        <EditModal
          bookId={data.id}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
        />
      )}

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => {
              handleAction(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
