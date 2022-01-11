import React, { Component } from "react";

const EndingAmount = (props) => {
  return (
    <h3>This is how much I have left: {props.start - props.deductions} </h3>
  );
};

export default EndingAmount;
