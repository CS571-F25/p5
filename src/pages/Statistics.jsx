import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import NextAssignmentCard from "../components/NextAssignmentCard";
import StatCard from "../components/StatCard";
import AssignmentCalendar from "../components/AssignmentCalendar";

export default function Statistics() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <NextAssignmentCard {...assignments} />
            <AssignmentCalendar {...assignments} />

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
