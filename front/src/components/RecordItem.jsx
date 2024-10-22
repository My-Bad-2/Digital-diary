import React, { useContext } from "react";
import recordContext from "../context/record/context";

export default function RecordItem(props) {
  const { record, updateRecord } = props;
  const { deleteRecord } = useContext(recordContext);
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{record.title}</h5>
          <p className="card-text">{record.description}</p>
          <i
            className="fa fa-trash-can mx-2"
            onClick={() => {
              deleteRecord(record._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa fa-edit mx-2"
            onClick={() => {
              updateRecord(Record);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
