import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Stack, Form, Spinner } from "react-bootstrap";
import AssignmentBar from "../components/AssignmentBar";
import NotesPanel from "../components/NotesPanel";
import AddAssigmentModal from "../components/AddAssignmentModal";

export default function Home() {
    const [reload, setReload] = useState(0);
    const [assignments, setAssignments] = useState([]);
    const [openNotes, setOpenNotes] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [studyTimeStart, setStudyTimeStart] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchTitle, setSearchTitle] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const [accordionOpen, setAccordionOpen] = useState({
        "in-progress": true,
        "todo": true,
        "done": false
    });

    const toggleAccordion = (section) => {
        setAccordionOpen(prev => ({...prev, [section]: !prev[section]}));
    };

    // Fetch assignments
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
                setAssignments(assignmentsArray);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [reload]);

    const handleOpenNotes = (index) => {
        setOpenNotes(index);
        setStudyTimeStart(Date.now());
    };

    const handleCloseNotes = () => {
        setOpenNotes(null);

        if (studyTimeStart !== null) {
            const studyTime = Math.floor((Date.now() - studyTimeStart) / 1000); // seconds
            const assignment = assignments[openNotes];
            if (assignment) {
                const updated = { ...assignment, studyTime: (assignment.studyTime || 0) + studyTime };
                handleUpdate(assignment, updated);
            }
            setStudyTimeStart(null);
        }
    };

    const handleSaveNotes = (newText) => {
        const assignment = assignments[openNotes];
        if (!assignment) return;

        const updatedAssignment = { ...assignment, notes: newText };
        setAssignments((prev) => {
            const newAssignments = [...prev];
            newAssignments[openNotes] = updatedAssignment;
            return newAssignments;
        });
        localStorage.setItem(`assignment_notes_${assignment.id}`, newText);

        handleUpdate(assignment, updatedAssignment);
    };

    const handleStatusChange = (assignment, newStatus) => {
        const today = new Date();
        const formattedDate = `${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}/`;
        const updated = { ...assignment, status: newStatus };

        if (assignment.status === "todo" && newStatus === "in-progress") updated.startdate = formattedDate;
        if (assignment.status === "in-progress" && newStatus === "done") updated.enddate = formattedDate;
        if (assignment.status === "todo" && newStatus === "done") {
            updated.startdate = formattedDate;
            updated.enddate = formattedDate;
        }
        if (assignment.status === "in-progress" && newStatus === "todo") updated.startdate = "";
        if (assignment.status === "done" && newStatus === "in-progress") updated.enddate = "";
        if (assignment.status === "done" && newStatus === "todo") {
            updated.startdate = "";
            updated.enddate = "";
        }

        handleUpdate(assignment, updated);
    };

    const handleDateChange = (assignment, newDate) => {
        handleUpdate(assignment, { ...assignment, duedate: newDate });
    };

    const handleUpdate = (assignment, updatedAssignment) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments?id=${assignment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-CS571-ID": CS571.getBadgerId() },
            body: JSON.stringify(updatedAssignment)
        }).then(() => handleReload());
    };

    const handleDelete = (assignment) => {
        const confirmDelete = window.confirm(`Deleting "${assignment.name}" will also delete its notes! Are you sure?`);

        if (!confirmDelete) return;

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments?id=${assignment.id}`, {
            method: "DELETE",
            headers: { "X-CS571-ID": CS571.getBadgerId() }
        }).then(() => handleReload());
    }

    const handleReload = () => setReload((prev) => prev + 1);

    // Filter assignments
    const filteredAssignments = assignments.filter(a => {
        const matchesTitle = !searchTitle || a.name.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesSubject = !filterSubject || a.subject === filterSubject;
        const matchesStatus = !filterStatus || a.status === filterStatus;
        const matchesDate = !filterDate || (() => {
            const [year, month, day] = filterDate.split("-");
            const formattedDate = `${month}/${day}/${year}`;
            return a.duedate === formattedDate;
        })();

        return matchesTitle && matchesSubject && matchesStatus && matchesDate;
    });

    // Sort assignments
    const statusOrder = ["in-progress", "todo", "done"];
    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedAssignments = statusOrder
        .map((status) =>
            filteredAssignments
                .filter((a) => a && a.status === status)
                .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))
        )
        .flat();

    const groupedAssignments = {
        "in-progress": sortedAssignments.filter(a => a.status === "in-progress"),
        "todo": sortedAssignments.filter(a => a.status === "todo"),
        "done": sortedAssignments.filter(a => a.status === "done"),
    }

    const uniqueSubjects = [...new Set(assignments.map(a => a.subject?.trim()).filter(s => s && s.length > 0))].sort();

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" className="mt-3">
                    <span className="visually-hidden">Loading assignments...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-4 pb-4">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Hello!</h1>
                    <Button variant="primary" style={{ backgroundColor: "#d4edda", color: "#155724", border: "none" }} className="rounded-pill" onClick={() => setShowModal(true)}>Create Assignment</Button>
                </Col>
            </Row>

            <Row className="justify-content-center mb-4">
                <Col lg="6" xs="3">
                    <Form.Control type="text" placeholder="Search Assignments" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                </Col>
                <Col lg="2" xs="3">
                <Form.Control type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                </Col>
                <Col lg="2" xs="3">
                    <Form.Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                        <option value="">Any Subject</option>
                        {uniqueSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                    </Form.Select>
                </Col>
                <Col lg="2" xs="3">
                    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">Any Status</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </Form.Select>
                </Col>
            </Row>

            <Container onClick={() => toggleAccordion("in-progress")} className="mb-3" style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem" }}>
                {accordionOpen["in-progress"] ? "▼" : "▶"} In Progress <span className="text-muted" style={{ fontWeight: "normal" }}>({groupedAssignments["in-progress"].length})</span>
            </Container>
            {accordionOpen["in-progress"] && (
                <Stack gap={3} className="mb-3">
                    {groupedAssignments["in-progress"].map((assignment) => (
                        <AssignmentBar
                            key={assignment.id}
                            {...assignment}
                            onStatusChange={(newStatus) => handleStatusChange(assignment, newStatus)}
                            onDateChange={(newDate) => handleDateChange(assignment, newDate)}
                            onNotesClick={() => handleOpenNotes(assignments.indexOf(assignment))}
                            onDelete={() => handleDelete(assignment)}
                        />
                    ))}
                    {groupedAssignments["in-progress"].length === 0 && <Container className="text-muted">No assignments in progress!</Container>}
                </Stack>
            )}

            <Container onClick={() => toggleAccordion("todo")} className="mb-3" style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem" }}>
                {accordionOpen["todo"] ? "▼" : "▶"} To Do <span className="text-muted" style={{ fontWeight: "normal" }}>({groupedAssignments["todo"].length})</span>
            </Container>
            {accordionOpen["todo"] && (
                <Stack gap={3} className="mb-3">
                    {groupedAssignments["todo"].map((assignment) => (
                        <AssignmentBar
                            key={assignment.id}
                            {...assignment}
                            onStatusChange={(newStatus) => handleStatusChange(assignment, newStatus)}
                            onDateChange={(newDate) => handleDateChange(assignment, newDate)}
                            onNotesClick={() => handleOpenNotes(assignments.indexOf(assignment))}
                            onDelete={() => handleDelete(assignment)}
                        />
                    ))}
                    {groupedAssignments["todo"].length === 0 && <Container className="text-muted">No assignments to do!</Container>}
                </Stack>
            )}

            <Container onClick={() => toggleAccordion("done")} className="mb-3" style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem" }}>
                {accordionOpen["done"] ? "▼" : "▶"} Done <span className="text-muted" style={{ fontWeight: "normal" }}>({groupedAssignments["done"].length})</span>
            </Container>
            {accordionOpen["done"] && (
                <Stack gap={3} className="mb-3">
                    {groupedAssignments["done"].map((assignment) => (
                        <AssignmentBar
                            key={assignment.id}
                            {...assignment}
                            onStatusChange={(newStatus) => handleStatusChange(assignment, newStatus)}
                            onDateChange={(newDate) => handleDateChange(assignment, newDate)}
                            onNotesClick={() => handleOpenNotes(assignments.indexOf(assignment))}
                            onDelete={() => handleDelete(assignment)}
                        />
                    ))}
                    {groupedAssignments["done"].length === 0 && <Container className="text-muted">No assignments done yet!</Container>}
                </Stack>
            )}

            {openNotes != null && (
                <NotesPanel
                    assignment={assignments[openNotes]}
                    onClose={handleCloseNotes}
                    onSaveNotes={handleSaveNotes}
                    fullScreen={false}
                />
            )}

            <AddAssigmentModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleReload} />
        </Container>
    );
}

