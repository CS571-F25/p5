import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

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

    return <Row className="justify-content-center mb-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Col xs={12}>
            <Card className="mt-3"
                style={{
                    backgroundColor: "#d0e8ff",
                    color: "#005089ff"
                }}>
                <Card.Body className="text-center">
                    <Card.Title>Your next assignment is:</Card.Title>
                    <Card.Text>
                        <strong>{nextAssignment.name}</strong>
                        <br />
                        Due: {nextAssignment.duedate}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
}