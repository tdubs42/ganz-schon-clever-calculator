import * as React from "react";
export const Number = ({ type: colour, setScore }) => (
  <>
    <div
      style={{
        backgroundColor: colour === "fox" ? "red" : colour,
      }}
    >
      <input
        type="number"
        style={{ width: "80px", height: "50px", fontSize: "20px" }}
        onChange={(e) => {
          return setScore(colour, parseInt(e.target.value, 10));
        }}
      ></input>
    </div>
  </>
);

export default Number;
