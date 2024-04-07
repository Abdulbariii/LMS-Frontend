import { useState } from "react";
import { Box, Typography, Button, Stack, Chip, Avatar } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { getBooking } from "../../api/booking/getBooking";
import {
  useLoaderData,
  useRevalidator,
  useNavigation,
  useSubmit,
  NavLink,
} from "react-router-dom";
import { CoverModal } from "../../components/pages/books/modals/CoverModal";
import { convertBookingToTableForm } from "../../lib/booking/ConvertBookingData";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import DoneIcon from "@mui/icons-material/Done";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddPhysicalBooking from "../../components/pages/booking/modals/AddPhysicalBooking";
import editBook from "../../api/edit/editBook";

export const bookingLoader = async () => {
  let bookingData = {};

  try {
    bookingData = await getBooking("http://127.0.0.1:8000/api/booking");
    bookingData = convertBookingToTableForm(bookingData);
  } catch (err) {
    console.log(err);
  }

  return bookingData;
};

export const bookingAction = async ({ request }) => {
  let actionResponse;
  if (request.method === "POST") {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      actionResponse = await fetch("http://127.0.0.1:8000/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          user: {
            id: Number(formDataObject.user_id),
          },
          book: {
            id: Number(formDataObject.book_id),
          },
          admin: { id: formDataObject.admin_id },
          isPending: false,
          isBooked: true,
          booking_date: formDataObject.booking_date,
          deadline_date: formDataObject.deadline_date,
        }),
      });

      if (actionResponse.ok) {
        const newNumberOfCopies = Number(formDataObject.number_of_copies) - 1;
        actionResponse = await editBook(
          formDataObject.book_id,
          JSON.stringify({
            is_booked: true,
            number_of_copies: newNumberOfCopies,
          })
        );
      }
    } catch (err) {
      console.log("we have an error");
    }
  }
  return actionResponse;
};

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const Booking = () => {
  const bookingData = useLoaderData();
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const submit = useSubmit();

  const handleSubmit = (bookingData) => {
    submit(bookingData, {
      method: "POST",
      action: ".",
    });

    setShowAddModal(false);
  };

  const columns = [
    { field: "book_code", headerName: "Book code", width: 150 },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "dewey_decimal_number",
      headerName: "Dewey decimal",
      width: 150,
    },
    {
      field: "dewey_decimal_category_range",
      headerName: "Range (cut)",
      width: 150,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      renderCell: (params) => (
        <Chip
          color={params.row.status === "Booked" ? "primary" : "warning"}
          sx={{ fontSize: "18px" }}
          label={params.row.status}
          size="medium"
          avatar={
            params.row.status === "Booked" ? (
              <Avatar>
                {" "}
                <DoneIcon />{" "}
              </Avatar>
            ) : (
              <Avatar>
                <MoreHorizIcon />
              </Avatar>
            )
          }
        />
      ),
    },
    {
      field: "booking_date",
      headerName: "Bookin date",
      width: 150,
    },
    {
      field: "deadline_date",
      headerName: "Return date",
      width: 150,
    },
    {
      field: "student",
      headerName: "students",
      minWidth: 200,
    },
    {
      field: "Covers",
      headerName: "Covers",
      width: 120,
      renderCell: (params) => <CoverModal data={params} />,
    },
    {
      field: "view",
      headerName: "Details",
      sortable: false,
      align: "start",
      width: 120,
      renderCell: (params) => (
        <NavLink to={`/booking/${params.id}`}>
          <Button>View</Button>
        </NavLink>
      ),
    },
  ];

  function NoResultsOverlay() {
    return (
      <Stack
        sx={{ display: "flex" }}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <FindInPageRoundedIcon sx={{ fontSize: "200px" }} />
        No result found
      </Stack>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "40px",
          alignItems: "center",
          width: "95%",
        }}
      >
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
          <Typography variant="h3">BOOKING</Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => setShowAddModal(true)}
          sx={{
            bgcolor: "#fff",
            height: "65px",
            borderRadius: "8px",
            width: "175px",
            mr: "5px",
            color: "text.main",
            ":hover": {
              bgcolor: "#f0fff0", // theme.palette.primary.main
            },
          }}
        >
          <AddRoundedIcon fontSize="medium" />
          <Typography sx={{ ml: 1 }} variant="caption">
            Add booking
          </Typography>
        </Button>
      </Box>

      <Box>
        <Button
          onClick={() => {
            revalidator.revalidate();
          }}
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            height: "50px",
            borderRadius: "10px",
            width: "125px",
            mr: "5px",
            mb: 2,
            color: "text.main",
            ":hover": {
              bgcolor: "#f0fff0", // theme.palette.primary.main
            },
          }}
        >
          <RefreshIcon variant="medium" />
          <Typography variant="caption">Refresh</Typography>
        </Button>
      </Box>

      {bookingData && (
        <StripedDataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rowHeight={60}
          autoHeight={!bookingData.length}
          rowCount={bookingData.count}
          slots={{ noRowsOverlay: NoResultsOverlay }}
          sx={{
            borderRadius: "10px",
            maxHeight: 500,
            minHeight: 500,
            maxWidth: "95%",
            backgroundColor: "#fff",
            fontSize: "18px",
            pl: "20px",
            pt: "20px",
            "--DataGrid-overlayHeight": "300px",
          }}
          disableRowSelectionOnClick={true}
          disableDensitySelector={true}
          disableColumnMenu={true}
          hideFooter={true}
          variant="soft"
          loading={
            navigation.state === "loading" || revalidator.state === "loading"
          }
          rows={bookingData.length ? bookingData : []}
          columns={columns}
        />
      )}
      {showAddModal && (
        <AddPhysicalBooking
          handleSubmit={handleSubmit}
          loading={navigation.state}
          setShowAdd={setShowAddModal}
          showAdd={showAddModal}
        />
      )}
    </div>
  );
};

export default Booking;
