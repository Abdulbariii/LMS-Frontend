/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Form, useSearchParams } from "react-router-dom";
import MenuActions from "../menu/MenuActions";

export default function DataTable(props) {
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

  return (
    <div style={{ minHeight: 400, maxHeight: 600, width: "100%" }}>
      <Form ref={formTable}>
        <DataGrid
          disableRowSelectionOnClick={true}
          disableDensitySelector={true}
          variant="soft"
          rows={props.booksData}
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
    </div>
  );
}
