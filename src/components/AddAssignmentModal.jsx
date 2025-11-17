import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddAssigmentModal({ show, onClose, onSubmit }) {
    
    const [newAssignment, setNewAssignment] = useState({
        name: "",
        subject: "",
        duedate: "",
        status: "todo",
        notes: ""
    });

    useEffect(() => {
        if (show) {
            setNewAssignment({
                name: "",
                subject: "",
                duedate: "",
                status: "todo",
                notes: ""
            });
        }
    }, [show]);

    const handleSubmit = () => {
        onSubmit({...newAssignment, duedate: formatDate(newAssignment.duedate)});
        onClose();
    }

    const formatDate = (date) => {
        if(!date) return "";
        const [year, month, day] = date.split("-");
        return `${month}/${day}/${year}`;
    }

    return <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Assignment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control type="text" value={newAssignment.name} onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" value={newAssignment.subject} onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" value={newAssignment.duedate} onChange={(e) => setNewAssignment({...newAssignment, duedate: e.target.value})} />
                </Form.Group>                    
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Add Assignment</Button>
        </Modal.Footer>
    </Modal>
}