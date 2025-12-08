import React, { useEffect, useState } from "react";
import { Button, Stack, Container } from "react-bootstrap";
import AssignmentBar from "../components/AssignmentBar";
import NotesPanel from "../components/NotesPanel";
import AddAssigmentModal from "../components/AddAssignmentModal";

export default function Home(props) {
    const [reload, setReload] = useState(0);
    const [assignments, setAssignments] = useState([]);
    const [openNotes, setOpenNotes] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            setAssignments(Object.entries(data.results).map(([id, assignment]) => ({id, ...assignment})));
        })
    }, [reload]);

    const handleOpenNotes = (assignment) => { setOpenNotes(assignment) };
    const handleCloseNotes = () => { setOpenNotes(null) };

    const handleSaveNotes = (newText) => {
        const assignment = assignments[openNotes];
        if(!assignment) return;

        handleUpdate(assignment, {...assignment, notes: newText });
    }

    const handleStatusChange = (assignment, newStatus) => {
        const today = new Date();
        const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${(today.getFullYear())}/`;
        const updatedAssignment = {...assignment, status: newStatus};
        
        if (assignment.status === "todo" && newStatus === "in-progress") { updatedAssignment.startdate = formattedDate; }

        if (assignment.status === "in-progress" && newStatus === "done") { updatedAssignment.enddate = formattedDate; }

        if (assignment.status === "todo" && newStatus === "done") {
            updatedAssignment.startdate = formattedDate;
            updatedAssignment.enddate = formattedDate;
        }

        if (assignment.status === "in-progress" && newStatus === "todo") { updatedAssignment.startdate = ""; }

        if (assignment.status === "done" && newStatus === "in-progress") { updatedAssignment.enddate = ""; }

        if (assignment.status === "done" && newStatus === "todo") {
            updatedAssignment.startdate = "";
            updatedAssignment.enddate = "";
        }

        handleUpdate(assignment, updatedAssignment);
    }

    const handleDateChange = (assignment, newDate) => {
        const updatedAssignment = {...assignment, "duedate": newDate};
        handleUpdate(assignment, updatedAssignment);
    }

    const handleUpdate = (assignment, updatedAssignment) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments?id=${assignment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify(updatedAssignment)
        }).then(handleReload());
    }

    const handleReload = () => {
        setReload(prev => prev + 1);
    };

    const statusOrder = ["in-progress", "todo", "done"];
    const formatDate = (date) => {
        const [month, day, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    }
    const sortedAssignments = statusOrder.map(status => Object.values(assignments).filter(a => a && a.status === status).sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))).flat();

    return <div style={{ marginTop: "20px", paddingBottom: "20px", width: "100%"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Hello!</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>Create Assignment</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%"}}>
            <Stack gap={3} style={{ width: "600px", maxWidth: "90%" }}>
                {sortedAssignments.map((assignment, index) => (
                    <AssignmentBar key={index} {...assignment}
                        onStatusChange={(newStatus) => handleStatusChange(assignment, newStatus)}
                        onDateChange={(newDate) => handleDateChange(assignment, newDate)}
                        onNotesClick={() => handleOpenNotes(assignments.indexOf(assignment))}
                    />
                ))}
            </Stack>
        </div>

        {openNotes != null && (
            <NotesPanel
                assignment={assignments[openNotes]}
                onClose={handleCloseNotes}
                onSaveNotes={handleSaveNotes}
                fullScreen={false}
            />
        )}

        <AddAssigmentModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleReload} />
    </div>
}