import React, { useCallback, useEffect, useState } from "react";
import { Die } from "../components/Die/Die";
import View from "../components/View";

interface ADie {
    colour: string;
    number: number;
}

const getRandomNumbers = (colours: string[]): ADie[] =>
    colours.map((colour) => ({
        colour,
        number: Math.floor(Math.random() * 6) + 1,
    }));
// markup
const DicePage = () => {
    const diceColours = [
        "orange",
        "white",
        "blue",
        "green",
        "yellow",
        "purple",
    ];

    /*
    set each dice here
    with a map display each of them
    when selected stop the number generation and put them in a separate array
    */
    const [availableColours, setAvailableColours] =
        useState<string[]>(diceColours);
    const [dicePool, setDicePool] = useState<ADie[]>([]);
    const [onPaper, setOnPaper] = useState<ADie[]>([]);
    const [currentDice, setCurrentDice] = useState<ADie>();
    const [silverPlate, setSilverPlate] = useState<ADie[]>([]);

    const toggleSelection = useCallback(
        (dice) => {
            if (JSON.stringify(currentDice) === JSON.stringify(dice)) {
                setCurrentDice(undefined);
            } else {
                setCurrentDice(dice);
            }
        },

        [currentDice, setCurrentDice]
    );

    const handleShuffle = useCallback(() => {
        if (currentDice) {
            const silverDice = dicePool.filter(
                (die) => die.number < currentDice.number
            );
            const silverColours = silverDice.map((d) => d.colour);
            const remainingSetOfColours = availableColours
                .filter((ac) => ac !== currentDice.colour)
                .filter((ac) => !silverColours.includes(ac));

            setOnPaper([...onPaper, currentDice]);
            setAvailableColours(remainingSetOfColours);
            setDicePool(getRandomNumbers(remainingSetOfColours));
            setCurrentDice(undefined);
            setSilverPlate([...silverPlate, ...silverDice]);
        }
        setDicePool(getRandomNumbers(availableColours));
    }, [availableColours, currentDice, onPaper]);

    const handleReset = useCallback(() => {
        setAvailableColours(diceColours);
        setCurrentDice(undefined);
        setSilverPlate([]);
        setOnPaper([]);
    }, []);

    useEffect(
        () => setDicePool(getRandomNumbers(availableColours)),
        [availableColours]
    );

    return (
        <View>
            <div style={{ display: "flex" }}>
                {/* all the unselected dice come here */}
                {dicePool.map(({ colour, number }, key) => {
                    return (
                        <Die
                            props={{
                                colour,
                                number,
                                toggle: toggleSelection,
                            }}
                            key={`${key}${colour}`}
                        />
                    );
                })}
            </div>

            <div>current dice</div>
            <div>
                {currentDice && (
                    <Die
                        props={{
                            colour: currentDice.colour,
                            number: currentDice.number,
                            toggle: toggleSelection,
                        }}
                        key={`current-${currentDice.colour}`}
                    />
                )}
            </div>

            <div>
                <p>here would come the selected dice</p>
                <div style={{ display: "flex" }}>
                    {onPaper.map(({ colour, number }, key) => {
                        return (
                            <Die
                                props={{
                                    colour,
                                    number,
                                    toggle: toggleSelection,
                                }}
                                key={`onPaper${key}${colour}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div style={{ backgroundColor: "silver" }}>
                <div style={{ display: "flex" }}>
                    {silverPlate.map(({ colour, number }, key) => {
                        return (
                            <Die
                                props={{
                                    colour,
                                    number,
                                    toggle: toggleSelection,
                                }}
                                key={`silver-${key}${colour}`}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                disabled={onPaper.length === 3}
                onClick={() => handleShuffle()}
            >
                shuffle
            </button>
            <button onClick={() => handleReset()}>reset</button>
        </View>
    );
};

export default DicePage;
