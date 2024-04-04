import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  const [bookId, setBookId] = useState(false);
  const [userIdd, setUserIdd] = useState(false);

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
  const handleFetchSearch = async (book_code) => {
    if (book_code.length === 0) {
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/?book_code=${book_code}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBookId(data.results[0].id && true);
    } catch (error) {
      setBookId(false);
      alert("This book code doesnt exsit");
    }
  };

  const handleClickSearch = () => {
    handleFetchSearch(newBooking.book_id);
  };

  const handleUserFetchSearch = async (user_id) => {
    if (user_id.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users-auth/?id=${user_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserIdd(data[0].id && true);
    } catch (error) {
      setUserIdd(false);
      alert("This user id doesnt exsit");
    }
  };

  const handleUserClickSearch = () => {
    handleUserFetchSearch(newBooking.user_id);
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
            type="string"
            fullWidth
            name="book_id"
            value={newBooking.book_id}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickSearch}>
                  {bookId ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              ),
            }}
            disabled={bookId}
          />

          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="user_id"
            label="User id"
            type="string"
            fullWidth
            name="user_id"
            value={newBooking.user_id}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleUserClickSearch}>
                  {userIdd ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              ),
            }}
            disabled={userIdd}
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
            disabled={!(userIdd && bookId)}
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
