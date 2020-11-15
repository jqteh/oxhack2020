import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import axios from 'axios';

function App() {

  const [data, setData] = useState({ total: null }); //data will contain the array fetched from DB
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.npms.io/v2/search?q=react', //Replace this link with the get route from DB, to obtain an array
      );
      setData(result.data);
      setTimeout(fetchData, 3000);
    };
    fetchData(); //for this particular case, data.total is the item of interest. In our case, data.whatever should be in an array.
  }, []);

  //console.log(data.total); //data.total is the first item in this particular JSON file

    // function deleteNote(id) {
  //   axios
  //     .delete(`/deleteRoute/${id}`)
  //     .then(
  //       setData((prevNotes)=>{
  //         return {
  //           notes: prevNotes.notes.filter(note=>note.id != id)
  //         }
  //       })
  //     )
  // }

  var dummyArray = ['test1', 'test2', 'test3'] //This is a dummy array in place of the array fetched from DB

  return (
    <div>
      <Header />
      {/* <p>{data.total}</p> */}
      <div className='canvas'>
        {/* <CreateArea onAdd={addNote} /> */}
        {dummyArray.map((noteItem, index) => {
          return (
            <Draggable handle="#handle1" >
              <div className="note">
                <span id="handle1"><DragIndicatorIcon /></span>
                <Note
                  key={index}
                  id={index}
                  content={noteItem}
                // onDelete={deleteNote} //Only activate this when delete route in backend is configured. When ready, uncomment the deleteNote() from above
                />
              </div>
            </Draggable>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
