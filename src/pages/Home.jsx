import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import assignmentsData from "../data/assignmentsData";
import AssignmentBar from "../components/AssignmentBar";
import NotesPanel from "../components/NotesPanel";
import AddAssigmentModal from "../components/AddAssignmentModal";

export default function Home (props) {

    // hard-coded values that will be fetched actually
    const name = "Stella";

    const [assignments, setAssignments] = useState(assignmentsData);
    const [openNotes, setOpenNotes] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenNotes = (assignment) => { setOpenNotes(assignment) };
    const handleCloseNotes = () => { setOpenNotes(null) };

    const handleNotesChange = (newText) => {
        setAssignments(prev => {
            const updated = [...prev];
            updated[openNotes].notes = newText;
            return updated;
        });
    };

    const handleAddAssignment = (newAssignment) => {
        setAssignments(prev => [...prev, newAssignment]);
    };

    const statusOrder = ["in-progress", "todo", "done"];
    const formatDate = (date) => {
        const [month, day, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    }
    const sortedAssignments = statusOrder.map(status => assignments.filter(a => a.status === status).sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))).flat();

    return <div>
        <h1>Hello {name}!</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>Create Assignment</Button>
        <Stack gap={3}>
            {sortedAssignments.map((assignment, index) => (
                <AssignmentBar key={index} {...assignment} 
                onStatusChange={(newStatus) => {
                    setAssignments(prev => {
                        const originalIndex = assignments.indexOf(assignment);
                        const updated = [...prev];
                        updated[originalIndex].status = newStatus;
                        return updated;
                    });
                }}
                onNotesClick={() => {
                    const originalIndex = assignments.indexOf(assignment);
                    handleOpenNotes(originalIndex)
                }}
                />
            ))}
        </Stack>

        {openNotes != null && <NotesPanel assignment={assignments[openNotes]} onClose={handleCloseNotes} onNotesChange={handleNotesChange} />}
        
        <AddAssigmentModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddAssignment} />
    </div>
}