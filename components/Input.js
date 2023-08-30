import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";

export default function Input({command, onSubmit}) {
    const [_command, setCommand] = useState(command || "");
    const inputRef = useRef(null);

    useEffect(() => {
        if (!command && inputRef.current) {
            inputRef.current.focus();
        }
    }, [command]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(_command);
        setCommand("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="command">
                <span style={{color: "green"}}>[guest@localhost]</span> ${" "}
                <span style={{color: "var(--primary)"}}>~</span>{" "}
                <span style={{color: "orange"}}>&gt;&gt;</span>
            </label>
            <input
                type="text"
                className={styles.input}
                value={_command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={!!command}
                ref={inputRef}
                autoFocus={!command}
            />
        </form>
    );
}
