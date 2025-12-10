import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Form, Spinner } from "react-bootstrap";

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#5e3a8c", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#b32424", label: "In Progress" },
    "done": { background: "#c9f7d7", color: "#1e7a44", label: "Done" }
};

export default function NotesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);
    const [localNotes, setLocalNotes] = useState("");
    const [lastSavedNotes, setLastSavedNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeout = useRef(null);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: { "X-CS571-ID": CS571.getBadgerId() },
        })
            .then((res) => res.json())
            .then((data) => {
                const assignmentsArray = Object.entries(data.results).map(([id, a]) => {
                    const localNotes = localStorage.getItem(`assignment_notes_${id}`);
                    return {
                        id,
                        ...a,
                        notes: localNotes || a.notes,
                    };
                });

                const found = assignmentsArray.find(a => a.id.toString() === id.toString());
                if(found) {
                    setAssignment(found);
                    setLocalNotes(found.notes);
                    setLastSavedNotes(found.notes);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, reload]);

    useEffect(() => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(() => {
            if (localNotes !== lastSavedNotes) {
                handleSaveNotes(localNotes);
            }
        }, 10000);

        return () => clearTimeout(saveTimeout.current);
    }, [localNotes, lastSavedNotes]);

    const handleSaveNotes = (newText) => {
        const updatedAssignment = { ...assignment, notes: newText };
        localStorage.setItem(`assignment_notes_${assignment.id}`, newText);

        handleUpdate(assignment, updatedAssignment);
    };

    const handleUpdate = (assignment, updatedAssignment) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments?id=${assignment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-CS571-ID": CS571.getBadgerId() },
            body: JSON.stringify(updatedAssignment)
        }).then(() => handleReload());
    };

    const handleReload = () => setReload((prev) => prev + 1);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" className="mt-3">
                    <span className="visually-hidden">Loading document...</span>
                </Spinner>
            </Container>
        );
    }

    if (!assignment) return <p style={{ textAlign: "center", marginTop: "50px" }}>
        Assignment not found.
    </p>;

    let saveButtonText = "Save";
    if (isSaving) saveButtonText = "Saving...";
    else if (localNotes !== lastSavedNotes) saveButtonText = "Save";
    else saveButtonText = "Saved!";

    return (
        <Container className="d-flex flex-column vh-100 mt-4" >
            <h2 className="text-center mb-3">{assignment.name}</h2>
            <Stack direction="horizontal" gap={4} className="justify-content-center flex-wrap mb-4">
                <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>{assignment.subject}</Button>
                <Button variant="primary" className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none" }}>{assignment.duedate}</Button>
                <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: statusStyling[assignment.status].background, color: statusStyling[assignment.status].color, border: "none" }}>
                    {assignment.status === "todo" ? "To Do" : assignment.status === "in-progress" ? "In Progress" : "Done"}
                </Button>
                <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#155724", border: "none" }} className="rounded-pill" onClick={() => handleSaveNotes(localNotes)} disabled={isSaving || localNotes === lastSavedNotes}>{saveButtonText}</Button>
            </Stack>
                    
            <Container className="d-flex flex-column flex-grow-1">
                <Form.Control
                    as="textarea"
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    placeholder="Write your notes here..."
                    className="flex-grow-1"
                    style={{ resize: "none", minHeight: 0 }}
                />
            </Container>
        </Container>
    );
};