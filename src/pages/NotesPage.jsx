import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotesPanel from "../components/NotesPanel";

export default function NotesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedNotes = localStorage.getItem(`notes-${id}`);

        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: { "X-CS571-ID": CS571.getBadgerId() },
        })
            .then(res => res.json())
            .then(data => {
                const assignmentsArray = Object.entries(data.results).map(
                    ([key, a]) => ({ id: key, ...a })
                );
                const found = assignmentsArray.find(a => a.id.toString() === id.toString());

                if (!found) {
                    setAssignment(null);
                } else {
                    setAssignment({
                        ...found,
                        notes: savedNotes ?? found.notes ?? ""
                    });
                }

                setLoading(false);
            });
    }, [id]);

    const handleSaveNotes = (text) => {
        setAssignment(prev => ({ ...prev, notes: text }));
        localStorage.setItem(`notes-${id}`, text);
    };

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
