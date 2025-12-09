import React from "react";
import { Card, Button, Form, Dropdown, Row, Col } from "react-bootstrap";


const statusChoices = {
    "todo": { background: "#e8d9ff", color: "#5e3a8c", label: "To Do" },
    "in-progress": { background: "#ffd4d4", color: "#b32424", label: "In Progress" },
    "done": { background: "#c9f7d7", color: "#1e7a44", label: "Done" }
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

    const currentColor = statusChoices[props.status] || {
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
                        <Form.Control type="date" value={formatForInput(props.duedate)} onChange={e => props.onDateChange(formatForAPI(e.target.value))} className="rounded-pill" style={{ backgroundColor: "#d0e8ff", color: "#005fa3", border: "none", "width": "140px" }} />
                    </Col>

                    <Col xs="auto">
                        <Button variant="warning" onClick={props.onNotesClick} className="rounded-pill" style={{ backgroundColor: "#ffe8c2", color: "#a36200", border: "none" }}>Notes</Button>
                    </Col>

                    <Col xs="auto">
                        <Dropdown onSelect={(key) => props.onStatusChange(key)}>
                            <Dropdown.Toggle style={{ backgroundColor: currentColor.background, color: currentColor.color, border: "none" }} className="rounded-pill">{currentColor.label}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item key="todo" eventKey="todo" style={{ color: statusChoices["todo"].color}}>To Do</Dropdown.Item>
                                <Dropdown.Item key="in-progress" eventKey="in-progress" style={{ color: statusChoices["in-progress"].color}}>In Progress</Dropdown.Item>
                                <Dropdown.Item key="done" eventKey="done" style={{ color: statusChoices["done"].color}}>Done</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}