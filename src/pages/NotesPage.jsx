import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotesPanel from "../components/NotesPanel";

export default function NotesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

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
                setAssignment(found || null);
                setLoading(false);
            });
    }, [id, reload]);

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

    if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading assignment...
    </p>;

    if (!assignment) return <p style={{ textAlign: "center", marginTop: "50px" }}>
        Assignment not found.
    </p>;

    return (
        <NotesPanel
            assignment={assignment}
            onSaveNotes={handleSaveNotes}
            onClose={() => navigate("/documents")}
            fullScreen={true}
        />
    );
}
