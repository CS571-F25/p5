import React from "react";
import { Card } from "react-bootstrap";

const styles = {
    card: {
        width: "100%",
        maxWidth: "500px",
        marginTop: "20px",
        textAlign: "center",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 2px 8px lightgray"
    }
}

export default function NextAssignmentCard(props) {
    return <Card style={styles.card} >
        <Card.Body>
            <Card.Title>Your next assignment is:</Card.Title>
            <Card.Text>
                <strong>{props.name}</strong>
                <br />
                Due: {props.duedate}
            </Card.Text>
        </Card.Body>
    </Card>
}