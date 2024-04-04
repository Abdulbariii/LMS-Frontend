import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { Typography, CircularProgress } from "@mui/material";
import { useSubmit } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddPhysicalBooking({ showAdd, setShowAdd, loading }) {
  const [newBooking, setNewBooking] = useState({
    booking_date: "",
    book_id: "",
    user_id: "",
    admin_id: "",
    deadline_date: "",
    isBooked: null,
    isPending: null,
  });

  const submit = useSubmit();

  const handleClose = () => {
    setShowAdd(false);
  };

  const handleAdd = async () => {
    const formDataNew = new FormData();

    try {
      for (const key in newBooking) {
        if (Object.prototype.hasOwnProperty.call(newBooking, key)) {
          const apiFieldName =
            key === "publicationDate" ? "publication_date" : key;
          formDataNew.append(apiFieldName, newBooking[key]);
        }
      }
      formDataNew.append("cover_image", newBooking.cover_image);
    } catch (err) {
      console.log(err);
    }

    submit(formDataNew, {
      method: "POST",
      action: ".",
      encType: "multipart/form-data",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setNewBooking((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={showAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="book_id"
            label="Book id"
            type="number"
            fullWidth
            name="book_id"
            value={newBooking.book_id}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="user_id"
            label="User id"
            type="number"
            fullWidth
            name="user_id"
            value={newBooking.user_id}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            margin="dense"
            id="booking_date"
            label="Booking date"
            type="date"
            fullWidth
            name="booking_date"
            value={newBooking.booking_date}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="deadline_date"
            label="Deadline date"
            type="date"
            fullWidth
            name="deadline_date"
            value={newBooking.page_number}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              height: "35px",
              borderRadius: "8px",
              width: "85px",
              mr: "5px",
              color: "text.main",
              ":hover": {
                bgcolor: "#f0fff0", // theme.palette.primary.main
              },
            }}
          >
            <Typography variant="caption">Cancel</Typography>
          </Button>

          <Button
            onClick={handleAdd}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              height: "35px",
              borderRadius: "8px",
              width: "85px",
              mr: "5px",
              color: "text.main",
              ":hover": {
                bgcolor: "#f0fff0", // theme.palette.primary.main
              },
            }}
          >
            {loading === "submitting" ? (
              <CircularProgress color="inherit" size={"25px"} />
            ) : (
              <Typography variant="caption"> Add </Typography>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
