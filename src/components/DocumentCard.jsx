import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DocumentCard(props) {
    const navigate = useNavigate();

    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={4} className="d-flex justify-content-center mb-4">
            <Card as="button" onClick={() => navigate(`/documents/${props.id}`)} className="shadow-sm rounded-2 w-100">
                <Card.Body className="p-3 justify-content-center text-center">
                    <Card.Title className="fw-bold pb-2">{props.name}</Card.Title>
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs="auto" className="pb-3">
                                <span aria-label={`Due Date: ${props.duedate}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: "#d0e8ff", color: "#004A80", border: "none" }}>{props.duedate}</span>
                            </Col>
                            <Col xs="auto">
                                <span aria-label={`Subject: ${props.subject}`} className="rounded-pill px-3 py-1" style={{ backgroundColor: "#FFE7C2", color: "#704300", border: "none" }}>{props.subject}</span>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Col>
    );
}
