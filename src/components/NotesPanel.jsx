import React, { useState, useEffect, useRef } from "react";
import { Button, Stack } from "react-bootstrap";

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
        zIndex: 1050,
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
        flexGrow: 1,
        resize: "none",
        borderRadius: "8px",
        border: "1px solid #ccc",
        color: "black",
        padding: "10px",
        fontSize: "15px",
        marginTop: "10px",
        marginBottom: "10px"
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
    statusButton: {
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
    const [localNotes, setLocalNotes] = useState(props.assignment.notes);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeout = useRef(null);

    useEffect(() => {
        setLocalNotes(props.assignment.notes);
    }, [props.assignment]);

    useEffect(() => {
        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }

        saveTimeout.current = setTimeout(() => {
            if(localNotes !== props.assignment.notes) {
                props.onSaveNotes(localNotes);
            }
        }, 10000);

        return () => clearTimeout(saveTimeout.current);
    }, [localNotes]);

    const handleSave = async (notesToSave) => {
        if (notesToSave === props.assignment.notes) return;
        
        setIsSaving(true);
        await props.onSaveNotes(notesToSave);
        setIsSaving(false);
    };

    let saveButtonText = "Save Notes";
    if(isSaving) saveButtonText = "Saving...";
    else if (localNotes === props.assignment.notes) saveButtonText = "Saved!";

    const panelStyle = {
        ...styles.panel,
        width: props.fullScreen ? "100vw" : "800px",
        left: props.fullScreen ? 0 : "auto",
        right: props.fullScreen ? 0 : 0
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
                <button style={{...styles.statusButton}}>{props.assignment.status === "todo" ? "To Do" : props.assignment.status === "in-progress" ? "In Progress" : "Done"}</button>
            </Stack>

            <textarea
                style={textareaStyle}
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Write your notes here..."
            />

            <Button style={{margingTop: "15px", alignSelf: "flex-end" }} 
                onClick={() => handleSave(localNotes)}
                disabled={isSaving || localNotes === props.assignment.notes}>
                {saveButtonText}
            </Button>
        </div>
    );
}
