import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Form, Spinner } from "react-bootstrap";

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#573681", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#881B1B", label: "In Progress" },
    "done": { background: "#d4edda", color: "#145222", label: "Done" }
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
                <span className="rounded-pill px-3 py-1" style={{ backgroundColor: "#FFE7C2", color: "#704300", border: "none" }}>{assignment.subject}</span>
                <span className="rounded-pill px-3 py-1" style={{ backgroundColor: "#d0e8ff", color: "#004A80", border: "none" }}>{assignment.duedate}</span>
                <span className="rounded-pill px-3 py-1" style={{ backgroundColor: statusStyling[assignment.status].background, color: statusStyling[assignment.status].color, border: "none" }}>
                    {assignment.status === "todo" ? "To Do" : assignment.status === "in-progress" ? "In Progress" : "Done"}
                </span>
                <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#145222", border: "none" }} className="rounded-pill px-3 py-1" onClick={() => handleSaveNotes(localNotes)} disabled={isSaving || localNotes === lastSavedNotes}>{saveButtonText}</Button>
            </Stack>
                    
            <Container className="d-flex flex-column flex-grow-1">
                <Form.Label htmlFor="notes-textarea" className="visually-hidden">Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    id="notes-textarea"
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