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
        fontSize: "24px",
        background: "none",
        cursor: "pointer",
        color: "black"
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "24px"
    },
    textarea: {
        width: "100%",
        flexGrow: 1,
        resize: "none",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "10px",
        fontSize: "15px",
        marginBottom: "10px",
        color: "black"
    },
    subjectButton: {
        border: "none",
        backgroundColor: "#ffe8c2",
        color: "#a36200",
        padding: "10px 16px",
        borderRadius: "20px",
        marginRight: "12px",
        cursor: "default",
        fontWeight: 500
    },
    dateButton: {
        border: "none",
        backgroundColor: "#d0e8ff",
        color: "#005fa3",
        padding: "10px 16px",
        borderRadius: "20px",
        marginRight: "12px",
        cursor: "default",
        fontWeight: 500
    },
    statusButton: {
        border: "none",
        backgroundColor: "#e5e5e5",
        color: "#333",
        padding: "10px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: 500
    },
    subheading: {
        alignSelf: "center",
        marginBottom: "10px"
    }
};

export default function NotesPanel({ assignment, onSaveNotes, onClose, fullScreen }) {
    const [localNotes, setLocalNotes] = useState(assignment.notes);
    const [lastSavedNotes, setLastSavedNotes] = useState(assignment.notes);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeout = useRef(null);

    useEffect(() => {
        if (localNotes === undefined) {
            setLocalNotes(assignment.notes);
        }
    }, [assignment.id]);


    useEffect(() => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(() => {
            if (localNotes !== lastSavedNotes) {
                handleSave(localNotes);
            }
        }, 10000);

        return () => clearTimeout(saveTimeout.current);
    }, [localNotes, lastSavedNotes]);

    const handleSave = async (notesToSave) => {
        if (!onSaveNotes) return;
        setIsSaving(true);
        await onSaveNotes(notesToSave);
        setIsSaving(false);
        setLastSavedNotes(notesToSave);
    };

    let saveButtonText = "Save";
    if (isSaving) saveButtonText = "Saving...";
    else if (localNotes !== lastSavedNotes) saveButtonText = "Save";
    else saveButtonText = "Saved!";

    const panelStyle = fullScreen
        ? { ...styles.panel, width: "100vw", left: 0, right: 0, top: 0, height: "100vh" }
        : styles.panel;

    return (
        <div style={panelStyle}>
            <button style={styles.closeButton} onClick={onClose}>×</button>

            <div style={styles.title}>{assignment.name}</div>

            <Stack direction="horizontal" gap={3} style={styles.subheading}>
                <button style={styles.subjectButton}>{assignment.subject}</button>
                <button style={styles.dateButton}>{assignment.duedate}</button>
                <button style={styles.statusButton}>
                    {assignment.status === "todo" ? "To Do" :
                        assignment.status === "in-progress" ? "In Progress" : "Done"}
                </button>
            </Stack>

            <textarea
                style={styles.textarea}
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Write your notes here..."
            />

            <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#155724", border: "none" }} className="rounded-pill" onClick={() => handleSave(localNotes)} disabled={isSaving || localNotes === lastSavedNotes}>
                {saveButtonText}
            </Button>
        </div>
    );
}