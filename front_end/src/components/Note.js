import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import Draggable from 'react-draggable';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div>
        <div>
          <p>{props.content}</p>
          <button onClick={handleClick}><CancelIcon /></button>
        </div>
    </div>
  );
}

export default Note;
