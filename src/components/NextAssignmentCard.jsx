import React, { useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";

export default function NextAssignmentCard(props) {

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.replace(/\/$/, "").split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedAssignments = Object.values(props)
        .filter(a => a)
        .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate));

    const nextAssignment = sortedAssignments.find(
        (a) => a.status === "in-progress" || a.status === "todo"
    );

    return <Row className="justify-content-center mb-2">
        <Col>
            <Card className="mt-3">
                <Card.Body className="text-center">
                    <Card.Title>Your next assignment is:</Card.Title>
                    <Card.Text style={{ fontSize: "1.4rem", fontWeight: "700" }}>{nextAssignment.name}</Card.Text>
                        <Row className="justify-content-center mb-0">
                            <Col xs="auto">
                                <Button variant="primary" className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none" }}>{nextAssignment.duedate}</Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>{nextAssignment.subject}</Button>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </Col>
    </Row>
}