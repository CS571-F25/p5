import React, { useState, useEffect, useRef } from "react";
import { Button, Stack, Offcanvas, Form } from "react-bootstrap";

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#573681", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#881B1B", label: "In Progress" },
    "done": { background: "#d4edda", color: "#145222", label: "Done" }
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

    return (
        <Offcanvas show={true} onHide={onClose} placement="end" background={false} scroll={true} className="d-flex flex-column pt-2" style={{ width: "50rem" }}>
            <Offcanvas.Header className="justify-content-center" closeButton>
                <Offcanvas.Title className="text-center w-100">{assignment.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-grow-1">
                <Stack direction="horizontal" gap={4} className="justify-content-center mb-3">
                    <span aria-label={`Subject: ${assignment.subject}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>{assignment.subject}</span>
                    <span aria-label={`Due Date: ${assignment.duedate}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none" }}>{assignment.duedate}</span>
                    <span aria-label={`Status: ${assignment.status}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: statusStyling[assignment.status].background, color: statusStyling[assignment.status].color, border: "none" }}>
                        {assignment.status === "todo" ? "To Do" :
                            assignment.status === "in-progress" ? "In Progress" : "Done"}
                    </span>
                </Stack>

                <Form.Label htmlFor="notes-textarea" className="visually-hidden">Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    id="notes-textarea"
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    placeholder="Write your notes here..."
                    className="flex-grow-1 mb-3"
                    style={{ minHeight: "300px" }}
                />

                <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#145222", border: "none" }} className="rounded-pill" onClick={() => handleSave(localNotes)} disabled={isSaving || localNotes === lastSavedNotes}>
                    {saveButtonText}
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}