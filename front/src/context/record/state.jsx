import React from "react";
import recordContext from "./context";
import { useState } from "react";

const host = "http://localhost:5000";

const RecordState = (props) => {
  const recordInitial = [];
  const [records, setRecords] = useState(recordInitial);

  // Get all records from the backend
  const getRecords = async () => {
    const response = await fetch(`${host}/api/record/fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setRecords((records || []).concat(json));
  };

  // Add a record
  const addRecord = async (title, data, tag) => {
    const response = await fetch(`${host}/api/record/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, data, tag }),
    });

    const json = await response.json();
    setRecords((records || []).concat(json));
  };

  // Delete a record
  const deleteRecord = async (id) => {
    const response = await fetch(`${host}/api/record/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setRecords((records || []).concat(json));
  };

  // Edit a record
  const editRecord = async (id, title, data, tag) => {
    const response = await fetch(`${host}/api/record/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, data, tag }),
    });

    const json = await response.json();

    let newRecords = JSON.parse(JSON.stringify(records));

    for (let i = 0; i < newRecords.length; i++) {
      if (newRecords[i]._id === id) {
        newRecords[i].title = title;
        newRecords[i].data = data;
        newRecords[i].tag = tag;

        break;
      }
    }

    setRecords((records || []).concat(json));
  };

  return (
    <recordContext.Provider
      value={{ records, addRecord, deleteRecord, editRecord, getRecords }}
    >
      {props.children}
    </recordContext.Provider>
  );
};

export default RecordState;
