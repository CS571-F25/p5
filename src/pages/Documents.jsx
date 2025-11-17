import React, { useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import assignmentsData from "../data/assignmentsData";

export default function Documents() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filtered = assignmentsData.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container style={{ marginTop: "20px" }}>
            <Form.Control
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: "25px",
                    padding: "12px",
                    borderRadius: "12px",
                    fontSize: "16px"
                }}
            />

            <Row xs={1} sm={2} md={3} lg={3} className="g-4">
                {filtered.map((assignment, index) => (
                    <Col key={index}>
                        <Card
                            onClick={() => navigate(`/documents/${index}`)}
                            style={{
                                cursor: "pointer",
                                borderRadius: "15px",
                                padding: "10px",
                                minHeight: "150px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >
                            <Card.Body>
                                <Card.Title className="fw-bold">{assignment.name}</Card.Title>
                                <Card.Text>
                                    <strong>Subject:</strong> {assignment.subject} <br />
                                    <strong>Due:</strong> {assignment.duedate}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
