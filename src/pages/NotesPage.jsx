import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assignmentsData from "../data/assignmentsData";
import NotesPanel from "../components/NotesPanel";

export default function NotesPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState(assignmentsData[id]);

    const handleNotesChange = (text) => {
        setAssignment(prev => ({ ...prev, notes: text }));
    };

    return (
        <NotesPanel
            assignment={assignment}
            onNotesChange={handleNotesChange}
            onClose={() => navigate("/documents")}
            fullScreen={true}
        />
    );
}
