import React, { InputHTMLAttributes, ReactChildren } from "react";

export const View = ({ children }) => {
    return (
        <>
            <main>{children}</main>
            <footer
                // style={{ position: "absolute", bottom: "10px", margin: "0 auto" }}
                style={{
                    position: "fixed",
                    left: "50%",
                    bottom: "0px",
                    transform: "translate(-50%, -50%)",
                    margin: "0 auto",
                }}
            >
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
            </footer>
        </>
    );
};

export default View;
