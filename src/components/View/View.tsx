import React from "react";
import * as styles from "./view.module.scss";
import cx from "classnames";
export const View = ({ children }) => {
    return (
        <>
            <main className={cx(styles.main)}>{children}</main>
            <footer className={cx(styles.footer)}>
                <section className={cx(styles.footerText)}>
                    <h5>
                        Hacktoberfest PR-s are welcome!
                        <br />
                        Fork it on{" "}
                        <a href="https://github.com/soosgyul/ganz-schon-clever-calculator">
                            Github
                        </a>{" "}
                        <br />
                        Read more about{" "}
                        <a href="https://hacktoberfest.digitalocean.com/">
                            Hacktoberfest
                        </a>
                    </h5>
                </section>
            </footer>
        </>
    );
};

export default View;
