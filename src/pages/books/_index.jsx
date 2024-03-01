/* eslint-disable no-unused-vars */

/// this is link for image  media/books/covers/Screenshot_2024-01-30_at_12.40.32AM_ywII4t2.png
//you can render image like this <img src={`http://127.0.0.1:8000${newBook.cover_image}`} alt="Book Cover" />





import { useLoaderData } from "react-router-dom";
import { gettingBooks } from "../../api/endpoints/Books";
import DataTable from "../../components/tables/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddBookModal from "../../components/modals/AddBookModal";
import { Box } from "@mui/material";

export const booksLoader = async ({ request }) => {
  let booksData = {};
  try {
    booksData = await gettingBooks(
      "http://127.0.0.1:8000/api/books/?page_size=10000"
    );
  } catch (err) {
    console.log(err);
  }

  return booksData;
};

const Books = () => {
  const booksData = useLoaderData();
  const [showAdd, setShowAdd] = useState(false);
  const refreshToken = localStorage.getItem("token");

  console.log(booksData?.results);

  return (
    <div className="page-table">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "40px",
          alignItems: "center",
        }}
      >
        <h1>This is Books page</h1>

        <Button
          sx={{ width: 150, height: 50, color: "#000", bgcolor: "#fff" }}
          variant="contained"
          onClick={() => setShowAdd(!showAdd)}
        >
          {" "}
          Add Book
        </Button>
      </Box>

      {showAdd && <AddBookModal setShowAdd={setShowAdd} showAdd={showAdd} />}

      {<DataTable booksData={booksData?.results} />}
    </div>
  );
};

export default Books;
