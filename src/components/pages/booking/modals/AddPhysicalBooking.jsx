/* eslint-disable react/prop-types */
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddPhysicalBooking({
  showAdd,
  setShowAdd,
  loading,
  handleSubmit,
}) {
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
  const [userIdd, setUserId] = useState(false);
  const [bookCodeError, setBookCodeError] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [bookingDate, setBookingDate] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const [numberOfCopies, setNumberOfCopies] = useState();

  const handleClose = () => {
    setShowAdd(false);
  };

  const handleAdd = async () => {
    const bookingData = {
      booking_date: bookingDate,
      deadline_date: deadlineDate,
      isPending: false,
      isBooked: true,
      book_id: bookId,
      user_id: userIdd,
      admin_id: localStorage.getItem("userId"),
      number_of_copies: numberOfCopies,
    };

    handleSubmit(bookingData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = value;
    setNewBooking((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  const handleBookingDate = (e) => {
    const dateFormat = `${e.$y}-${e.$M + 1}-${e.$D}`;
    setBookingDate(dateFormat);
  };
  const handleDeadlineDate = (e) => {
    const dateFormat = `${e.$y}-${e.$M + 1}-${e.$D}`;
    setDeadlineDate(dateFormat);
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
      if (Number(data.results[0].number_of_copies) > 0) {
        setBookId(data.results[0].id);
        setNumberOfCopies(data.results[0].number_of_copies);
        setBookCodeError("");
      } else {
        setBookCodeError("No copies avaliable");
      }
    } catch (error) {
      setBookId(false);
      setBookCodeError("Wrong book code");
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
      if (data[0].id && data[0].is_staff) {
        setUserId(false);
        setStudentIdError("This is id of the admin, not student");
      } else {
        setUserId(data[0].id);
        setStudentIdError("");
      }
    } catch (error) {
      setUserId(false);
      setStudentIdError("This student id doesnt exsit");
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
            label="Book code"
            type="string"
            fullWidth
            name="book_id"
            error={bookCodeError && true}
            helperText={bookCodeError && bookCodeError}
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
            error={studentIdError && true}
            helperText={studentIdError && studentIdError}
            margin="dense"
            id="user_id"
            label="Student id"
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

          <DatePicker
            sx={{ borderRadius: "8px", width: "45%" }}
            margin="dense"
            id="booking_date"
            label="Booking date"
            type="date"
            fullWidth
            autoFocus
            name="booking_date"
            value={newBooking.booking_date}
            onChange={handleBookingDate}
          />
          <DatePicker
            sx={{ borderRadius: "8px", width: "45%" }}
            id="deadline_date"
            label="Deadline date"
            type="date"
            autoFocus
            fullWidth
            name="deadline_date"
            value={newBooking.deadline_date}
            onChange={handleDeadlineDate}
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
