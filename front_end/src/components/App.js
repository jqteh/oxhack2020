import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import axios from 'axios';
import LatexConverter from './LatexConverter';

function App() {

  const [data, setData] = useState({ body: [] }); //data will contain the array fetched from DB

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/retrieve/all', //Replace this link with the get route from DB, to obtain an array
      );
      setData(result.data);
      setTimeout(fetchData, 500);
    };
    fetchData(); //for this particular case, data.total is the item of interest. In our case, data.whatever should be in an array.
  }, []);

  var latexArray = data.body;

  function deleteNote(id) {axios.delete(`/remove/id/${id}`).then(() => {
    const fetchData = async () => {
      const result = await axios(
        '/retrieve/all', //Replace this link with the get route from DB, to obtain an array
      );
      setData(result.data);
    };
    fetchData();
  }) };




  //var dummyArray = ['\\int y \\mathrm{d}x', 'k_{n+1} = n^2 + k_n^2 - k_{n-1}', '\\overrightarrow{AB}']; //This is a dummy array in place of the array fetched from DB

  console.log(latexArray);

  return (
    <div>
      <Header />
      <LatexConverter />
      <div className='canvas'>
        {/* <CreateArea onAdd={addNote} /> */}
        {latexArray.map((item, index) => {
          return (
            <Draggable handle="#handle1" key={item._id}>
              <div className="note">
                <span id="handle1"><DragIndicatorIcon /></span> 
                <Note
                  key={item._id}
                  id={item._id}
                  content={
                    <LatexConverter content={item.latex} />}
                  onDelete={deleteNote} //Only activate this when delete route in backend is configured. When ready, uncomment the deleteNote() from above
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
