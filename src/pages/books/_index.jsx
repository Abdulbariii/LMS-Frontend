/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { gettingBooks } from "../../api/endpoints/Books";
import DataTable from "../../components/tables/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import { useState } from "react";

export const loader = async ({ request }) => {
  let booksData = {};
  try {
    booksData = await gettingBooks("http://127.0.0.1:8000/api/books/");
  } catch (err) {
    console.log(err);
  }

  return booksData;
};

const Books = () => {
  const booksData = useLoaderData();

  return (
    <div className="page-table">
      <h1>This is Books page</h1>

      <DataTable booksData={booksData.results} />
    </div>
  );
};

export default Books;
