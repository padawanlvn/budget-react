import React from "react";

function Intro() {
  return (
    <div className="p-3 my-2 bg-light border rounded-3">
      <div className="py-4 text-center">
        <p className="fs-4">
          I wrote this to figure out how much money I have left after paying
          bills.
        </p>
        <p className="fs-4">
          Enter how much you start with (like got paid); then click the button
          to add things you have to pay for that drain you of all your dough.
        </p>
      </div>
    </div>
  );
}

export default Intro;
