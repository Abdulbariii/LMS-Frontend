/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import MenuActions from "../menu/MenuActions";

/*   valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}` */

// eslint-disable-next-line react/prop-types
export default function DataTable(props) {
  const columns = [
    { field: "title", headerName: "Title", width: 130 },

    { field: "publication_date", headerName: "Publish date", width: 130 },
    {
      field: "is_booked",
      headerName: "Avaibale",
      width: 90,
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
      headerName: "Actions", // Update the header name
      width: 130,
      renderCell: (params) => (
        // Render a button component
        <MenuActions data={params} />
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableRowSelectionOnClick={true}
        disableDensitySelector={true}
        variant="soft"
        rows={props.booksData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
