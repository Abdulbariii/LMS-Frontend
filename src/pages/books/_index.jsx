/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { gettingBooks } from "../../api/endpoints/Books";
import DataTable from "../../components/tables/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddBookModal from '../../components/modals/AddBookModal'
export const loader = async ({ request }) => {
  let booksData = {};
  console.log('hiiii')
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
  const [showAdd , setShowAdd]=useState(false)


  return (
    <div className="page-table">
     <div className="flex">
     <h1>This is Books page</h1>



      <Button variant="contained" className="btnn" onClick={()=>setShowAdd(!showAdd)}> Add Book</Button>
         </div>

         {showAdd&& (
        <AddBookModal
    
          setShowAdd={setShowAdd}
          showAdd={showAdd}
        />
      )}

      <DataTable booksData={booksData.results} />
    </div>
  );
};

export default Books;


