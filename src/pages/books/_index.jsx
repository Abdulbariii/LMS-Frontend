/* eslint-disable no-unused-vars */
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
