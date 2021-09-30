import React, { useCallback, useEffect, useState } from "react";
import cs from "classnames";
import * as styles from "./Die.module.scss";

export interface ADie {
    colour: string;
    number: number;
}
interface DieProps {
    props: {
        colour: string;
        number: number;
        toggle?: (dice: ADie) => void;
    };
}

export const Die = ({ props: { colour, number, toggle } }: DieProps) => {
    const handleFocus = (event: { target: { select: () => any } }) =>
        event.target.select();

    const [diceContent, setDots] = useState([]);

    useEffect(() => {
        if (number <= 3) {
            const dots = [];
            for (var i = 0; i < number; i++) {
                dots.push(<span className={cs(styles.dot)} key={i}></span>);
            }
            setDots([
                <div
                    className={cs([styles[`face_${number}`], styles.die])}
                    style={{ background: colour }}
                    key={number}
                >
                    {dots}
                </div>,
            ]);
        }
        if (number === 4) {
            setDots([
                <div
                    className={cs([styles[`face_${number}`], styles.die])}
                    style={{ background: colour }}
                    key={number}
                >
                    <div className={cs(styles.column)} key="4-1">
                        <span className={cs(styles.dot)} key="4-1-1"></span>
                        <span className={cs(styles.dot)} key="4-1-2"></span>
                    </div>
                    <div className={cs(styles.column)} key="4-2">
                        <span className={cs(styles.dot)} key="4-2-1"></span>
                        <span className={cs(styles.dot)} key="4-2-2"></span>
                    </div>
                </div>,
            ]);
        }
        if (number === 5) {
            setDots([
                <div
                    className={cs([styles[`face_${number}`], styles.die])}
                    style={{ background: colour }}
                    key={number}
                >
                    <div className={cs(styles.column)} key="5-1">
                        <span className={cs(styles.dot)} key="5-1-1"></span>
                        <span className={cs(styles.dot)} key="5-1-2"></span>
                    </div>
                    <div className={cs(styles.column)} key="5-2">
                        <span className={cs(styles.dot)} key="5-2-1"></span>
                    </div>
                    <div className={cs(styles.column)} key="5-3">
                        <span className={cs(styles.dot)} key="5-3-1"></span>
                        <span className={cs(styles.dot)} key="5-3-2"></span>
                    </div>
                </div>,
            ]);
        }
        if (number === 6) {
            setDots([
                <div
                    className={cs([styles[`face_${number}`], styles.die])}
                    style={{ background: colour }}
                    key={number}
                >
                    <div className={cs(styles.column)} key="6-1">
                        <span className={cs(styles.dot)} key="6-1-1"></span>
                        <span className={cs(styles.dot)} key="6-1-2"></span>
                        <span className={cs(styles.dot)} key="6-1-3"></span>
                    </div>
                    <div className={cs(styles.column)} key="6-2">
                        <span className={cs(styles.dot)} key="6-2-1"></span>
                        <span className={cs(styles.dot)} key="6-2-2"></span>
                        <span className={cs(styles.dot)} key="6-2-3"></span>
                    </div>
                </div>,
            ]);
        }
    }, [number, colour]);

    return (
        <div onClick={() => toggle && toggle({ colour, number })}>
            {diceContent}
        </div>
    );
};

export default Die;
