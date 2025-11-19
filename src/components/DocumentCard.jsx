import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const styles = {
    card: {
        cursor: "pointer",
        borderRadius: "15px",
        padding: "10px",
        minHeight: "150px",
        width: "300px",
        maxWidth: "100%"
    }
}

export default function DocumentCard(props) {
    const navigate = useNavigate();

    return <Col xs={12} sm={6} md={6} lg={4} xl={3} className="d-flex justify-content-center">
        <Card onClick={() => navigate(`/documents/${props.index}`)} style={styles.card} >
            <Card.Body>
                <Card.Title className="fw-bold">{props.name}</Card.Title>
                <Card.Text>
                    <strong>Subject:</strong> {props.subject} <br />
                    <strong>Due:</strong> {props.duedate}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
}