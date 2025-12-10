import React, { useState, useEffect, useRef } from "react";
import { Button, Stack, Offcanvas, Form, Spinner } from "react-bootstrap";

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#5e3a8c", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#b32424", label: "In Progress" },
    "done": { background: "#c9f7d7", color: "#1e7a44", label: "Done" }
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
                    <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>{assignment.subject}</Button>
                    <Button variant="primary" className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none" }}>{assignment.duedate}</Button>
                    <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: statusStyling[assignment.status].background, color: statusStyling[assignment.status].color, border: "none" }}>
                        {assignment.status === "todo" ? "To Do" :
                            assignment.status === "in-progress" ? "In Progress" : "Done"}
                    </Button>
                </Stack>

                <Form.Control
                    as="textarea"
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    placeholder="Write your notes here..."
                    className="flex-grow-1 mb-3"
                    style={{ minHeight: "300px" }}
                />

                <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#155724", border: "none" }} className="rounded-pill" onClick={() => handleSave(localNotes)} disabled={isSaving || localNotes === lastSavedNotes}>
                    {saveButtonText}
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}