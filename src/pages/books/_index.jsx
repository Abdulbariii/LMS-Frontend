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
import { useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Form, useSearchParams } from "react-router-dom";
import MenuActions from "../../components/menu/MenuActions";

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

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const formTable = useRef();
  let [searchParams, setSearchParams] = useSearchParams();

  const columns = [
    { field: "title", headerName: "Title", width: 130 },
    { field: "publication_date", headerName: "Publish date", width: 130 },
    {
      field: "is_booked",
      headerName: "Available",
      width: 150,
      valueGetter: (params) =>
        params.row.is_booked ? "Avaliable" : "Not avaliable",
    },
    {
      field: "genre",
      headerName: "Genre",
      sortable: false,
      width: 130,
    },
    {
      field: "author",
      headerName: "Author",
      sortable: false,
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => <MenuActions data={params} />,
    },
  ];

  const handlePaginationModelChange = (data) => {
    setPageSize(data.pageSize);
    setCurrentPage(data.page);
    searchParams.append("page", data.page);
    searchParams.set("page_size", data.pageSize);
    formTable.current.requestSubmit();
  };

  console.log(booksData);

  return (
    <div>
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

      {booksData && (
        <Form ref={formTable}>
          <DataGrid
            sx={{
              borderRadius: "10px",
              maxHeight: 600,
              minHeight: 500,
              width: "100%",
              backgroundColor: "#fff",
            }}
            disableRowSelectionOnClick={true}
            disableDensitySelector={true}
            variant="soft"
            rows={booksData.results}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: pageSize },
              },
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10]}
          />
        </Form>
      )}
    </div>
  );
};

export default Books;
