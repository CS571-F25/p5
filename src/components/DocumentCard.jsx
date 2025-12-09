import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DocumentCard(props) {
    const navigate = useNavigate();

    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="d-flex justify-content-center mb-3">
            <Card onClick={() => navigate(`/documents/${props.id}`)} className="shadow-sm rounded-2 w-100">
                <Card.Body className="p-3">
                    <Card.Title className="fw-bold">{props.name}</Card.Title>
                    <Card.Text className="mb-0">
                        <strong>Subject:</strong> {props.subject} <br />
                        <strong>Due:</strong> {props.duedate}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}
