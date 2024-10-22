import React, { useContext, useState } from "react";
import recordContext from "../context/record/context";

export default function AddRecord() {
  const context = useContext(recordContext);
  const { addRecord } = context;

  const [record, setRecord] = useState({
    title: "",
    data: "",
    tag: "default",
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    addRecord(record.title, record.data, record.tag);
    setRecord({ title: "", data: "", tag: "default" });
  };

  const onChange = (e) => {
    console.log("onChange");
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2>Add a Record</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={record.title}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="data"
            minLength={5}
            value={record.data}
            required
            name="data"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={record.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={record.title.length < 5 || record.data.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleOnClick}
        >
          Add Record
        </button>
      </form>
    </div>
  );
}
