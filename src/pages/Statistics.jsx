import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import NextAssignmentCard from "../components/NextAssignmentCard";
import StatCards from "../components/StatCards";
import AssignmentCalendar from "../components/AssignmentCalendar";

export default function Statistics() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" className="mt-3">
                    <span className="visually-hidden">Loading statistics...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <NextAssignmentCard {...assignments} />
            <AssignmentCalendar {...assignments} />
            <StatCards {...assignments} />
        </Container>
    );
}
