/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, CircularProgress, TextField } from "@mui/material";
import { useSubmit } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddBookByGlobalSearch({
  showAddGlobal,
  setShowAddGlobal,
  loading,
}) {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    is_booked: false,
    cover_image: null,
    category_name: null,
    category: "",
    book_code: "",
    publisher: "",
    published_place: "",
    page_number: "",
    dewey_decimal_number: "",
    dewey_decimal_category_range: "",
    updated_by: "",
    number_of_copies: "",
    added_by: localStorage.getItem("userId"),
  });

  const [searchValue, setSearchValue] = useState();

  const submit = useSubmit();

  const handleClose = () => {
    setShowAddGlobal(false);
  };

  const handleAdd = async () => {
    const formDataNew = new FormData();

    try {
      for (const key in newBook) {
        if (Object.prototype.hasOwnProperty.call(newBook, key)) {
          const apiFieldName =
            key === "publicationDate" ? "publication_date" : key;
          formDataNew.append(apiFieldName, newBook[key]);
        }
      }
      formDataNew.append("cover_image", newBook.cover_image);
    } catch (err) {
      console.log(err);
    }

    submit(formDataNew, {
      method: "POST",
      action: ".",
      encType: "multipart/form-data",
    });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={showAddGlobal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          <Typography variant="h4" sx={{ mb: 2 }}>
            Search for book globaly
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: "1000px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <TextField
            onChange={handleSearch}
            value={searchValue}
            label="Search"
            sx={{ width: "400px", mb: "8px" }}
            id="standard-basic"
            variant="standard"
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
