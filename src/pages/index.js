import React, { useEffect, useState } from 'react';
import Player from '../components/Player';
// markup
const IndexPage = () => {
    const [players, setPlayers] = useState({});
    const [name, setName] = useState('');
    const [ongoingGame, setOngoingGame] = useState(false);
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
        setName('');
    };

    const setPlayerScore = (name, score) => {
        setPlayers({ ...players, [name]: { score } });
    };

    useEffect(() => {
        const isThereAnOngoingGame = Object.keys(players).reduce((acc, cur) => {
            return acc || !!players[cur].score.total;
        }, false);

        setOngoingGame(isThereAnOngoingGame);
    });

    const resetGame = () => {
        const playerNames = Object.keys(players);
        const newPlayers = playerNames.reduce((acc, cur) => {
            return { ...acc, [cur]: { score: emptyScore } };
        }, {});
        setPlayers(newPlayers);
        setOngoingGame(false);
    };

    return (
        <>
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
                {ongoingGame && (
                    <button onClick={() => resetGame()}>Reset Game</button>
                )}
            </main>
            <footer
                // style={{ position: "absolute", bottom: "10px", margin: "0 auto" }}
                style={{
                    position: 'fixed',
                    left: '50%',
                    bottom: '0px',
                    transform: 'translate(-50%, -50%)',
                    margin: '0 auto',
                }}
            >
                <h5>
                    Hacktoberfest PR-s are welcome!
                    <br />
                    Fork it on{' '}
                    <a href="https://github.com/soosgyul/ganz-schon-clever-calculator">
                        Github
                    </a>{' '}
                    <br />
                    Read more about{' '}
                    <a href="https://hacktoberfest.digitalocean.com/">
                        Hacktoberfest
                    </a>
                </h5>
            </footer>
        </>
    );
};

export default IndexPage;
