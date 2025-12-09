import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import NextAssignmentCard from "../components/NextAssignmentCard";
import StatCard from "../components/StatCard";

export default function Statistics() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.replace(/\/$/, "").split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: { "X-CS571-ID": CS571.getBadgerId() },
        })
            .then((res) => res.json())
            .then((data) => {
                const assignmentsArray = Object.entries(data.results).map(([id, a]) => ({
                    id,
                    ...a,
                }));
                setAssignments(assignmentsArray);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const sortedAssignments = assignments
        .filter(a => a)
        .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate));

    const nextAssignment = sortedAssignments.find(
        (a) => a.status === "in-progress" || a.status === "todo"
    );

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter((a) => a.status === "done").length;
    const assignmentsDueThisWeek = assignments.filter((a) => {
        const due = formatDate(a.duedate);
        return due >= today && due <= nextWeek && a.status !== "done";
    }).length;
    const overdueAssignments = assignments.filter((a) => {
        const due = formatDate(a.duedate);
        return due < today && a.status !== "done";
    }).length;

    const assignmentsOnSelectedDate = selectedDate
        ? assignments.filter(a => {
            const due = formatDate(a.duedate);
            return (
                due.getFullYear() === selectedDate.getFullYear() &&
                due.getMonth() === selectedDate.getMonth() &&
                due.getDate() === selectedDate.getDate()
            );
        })
        : [];

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <h1>Statistics</h1>
                <Spinner animation="border" role="status" className="mt-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            {nextAssignment && (
                <Row className="justify-content-center mb-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <Col xs={12}>
                        <NextAssignmentCard {...nextAssignment}>
                            <p className="mt-2 text-center">
                                Countdown: <strong>{countdown}</strong>
                            </p>
                        </NextAssignmentCard>
                    </Col>
                </Row>
            )}

            <Row className="gx-3 gy-3 justify-content-center mb-3">
                <Col xs={12} md={8}>
                    <div className="p-3 border rounded shadow-sm bg-light mt-3" style={{ textAlign: "center" }}>
                        <h4 className="mb-3">Assignment Calendar</h4>
                        <Calendar
                            onClickDay={(date) => setSelectedDate(date)}
                            value={selectedDate}
                            className="m-auto"
                        />
                    </div>
                </Col>
            </Row>

{selectedDate && (
                <Row className="mt-4 justify-content-center">
                    <Col xs={12} md={8}>
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4 className="text-center mb-3">
                                Assignments Due on {selectedDate.toLocaleDateString()}
                            </h4>
                            {assignmentsOnSelectedDate.length === 0 ? (
                                <p className="text-center text-muted">No assignments due on this day.</p>
                            ) : (
                                <ul className="list-group">
                                    {assignmentsOnSelectedDate.map(a => (
                                        <li key={a.id} className="list-group-item d-flex justify-content-between">
                                            <span>{a.name}</span>
                                            <span>{a.duedate}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>
            )}

            <Row className="gx-3 gy-3 justify-content-center mt-2 mb-5" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <Col xs={12} sm={6} md={3}>
                    <StatCard title="Total Assignments" value={totalAssignments} />
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <StatCard title="Due This Week" value={assignmentsDueThisWeek} />
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <StatCard title="Completed" value={completedAssignments} />
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <StatCard title="Overdue" value={overdueAssignments} />
                </Col>
            </Row>


        </Container>
    );
}
