import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DocumentCard(props) {
    const navigate = useNavigate();

    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="d-flex justify-content-center mb-4">
            <Card onClick={() => navigate(`/documents/${props.id}`)} className="shadow-sm rounded-2 w-100">
                <Card.Body className="p-3 justify-content-center text-center">
                    <Card.Title className="fw-bold pb-2">{props.name}</Card.Title>
                    <Container>
                        <Row className="justify-content-center">
                            <Col>
                                <Button variant="primary" className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none" }}>{props.duedate}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" className="rounded-pill" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>{props.subject}</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Col>
    );
}
