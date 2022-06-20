import React from "react";

export default function Alert(props) {
  const capitalize = (element) => {
    if (element === "danger") {
      element = "error";
    }
    return (
      element.slice(0, 1).toUpperCase() + element.substring(1).toLowerCase()
    );
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}: </strong>
        {props.alert.msg}
      </div>
    )
  );
}
