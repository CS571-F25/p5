import React, { useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import assignmentsData from "../data/assignmentsData";
import AssignmentBar from "./AssignmentBar";
import NotesPanel from "./NotesPanel";

export default function Home (props) {

    // hard-coded values that will be fetched actually
    const name = "Stella";

    const [assignments, setAssignments] = useState(assignmentsData);
    const [openNotes, setOpenNotes] = useState(null);

    const handleOpenNotes = (assignment) => {
        setOpenNotes(assignment)
    };

    const handleCloseNotes = () => {
        setOpenNotes(null)
    };

    const handleNotesChange = (newText) => {
        setAssignments(prev => {
            const updated = [...prev];
            updated[openNotes].notes = newText;
            return updated;
        });
    };

    return <div>
        <h1>Hello {name}!</h1>
        <Stack gap={3}>
            {assignments.map((assignment, index) => (
                <AssignmentBar key={index} {...assignment} 
                onStatusChange={(newStatus) => {
                    setAssignments(prev => {
                        const updated = [...prev];
                        updated[index].status = newStatus;
                        return updated;
                    });
                }}
                onNotesClick={() => handleOpenNotes(index)}
                />
            ))}
        </Stack>

        {openNotes != null && <NotesPanel assignment={assignments[openNotes]} onClose={handleCloseNotes} onNotesChange={handleNotesChange} />}
    </div>
}