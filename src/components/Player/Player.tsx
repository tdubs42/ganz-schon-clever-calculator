import React, { InputHTMLAttributes } from "react";
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
  score: PlayerScore;
  setPlayerScore: (name: string, score: PlayerScore) => {};
  key: string;
}

export const Player: React.FC<Props> = ({
  name,
  score,
  setPlayerScore,
}: Props) => {
  const setTheScore = (colour: string, value: number) => {
    if (score[colour] !== undefined) {
      const newScore = {
        ...score,
        [colour]: value > 0 ? value : 0,
      };
      const total = calculateTotal(newScore);
      setPlayerScore(name, { ...newScore, total });
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
