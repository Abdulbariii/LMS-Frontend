import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import editBook from "../../api/edit/editBook";

// eslint-disable-next-line react/prop-types
export default function UpdateModal({ showEdit, setShowEdit, bookId }) {
  const [updatedBook, setUpdatedBook] = React.useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    is_booked: false,
    cover_image: null,
    category_name: null,
  });

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleUpdate =  async() => {
    try {
    //   await editBook(`http://127.0.0.1:8000/api/books/${bookId}/`, updatedBook);
   await editBook(bookId, updatedBook);

      handleClose();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error as needed
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={showEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={updatedBook.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            name="author"
            value={updatedBook.author}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="genre"
            label="Genre"
            type="text"
            fullWidth
            name="genre"
            value={updatedBook.genre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="publication_date"
            // label="Publication Date"
            type="date"
            fullWidth
            name="publication_date"
            value={updatedBook.publication_date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="cover_image"
            // label="Cover Image URL"
            type="file"
            fullWidth
            name="coverImage"
            value={updatedBook.cover_image}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedBook.is_booked}
                onChange={handleChange}
                name="is_booked"
              />
            }
            label="Is Booked"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}





