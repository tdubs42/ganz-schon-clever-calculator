import * as React from "react";
export const Number = ({ type: colour, setScore, score }) => {
  const handleFocus = (event: { target: { select: () => any } }) =>
    event.target.select();
  return (
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
          value={score[colour]}
          onFocus={handleFocus}
        ></input>

        {colour === "fox" && <label>number of foxes ^^</label>}
      </div>
    </>
  );
};

export default Number;
