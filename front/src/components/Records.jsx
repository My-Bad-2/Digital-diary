import React, { useContext, useEffect, useRef, useState } from "react";
import RecordItem from "./RecordItem";
import AddRecord from "./AddRecord";
import recordContext from "../context/record/context";
import { redirect } from "react-router-dom";

export default function Records(props) {
  const context = useContext(recordContext);
  const { records, getRecords, editRecord } = context;
  
  const [record, setRecord] = useState({
    id: "",
    etitle: "",
    edata: "",
    etag: "default",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getRecords();
    } else {
      props.showAlert("Please Login to access your records.", "warning");
      redirect("/login");
    }
  }, []);

  const updateRecord = (currentRecord) => {
    ref.current.click();
    setRecord({
      id: currentRecord._id,
      etitle: currentRecord.title,
      edata: currentRecord.data,
      etag: currentRecord.tag,
    });
  };

  const ref = useRef(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    editRecord(record.id, record.etitle, record.edata, record.etag);
    ref.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    console.log("onChange");
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddRecord showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className=" d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={record.etitle}
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
                    id="edata"
                    name="edata"
                    value={record.edata}
                    minLength={5}
                    required
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
                    id="etag"
                    name="etag"
                    value={record.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={record.etitle.length < 5 || record.edata.length < 5}
                type="submit"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Update Record
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Records</h2>
        {records.length > 0 ? (
          records.map((record) => {
            return (
              <RecordItem
                record={record}
                updateRecord={updateRecord}
                showAlert={props.showAlert}
                key={record._id}
              />
            );
          })
        ) : (
          <label>
            {" "}
            There are no records to display add some to show them here.
          </label>
        )}
      </div>
    </>
  );
}
