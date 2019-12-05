import React from "react";

const DeleteButton = ({ handleDelete, id, name }) => {
  return (
    <div style={{ display: "inline-block", padding: "5px" }}>
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </div>
  );
};

export default DeleteButton;
