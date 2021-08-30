import React, { useState, useEffect, InputHTMLAttributes } from "react";
import Player from "../components/Player";
// markup
const IndexPage = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerName =
      e.target.playerName.value || `Player ${players.length + 1}`;
    setPlayers([...players, { name: playerName }]);
    setName("");
  };

  return (
    <main>
      <title>Ganz Schön Clever Calculator</title>
      {players.map((p, index) => {
        return <Player name={p.name} key={`${p.name}${index}`} />;
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
    </main>
  );
};

export default IndexPage;
