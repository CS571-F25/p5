import React from "react";

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "12px 18px",
        margin: "10px 0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    },
    textSection: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        marginRight: "20px"
    },
    name: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333"
    },
    subject: {
        fontSize: "14px",
        color: "#777",
        marginTop: "3px"
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
    notesButton: {
        border: "none",
        backgroundColor: "#ffe8c2",
        color: "#a36200",
        padding: "10px 16px",
        borderRadius: "20px",
        marginRight: "12px",
        cursor: "pointer",
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
    }
};

export default function AssignmentBar(props) {
    return <div style={styles.container}>
        <div style={styles.textSection}>
            <div style={styles.name}>{props.name}</div>
            <div style={styles.subject}>{props.subject}</div>
        </div>

        <button style={styles.dateButton}>{props.duedate}</button>
        <button style={styles.notesButton} onClick={props.onNotesClick}>Notes</button>

        <select value={props.status} style={styles.statusDropdown} onChange={(e) => props.onStatusChange(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
        </select>
    </div>
}