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
export const Player: React.FC<Props> = ({ name, key }) => {
  const [score, setScore] = useState<PlayerScore>({
    yellow: 0,
    blue: 0,
    green: 0,
    orange: 0,
    purple: 0,
    fox: 0,
    total: 0,
  });

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

  return (
    <section key={key}>
      <p>{name}</p>
      <div style={{ width: "100px", display: "flex" }}>
        <Number type={"yellow"} setScore={setTheScore}></Number>
        <Number type={"blue"} setScore={setTheScore}></Number>
        <Number type={"green"} setScore={setTheScore}></Number>
        <Number type={"orange"} setScore={setTheScore}></Number>
        <Number type={"purple"} setScore={setTheScore}></Number>
        <Number type={"fox"} setScore={setTheScore}></Number>
        <h3>total: {score.total}</h3>
      </div>
    </section>
  );
};

export default Player;
