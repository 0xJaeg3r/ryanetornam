//main react component that renders a terminal-like interface

import { useState, useRef } from "react";
import { CONTENTS } from "../utils/commandHelper";
import Command from "./Command";
import styles from "./Terminal.module.css";

export default function Terminal() {
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(false);
    const terminalRef = useRef(null); // Note: Fixed typo from 'termainalRef' to 'terminalRef'.

    const escapeHTML = (str) =>
        str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    
    const addCommand = async (cmd) => { // Note: Changed parameter name from 'Command' to 'cmd' to avoid confusion.
        let output;
        setLoading(true);
        setCommands([...commands, { command: cmd, output: "Loading..."}]);

        if (`${cmd}` in CONTENTS) {
            output = await CONTENTS[`${cmd}`]();
        } else if (cmd === "clear") {
            setLoading(false);
            return setCommands([]);
        } else {
            output = CONTENTS.error(escapeHTML(cmd));
        }

        setLoading(false);
        setCommands([...commands, { command: cmd, output }]);

        if (terminalRef && terminalRef.current) { // Note: Corrected reference name.
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    // Note: Moved the return JSX out of the 'addCommand' function.
    return (
        <div className={styles.terminal} ref={terminalRef}> 
            {commands.map(({command, output}, index) => (
                <Command command={command} output={output} key={index}/> // Note: Corrected <command /> to <Command />.
            ))}
            {!loading && <Command onSubmit={addCommand} />}
        </div>
    );
}
