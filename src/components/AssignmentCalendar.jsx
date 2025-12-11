import React, { useState } from "react";
import { Button, Badge, Card, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#573681", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#881B1B", label: "In Progress" },
    "done": { background: "#d4edda", color: "#145222", label: "Done" }
};

export default function AssignmentCalendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const assignmentsOnSelectedDate = selectedDate
        ? Object.values(props).filter(a => {
            const due = formatDate(a.duedate);
            return (
                due.getFullYear() === selectedDate.getFullYear() &&
                due.getMonth() === selectedDate.getMonth() &&
                due.getDate() === selectedDate.getDate() - 1
            );
        })
        : [];

    return <>
        <Row className="gx-3 gy-3 justify-content-center mb-3">
            <Col>
                <Card className="p-3 shadow-sm rounded mt-3 border"
                    style={{ textAlign: "center" }}>
                    <Card.Title id="calendar-label" className="mb-3">Select a Date</Card.Title>
                    <Card.Text id="calendar-instructions" className="visually-hidden">Select a date to view the assignments due on that day.</Card.Text>
                    <Calendar
                        onClickDay={(date) => setSelectedDate(date)}
                        value={selectedDate}
                        className="m-auto"
                        aria-labelledby="calendar-label"
                        aria-describedby="calendar-instructions"
                    />
                </Card>
            </Col>
        </Row>

        {selectedDate && (
            <Row className="mt-4 justify-content-center">
                <Col>
                    <Card className="p-3 rounded shadow-sm border">
                        <Card.Title className="text-center mb-3">
                            Assignments Due on {selectedDate.toLocaleDateString()}
                        </Card.Title>
                        <Card.Body>
                            {assignmentsOnSelectedDate.length === 0 ? (
                                <Card.Text className="text-center text-muted">No assignments due on this day.</Card.Text>
                            ) : (
                                <ul className="list-group">
                                    {assignmentsOnSelectedDate.map(a => (
                                        <li key={a.id} className="list-group-item d-flex justify-content-between">
                                            <Col className="d-flex align-items-center">
                                                {a.name}
                                            </Col>
                                            <span aria-label={`Subject: ${a.subject}`} className="rounded-pill px-3 py-1 me-3" style={{ backgroundColor: "#FFE7C2", color: "#704300", border: "none" }}>{a.subject}</span>
                                            <span aria-label={`Status: ${a.status}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: statusStyling[a.status].background, color: statusStyling[a.status].color, border: "none" }}>{a.status === "todo" ? "To Do" : a.status === "in-progress" ? "In Progress" : "Done"}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )}
    </>
}