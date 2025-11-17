import React from "react";
import { Stack } from "react-bootstrap";

const styles = {
    panel: {
        position: "fixed",
        top: 0,
        right: 0,
        width: "800px",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
        padding: "20px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column"
    },
    closeButton: {
        alignSelf: "flex-end",
        border: "none",
        fontSize: "20px",
        background: "none",
        cursor: "pointer",
        color: "black"
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "10px"
    },
    textarea: {
        width: "100%",
        height: "100%",
        resize: "none",
        borderRadius: "8px",
        border: "1px solid #ccc",
        color: "white",
        padding: "10px",
        fontSize: "15px"
    },
    subjectButton: {
        border: "none",
        backgroundColor: "#ffe8c2",
        color: "#a36200",
        padding: "10px 16px",
        borderRadius: "20px",
        marginRight: "12px",
        cursor: "default",
        fontWeight: "500"
    },
    dateButton: {
        border: "none",
        backgroundColor: "#d0e8ff",
        color: "#005fa3",
        padding: "10px 16px",
        borderRadius: "20px",
        marginRight: "12px",
        cursor: "default",
        fontWeight: "500"
    },
    statusDropdown: {
        border: "none",
        backgroundColor: "#e5e5e5",
        padding: "10px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: "500",
        color: "#333"
    },
    subheading: {
        alignSelf: "center",
        marginBottom: "10px"
    }
};

export default function NotesPanel(props) {
    const panelStyle = {
        ...styles.panel,
        width: props.fullScreen ? "100vw" : "800px",
        left: props.fullScreen ? 0 : "auto",
        right: props.fullScreen ? 0 : 0,
    };

    const textareaStyle = {
        ...styles.textarea,
        flexGrow: 1
    };

    return (
        <div style={panelStyle}>
            <button style={styles.closeButton} onClick={props.onClose}>×</button>

            <div style={styles.title}>{props.assignment.name}</div>

            <Stack direction="horizontal" gap={3} style={styles.subheading}>
                <button style={styles.subjectButton}>{props.assignment.subject}</button>
                <button style={styles.dateButton}>{props.assignment.duedate}</button>
                <select value={props.assignment.status} style={styles.statusDropdown}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </Stack>

            <textarea
                style={textareaStyle}
                value={props.assignment.notes}
                onChange={(e) => props.onNotesChange(e.target.value)}
                placeholder="Write your notes here..."
            />
        </div>
    );
}
