import { getBooking } from "../../api/booking/getBooking";
import { useLoaderData, useSubmit, redirect } from "react-router-dom";
import { deleteBooking } from "../../api/booking/deleteBooking";
import updateBooking from "../../api/booking/updateBooking";

import editBook from "../../api/edit/editBook";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export const bookingDetailLoader = async ({ params }) => {
  let bookingData;
  try {
    bookingData = await getBooking(
      `http://127.0.0.1:8000/api/booking/${params.id}`
    );
  } catch (err) {
    console.log(err);
  }

  return bookingData;
};

export const bookingDetailAction = async ({ request }) => {
  let shouldReturn = redirect("/booking");
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      await deleteBooking(formDataObject.bookingId);

      const newNumberOfCopies = Number(formDataObject.copies) + 1;
      const editResponse = await editBook(
        formDataObject.bookId,
        JSON.stringify({
          is_booked: formDataObject.copies == 0 ? false : true,
          number_of_copies: newNumberOfCopies,
        })
      );
      if (editResponse.status !== 200) {
        throw new Error("Not edited");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      shouldReturn = await updateBooking(formDataObject.bookingId, {
        isPending: false,
        isBooked: true,
        deadline_date: formDataObject.deadline_date,
        booking_date: formDataObject.booking_date,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return shouldReturn;
};

const BookingDetail = () => {
  const bookingData = useLoaderData();
  const submit = useSubmit();
  const [bookingDate, setBookingDate] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const steps = [
    "Student sent request",
    "Book is pending",
    "Admin approved",
    "Book is received",
  ];

  const handleBookingDelete = () => {
    submit(
      {
        bookingId: bookingData.id,
        bookId: bookingData.book.id,
        copies: bookingData.book.number_of_copies,
      },
      {
        method: "DELETE",
        action: ".",
      }
    );
  };
  const handleBookingDate = (e) => {
    const dateFormat = `${e.$y}-${e.$M + 1}-${e.$D}`;
    setBookingDate(dateFormat);
  };
  const handleDeadlineDate = (e) => {
    const dateFormat = `${e.$y}-${e.$M + 1}-${e.$D}`;
    setDeadlineDate(dateFormat);
  };

  const handleApprove = () => {
    submit(
      {
        bookingId: bookingData.id,
        deadline_date: deadlineDate,
        booking_date: bookingDate,
        admin: { id: localStorage.getItem("userId") },
      },
      {
        method: "PATCH",
        action: ".",
      }
    );
  };
  return (
    <div>
      <Box
        sx={{
          p: 3,
          borderRadius: "14px",
          bgcolor: "#fff",
          textAlign: "center",
          width: "fit-content",
          zIndex: "10",
          mb: 5,
        }}
      >
        <Typography variant="h3">BOOKING DETAILS</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "#fff",
              textAlign: "start",
              width: "fit-content",
              minWidth: "300px",
              zIndex: "10",
              m: 3,
            }}
          >
            <Typography variant="h4">{bookingData.book.title}</Typography>
            <Box sx={{ width: "300px", height: "350px", mb: 2, mt: 2 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "3px",
                }}
                src={`${bookingData.book.cover_image}`}
                alt="Book Cover"
              />
            </Box>
            <Typography variant="body1">
              Book code : {bookingData.book.book_code}
            </Typography>
            <Typography variant="body1">
              Copies : {bookingData.book.number_of_copies}
            </Typography>
            <Typography variant="body1">
              DW : {bookingData.book.dewey_decimal_number}
            </Typography>
            <Typography variant="body1">
              DW - CUT : {bookingData.book.dewey_decimal_category_range}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  bgcolor: "#fff",
                  textAlign: "start",
                  width: "fit-content",
                  minWidth: "300px",
                  zIndex: "10",
                  m: 3,
                }}
              >
                <Typography variant="h4">
                  STUDENT - ID - {bookingData.user.id}
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  First name: <strong>{bookingData.user.first_name}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Last name: <strong>{bookingData.user.last_name}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Email: <strong>{bookingData.user.email}</strong>
                </Typography>
              </Box>

              {bookingData.isBooked && (
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    bgcolor: "#fff",
                    textAlign: "start",
                    width: "fit-content",
                    minWidth: "300px",
                    zIndex: "10",
                    m: 3,
                  }}
                >
                  <Typography variant="h4">ADMIN</Typography>
                  <Typography sx={{ m: 1 }} variant="h5">
                    First name: <strong>{bookingData.admin.first_name}</strong>
                  </Typography>
                  <Typography sx={{ m: 1 }} variant="h5">
                    Last name: <strong>{bookingData.admin.last_name}</strong>
                  </Typography>
                  <Typography sx={{ m: 1 }} variant="h5">
                    Email: <strong>{bookingData.admin.email}</strong>
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: "20px",
                bgcolor: "#fff",
                textAlign: "start",
                zIndex: "10",
                minWidth: "800px",
                ml: 3,
              }}
            >
              <Typography variant="h4">BOOKING PROCESS</Typography>

              <Stepper
                sx={{ maxWidth: "100%", m: 3 }}
                activeStep={bookingData.isBooked ? 3 : 2}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step sx={{ fontSize: "100px" }} key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {bookingData.isBooked && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <Typography sx={{ m: 1 }} variant="h5">
                      Booking Date: <strong>{bookingData.booking_date}</strong>
                    </Typography>
                    <Typography sx={{ m: 1 }} variant="h5">
                      Return date: <strong>{bookingData.deadline_date}</strong>
                    </Typography>
                  </div>

                  <Button
                    color={"warning"}
                    variant="contained"
                    onClick={handleBookingDelete}
                    sx={{
                      height: "50px",
                      borderRadius: "14px",
                      width: "120px",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    <Typography sx={{ p: 3 }} variant="body1">
                      received
                    </Typography>
                  </Button>
                </Box>
              )}

              {bookingData.isPending && (
                <Box>
                  <DatePicker
                    sx={{ borderRadius: "8px", width: "45%", mr: 3 }}
                    margin="dense"
                    id="booking_date"
                    label="Booking date"
                    type="date"
                    fullWidth
                    autoFocus
                    name="booking_date"
                    value={bookingDate}
                    onChange={handleBookingDate}
                  />
                  <DatePicker
                    sx={{ borderRadius: "8px", width: "45%" }}
                    id="deadline_date"
                    label="Return date"
                    type="date"
                    autoFocus
                    fullWidth
                    name="deadline_date"
                    value={deadlineDate}
                    onChange={handleDeadlineDate}
                  />
                </Box>
              )}
              {bookingData.isPending && (
                <Box sx={{ mt: 3 }}>
                  <Button
                    color={"error"}
                    variant="outlined"
                    onClick={handleBookingDelete}
                    sx={{
                      height: "50px",
                      borderRadius: "14px",
                      width: "120px",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    <Typography sx={{ p: 3 }} variant="body1">
                      Reject
                    </Typography>
                  </Button>

                  <Button
                    color={"success"}
                    variant="contained"
                    disabled={!bookingDate || !deadlineDate}
                    onClick={handleApprove}
                    sx={{
                      height: "50px",
                      borderRadius: "14px",
                      width: "120px",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    <Typography sx={{ p: 3 }} variant="body1">
                      approve
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BookingDetail;
