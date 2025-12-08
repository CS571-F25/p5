import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

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
        padding: "10px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: "500"
    }
};

const statusColors = {
    "todo": { background: "#e8d9ff", color: "#5e3a8c" },
    "in-progress": { background: "#ffd4d4", color: "#b32424" },
    "done": { background: "#c9f7d7", color: "#1e7a44" }
};

const formatForInput = (date) => {
    if(!date) return "";
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const formatForAPI = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
}

export default function AssignmentBar(props) {

    const currentColor = statusColors[props.status] || {
        background: "#e5e5e5",
        color: "#333"
    };

    const dropdownStyle = {
        ...styles.statusDropdown,
        backgroundColor: currentColor.background,
        color: currentColor.color
    };

    return <div style={styles.container}>
        <div style={styles.textSection}>
            <div style={styles.name}>{props.name}</div>
            <div style={styles.subject}>{props.subject}</div>
        </div>

        <input type="date" value={formatForInput(props.duedate)} style={styles.dateButton} onChange={e => props.onDateChange(formatForAPI(e.target.value))} />
        <Button style={styles.notesButton} onClick={props.onNotesClick}>Notes</Button>

        <select value={props.status} style={dropdownStyle} onChange={(e) => props.onStatusChange(e.target.value)}>
            <option value="todo" style={{ color: statusColors["todo"].color }}>To Do</option>
            <option value="in-progress" style={{ color: statusColors["in-progress"].color }}>In Progress</option>
            <option value="done" style={{ color: statusColors["done"].color }}>Done</option>
        </select>
    </div>
}