import React, { useState, useEffect, InputHTMLAttributes } from "react";
import { Number } from "../Number";

interface PlayerScoreColours {
  yellow: number;
  blue: number;
  green: number;
  orange: number;
  purple: number;
}

export interface PlayerScore extends PlayerScoreColours {
  fox: number;
  total: number;
}

const getLowestValue = ({ ...colours }: PlayerScoreColours) => {
  const scores = Object.values(colours).map((c) => parseInt(c));
  return Math.min(...Object.values(scores));
};

const calculateTotal = ({ fox, total, ...colours }: PlayerScore) => {
  const lowestValue = getLowestValue({ ...colours });
  return Object.values(colours).reduce((a, b) => a + b, fox * lowestValue);
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  key: string;
}

const emptyScore = {
  yellow: 0,
  blue: 0,
  green: 0,
  orange: 0,
  purple: 0,
  fox: 0,
  total: 0,
};
export const Player: React.FC<Props> = ({ name }: { name: string }) => {
  const [score, setScore] = useState<PlayerScore>(emptyScore);

  const setTheScore = (colour: string, value: number) => {
    if (score[colour] !== undefined) {
      const newScore = {
        ...score,
        [colour]: value > 0 ? value : 0,
      };
      const total = calculateTotal(newScore);
      setScore({ ...newScore, total });
    }
  };

  const colours = ["yellow", "blue", "green", "orange", "purple", "fox"];
  return (
    <section>
      <p>{name}</p>
      <div style={{ width: "100px", display: "flex" }}>
        {colours.map((c) => (
          <Number
            key={c}
            type={c}
            setScore={setTheScore}
            score={score}
          ></Number>
        ))}

        <h3>total: {score.total}</h3>
      </div>
    </section>
  );
};

export default Player;
