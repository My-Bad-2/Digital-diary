import React from "react";
import Records from "./Records";

export default function Home(props) {
  const { showAlert } = props;

  return (
    <div className="container">
      <Records showAlert={showAlert} />
    </div>
  );
}
