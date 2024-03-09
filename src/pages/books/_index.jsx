/// this is link for image  media/books/covers/Screenshot_2024-01-30_at_12.40.32AM_ywII4t2.png
//you can render image like this <img src={`http://127.0.0.1:8000${newBook.cover_image}`} alt="Book Cover" />
import { useLoaderData, useActionData } from "react-router-dom";
import { gettingBooks } from "../../api/endpoints/Books";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import AddBookModal from "../../components/modals/AddBookModal";
import { Box, Typography, Alert } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import {
  useSearchParams,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import MenuActions from "../../components/menu/MenuActions";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import { Stack } from "@mui/material";
import { CoverModal } from "../../components/pages/books/CoverModal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import addBook from "../../api/Post/addBook";
import editBook from "../../api/edit/editBook";
import Slide from "@mui/material/Slide";

export const booksLoader = async ({ request }) => {
  const url = new URL(request.url);
  let page = url.searchParams.get("page");
  const searchBy = url.searchParams.get("searchBy");
  const searchValue = url.searchParams.get("searchValue");
  const booking = url.searchParams.get("booking");
  const genre = url.searchParams.get("genre");
  const date = url.searchParams.get("date");
  const userIdAddedBy = url.searchParams.get("added_by");
  const userIdUpdatedBy = url.searchParams.get("updated_by");

  if (searchValue && searchBy) {
    page = 1;
  }

  if (booking) {
    page = 1;
  }

  if (genre) {
    page = 1;
  }

  if (date) {
    page = 1;
  }

  let booksData = {};

  try {
    booksData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/?page_size=10&page=${page ? page : 1}&${
        searchBy ? searchBy : "?"
      }=${searchValue ? searchValue : ""}&is_booked=${booking}&genre=${
        genre ? genre : ""
      }&publication_date=${date ? date : ""}&added_by=${
        userIdAddedBy ? userIdAddedBy : ""
      }&updated_by=${userIdUpdatedBy ? userIdUpdatedBy : ""}`
    );
  } catch (err) {
    console.log(err);
  }

  return booksData;
};

export const addBookAction = async ({ request }) => {
  let actionResponse;
  if (request.method === "POST") {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject, "post");

    try {
      actionResponse = await addBook(formData);
    } catch (err) {
      console.log(err);
    }
  }

  if (request.method === "PUT") {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    const { id } = formDataObject;
    console.log(formDataObject, "put");

    try {
      actionResponse = await editBook(id, formData);
    } catch (err) {
      console.log(err);
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

const Books = () => {
  const booksData = useLoaderData();
  const [showAdd, setShowAdd] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const actionResponse = useActionData();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const [publicationDate, setPublicationDate] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const alertSuccessContainer = useRef();
  const currentPage = useMemo(
    () => searchParams.get("page") || 1,
    [searchParams]
  );
  const [searchBy, setSearchBy] = useState("title");
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue") || ""
  );
  const [bookingOption, setBookingOption] = useState(
    searchParams.get("booking" || "")
  );
  const [genreOption, setGenreOption] = useState(
    searchParams.get("genre") || ""
  );

  const columns = [
    { field: "book_code", headerName: "Book code", width: 130 },
    { field: "title", headerName: "Title", width: 170 },
    {
      field: "author",
      headerName: "Author",
      width: 120,
    },
    { field: "page_number", headerName: "Page number", width: 110 },

    {
      field: "publisher",
      headerName: "Publisher",
      width: 170,
    },

    {
      field: "published_place",
      headerName: "Published place",
      width: 150,
    },
    { field: "publication_date", headerName: "Publish date", width: 120 },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
    },
    {
      field: "dewey_decimal_number",
      headerName: "Dewey decimal",
      width: 130,
    },
    {
      field: "dewey_decimal_category_range",
      headerName: "Range (DC)",
      width: 150,
    },

    {
      field: "is_booked",
      headerName: "Available",
      minWidth: 100,
      valueGetter: (params) => (params.row.is_booked ? "Booked" : "Not booked"),
    },

    {
      field: "Covers",
      headerName: "Covers",
      width: 120,
      renderCell: (params) => <CoverModal data={params} />,
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 30,
      renderCell: (params) => (
        <MenuActions loading={navigation.state} data={params} />
      ),
    },
  ];

  const searchOptions = [
    {
      id: 1,
      name: "Title",
      value: "title",
    },
    {
      id: 2,
      name: "Author",
      value: "author",
    },
    {
      id: 3,
      name: "Dewey decimal",
      value: "dewey_decimal_number",
    },
    {
      id: 4,
      name: "Dewey decimal range",
      value: "dewey_decimal_category_range",
    },
    {
      id: 5,
      name: "Book code",
      value: "book_code",
    },
    {
      id: 6,
      name: "Number of page",
      value: "page_number",
    },
    {
      id: 7,
      name: "Publisher",
      value: "publisher",
    },
    {
      id: 7,
      name: "Published place",
      value: "published_place",
    },
  ];

  const bookingOptions = [
    {
      id: 1,
      name: "Booked",
      value: true,
    },
    {
      id: 2,
      name: "Not booked",
      value: false,
    },
  ];

  const genreOptions = [
    { id: 1, name: "Science" },
    { id: 2, name: "Law" },
    { id: 3, name: "Medicine" },
    { id: 4, name: "Mathematics" },
    { id: 5, name: "History" },
    { id: 6, name: "Literature" },
    { id: 7, name: "Engineering" },
    { id: 8, name: "Computer Science" },
    { id: 9, name: "Psychology" },
    { id: 10, name: "Economics" },
  ];

  useEffect(() => {
    if (actionResponse) {
      setShowAdd(false);
      handleClearFilter();
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }
  }, [actionResponse]);

  const handlePaginationModelChange = useCallback(
    (data) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("page", data.page + 1);
      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSearchOptions = useCallback(
    (option) => {
      setSearchBy(option.target.value);
    },
    [setSearchBy]
  );

  const handleSearchValue = useCallback(
    (e) => {
      setSearchValue(e.target.value);

      if (!e.target.value) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.delete("searchBy");
        updatedSearchParams.delete("searchValue");
        setSearchParams(updatedSearchParams);
      }
    },
    [setSearchParams, searchParams]
  );

  const handleSearchClick = useCallback(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("searchBy", searchBy);
    updatedSearchParams.set("searchValue", searchValue);
    setSearchParams(updatedSearchParams);
  }, [searchParams, setSearchParams, searchBy, searchValue]);

  const handleBookingOptions = useCallback(
    (e) => {
      setBookingOption(e.target.value);
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("booking", e.target.value);
      setSearchParams(updatedSearchParams);
    },
    [setBookingOption, setSearchParams, searchParams]
  );

  const handleGenreOption = useCallback(
    (e) => {
      setGenreOption(e.target.value);
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("genre", e.target.value);
      setSearchParams(updatedSearchParams);
    },
    [setSearchParams, setGenreOption, searchParams]
  );

  const handlePublicationDate = useCallback(
    (e) => {
      const dateFormat = `${e.$y}-${e.$M + 1}-${e.$D}`;
      setPublicationDate(dateFormat);
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("date", dateFormat);
      setSearchParams(updatedSearchParams);
    },
    [setSearchParams, searchParams]
  );

  const handleClearFilter = useCallback(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete("searchBy");
    updatedSearchParams.delete("date");
    updatedSearchParams.delete("searchValue");
    updatedSearchParams.delete("genre");
    updatedSearchParams.delete("booking");
    setSearchParams(updatedSearchParams);
    setSearchValue("");
    setGenreOption("");
    setBookingOption("");
    setPublicationDate();
  }, [searchParams, setSearchParams]);

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
    <Box sx={{ maxWidth: "95vw" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "40px",
          alignItems: "center",
          width: "95%",
        }}
      >
        {searchParams.get("username") ? (
          <Box
            sx={{
              p: 3,
              borderRadius: "14px",
              bgcolor: "#fff",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">{`${booksData.count} books ${
              searchParams.get("added_by") ? "added" : "updated"
            } by ${searchParams.get("username")}`}</Typography>
          </Box>
        ) : (
          <Typography variant="h2">Books</Typography>
        )}

        <Box>
          <Button
            onClick={() => setShowAdd(true)}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              height: "65px",
              borderRadius: "8px",
              width: "125px",
              mr: "5px",
              color: "text.main",
              ":hover": {
                bgcolor: "#f0fff0", // theme.palette.primary.main
              },
            }}
          >
            <AddRoundedIcon fontSize="medium" />
            <Typography variant="caption">Add</Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          gap: "50px",
          width: "95%",
          display: "flex",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <Box
          sx={{
            width: "25%",
            bgcolor: "#fff",
            p: "18px",
            borderRadius: "10px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Search By
          </InputLabel>
          <Select
            defaultValue={searchBy}
            onChange={handleSearchOptions}
            value={searchBy}
            sx={{ width: "60%", height: "30px" }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Search by"
            variant="outlined"
            size="small"
          >
            {searchOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            width: "75%",
            bgcolor: "#fff",
            p: "18px",
            borderRadius: "10px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            justifyContent: "flex-start",
          }}
        >
          <Button
            onClick={handleSearchClick}
            sx={{ width: "5%", height: "150%" }}
          >
            <SearchRoundedIcon fontSize="large" />
          </Button>
          <Divider orientation="vertical" variant="fullWidth" flexItem />

          <TextField
            onChange={handleSearchValue}
            value={searchValue}
            label="Search"
            sx={{ width: "90%", mb: "8px" }}
            id="standard-basic"
            variant="standard"
          />
        </Box>

        <Box>
          <Button
            onClick={() => {
              revalidator.revalidate();
            }}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              height: "65px",
              borderRadius: "8px",
              width: "125px",
              mr: "5px",
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
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 5,
          mt: 5,
          borderRadius: "10px",
          justifyContent: "flex-start",
          gap: "20px",
          height: "30px",
          width: "95%",
        }}
      >
        <Typography
          sx={{
            bgcolor: "#fff",
            p: "20px",
            borderRadius: "10px",
            color: "#252525",
          }}
          component="p"
          variant="h6"
          color="text"
        >
          Filters
        </Typography>
        <Box
          sx={{
            bgcolor: "#fff",
            p: "10px",
            borderRadius: "10px",
            color: "#252525",
            width: "30%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <InputLabel
            sx={{
              fontSize: "12px",
              color: "000",
            }}
            id="demo"
          >
            Booking
          </InputLabel>
          <Select
            variant="outlined"
            fullWidth
            sx={{ bgcolor: "#fff", borderRadius: "8px" }}
            labelId="demo"
            id="demo-simple-select-standard"
            label="Booking"
            size="small"
            onChange={handleBookingOptions}
            value={bookingOption}
            defaultValue={""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {bookingOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            p: "10px",
            borderRadius: "10px",
            color: "#252525",
            width: "30%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <InputLabel
            sx={{
              fontSize: "12px",
              color: "000",
            }}
            id="demo"
          >
            Genre
          </InputLabel>
          <Select
            variant="outlined"
            fullWidth
            sx={{ bgcolor: "#fff", borderRadius: "8px" }}
            labelId="demo"
            id="demo-simple-select-standard"
            label="Genre"
            size="small"
            value={genreOption}
            onChange={handleGenreOption}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genreOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            p: "10px",
            borderRadius: "10px",
            color: "#252525",
            width: "30%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <DatePicker
            onChange={handlePublicationDate}
            value={publicationDate}
            label="Publication date"
            sx={{ bgcolor: "#fff", borderRadius: "8px", width: "380px" }}
          />
        </Box>

        <Box
          sx={{ display: "flex", width: "10%", justifyContent: "space-around" }}
        >
          <Button
            variant="outlined"
            onClick={handleClearFilter}
            sx={{
              bgcolor: "#fff",
              height: "65px",
              borderRadius: "8px",
              color: "text.main",
              width: "125px",
              ":hover": {
                bgcolor: "#f0fff0", // theme.palette.primary.main
              },
            }}
          >
            <CloseRoundedIcon fontSize="medium" />
            <Typography variant="caption">Clear filter</Typography>
          </Button>
        </Box>
      </Box>

      {booksData.results && (
        <StripedDataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rowHeight={40}
          autoHeight={!booksData.results.length}
          rowCount={booksData.count}
          slots={{ noRowsOverlay: NoResultsOverlay }}
          sx={{
            borderRadius: "10px",
            maxHeight: 600,
            minHeight: 500,
            maxWidth: "95%",
            backgroundColor: "#fff",
            fontSize: "15px",
            pl: "20px",
            pt: "20px",
            "--DataGrid-overlayHeight": "300px",
          }}
          disableRowSelectionOnClick={true}
          disableDensitySelector={true}
          variant="soft"
          loading={
            navigation.state === "loading" || revalidator.state === "loading"
          }
          rows={booksData.results.length ? booksData.results : []}
          columns={columns}
          paginationMode="server"
          initialState={{
            pagination: {
              paginationModel: {
                page: currentPage - 1,
                pageSize: 10,
              },
            },
          }}
          onPaginationModelChange={handlePaginationModelChange}
        />
      )}
      {showAdd && (
        <AddBookModal
          loading={navigation.state}
          setShowAdd={setShowAdd}
          showAdd={showAdd}
        />
      )}

      <Box
        ref={alertSuccessContainer}
        sx={{
          position: "fixed",
          top: 40,
        }}
      >
        <Slide in={showSuccessAlert} container={alertSuccessContainer.current}>
          <Alert
            sx={{
              width: 500,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
            }}
            severity="success"
          >
            The action successfully completed
          </Alert>
        </Slide>
      </Box>
    </Box>
  );
};

export default Books;
