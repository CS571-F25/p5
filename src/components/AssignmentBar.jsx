import React from "react";
import { Card, Button, Form, Dropdown, Row, Col } from "react-bootstrap";

const statusStyling = {
    "todo": { background: "#e8d9ff", color: "#573681", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#881B1B", label: "In Progress" },
    "done": { background: "#d4edda", color: "#145222", label: "Done" }
};

const formatForInput = (date) => {
    if(!date) return "";
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const formatForAPI = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
}

export default function AssignmentBar(props) {

    const currentColor = statusStyling[props.status] || {
        background: "#e5e5e5",
        color: "#333",
        label: ""
    };

    return (
        <Card className="mb-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <Card.Body className="p-3">
                <Row className="align-items-center">
                    <Col>
                        <Card.Title className="mb-0" style={{ fontSize: "18px" }}>{props.name}</Card.Title>
                        <Card.Title className="text-muted" style={{ fontSize: "14px" }}>{props.subject}</Card.Title>
                    </Col>

                    <Col xs="auto">
                        <Form.Label htmlFor="dueDate" className="visually-hidden">Due Date</Form.Label>
                        <Form.Control id="dueDate" type="date" value={formatForInput(props.duedate)} onChange={e => props.onDateChange(formatForAPI(e.target.value))} className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#004A80", border: "none", "width": "140px" }} />
                    </Col>

                    <Col xs="auto">
                        <Button aria-label="Open notes panel" onClick={props.onNotesClick} className="rounded-pill" style={{ backgroundColor: "#FFE7C2", color: "#704300", border: "none" }}>Notes</Button>
                    </Col>

                    <Col xs="auto">
                        <Dropdown onSelect={(key) => props.onStatusChange(key)}>
                            <Dropdown.Toggle aria-label={`Change status (current: ${currentColor.label})`} style={{ backgroundColor: currentColor.background, color: currentColor.color, border: "none" }} className="rounded-pill">{currentColor.label}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item key="todo" eventKey="todo" style={{ color: statusStyling["todo"].color}}>To Do</Dropdown.Item>
                                <Dropdown.Item key="in-progress" eventKey="in-progress" style={{ color: statusStyling["in-progress"].color}}>In Progress</Dropdown.Item>
                                <Dropdown.Item key="done" eventKey="done" style={{ color: statusStyling["done"].color}}>Done</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs="auto">
                        <Button aria-label="Delete assignment" className="rounded-pill" style={{ backgroundColor: "#e0e0e0", color: "#42464C", border: "none" }} onClick={props.onDelete}>✕</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}