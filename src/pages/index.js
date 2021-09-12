import React, { useState } from "react";
import Player from "../components/Player";
// markup
const IndexPage = () => {
  const [players, setPlayers] = useState({});
  const [name, setName] = useState("");

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emptyScore = {
    yellow: 0,
    blue: 0,
    green: 0,
    orange: 0,
    purple: 0,
    fox: 0,
    total: 0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerName =
      e.target.playerName.value || `Player ${players.length + 1}`;
    setPlayers({ ...players, [playerName]: { score: emptyScore } });
    setName("");
  };

  const setPlayerScore = (name, score) => {
    setPlayers({ ...players, [name]: { score } });
  };

  const resetGame = () => {
    const playerNames = Object.keys(players);
    const newPlayers = playerNames.reduce((acc, cur) => {
      return { ...acc, [cur]: { score: emptyScore } };
    }, {});
    setPlayers(newPlayers);
  };

  return (
    <main>
      <title>Ganz Schön Clever Calculator</title>

      {players &&
        Object.keys(players).map((key, index) => {
          return (
            <Player
              name={key}
              score={players[key].score}
              setPlayerScore={setPlayerScore}
              key={`${key}${index}`}
            />
          );
        })}

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="playerName"
          value={name}
          onChange={onChangeHandler}
        />
        <button>Add player</button>
      </form>

      <br />
      <button onClick={() => setPlayers([])}>Remove Players</button>
      <button onClick={() => resetGame()}>Reset Game</button>
    </main>
  );
};

export default IndexPage;
