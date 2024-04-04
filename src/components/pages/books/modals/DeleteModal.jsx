/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteBook } from "../../../../api/delete/deleteBook";
import { useRevalidator } from "react-router-dom";

export default function DeleteModal({ showDelete, setShowDelete, bookId }) {
  const revalidator = useRevalidator();
  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDelete = async () => {
    await deleteBook(`http://127.0.0.1:8000/api/books/${bookId}`);
    await revalidator.revalidate();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={showDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are sure you want to delete this book ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have to know that if you delete a book you can undo it if you
            want
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
