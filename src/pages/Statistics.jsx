import React from "react";
import { Card, Stack } from "react-bootstrap";
import assignmentsData from "../data/assignmentsData";

export default function Statistics() {
    const statusOrder = ["in-progress", "todo", "done"];

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const parts = date.replace(/\/$/, "").split("/");
        const [month, day, year] = parts;
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedAssignments = statusOrder
        .map((status) =>
            assignmentsData
                .filter((a) => a.status === status)
                .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))
        )
        .flat();

    const nextAssignment = sortedAssignments.find(
        (a) => a.status === "in-progress" || a.status === "todo"
    );

    const inProgressAssignments = sortedAssignments.filter(
        (a) => a.status === "in-progress"
    );


    return <div
        style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        }}
    >
        <h1>Statistics!</h1>

        {nextAssignment ? (
            <Card
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    marginTop: "20px",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 8px lightgray",
                }}
            >
                <Card.Body>
                    <Card.Title>Your next assignment is:</Card.Title>
                    <Card.Text>
                        <strong>{nextAssignment.name}</strong>
                        <br />
                        Due: {nextAssignment.duedate}
                    </Card.Text>
                </Card.Body>
            </Card>
        ) : (
            <p>No upcoming assignments!</p>
        )}

        {/* {inProgressAssignments.length > 0 && (
            <Stack
                gap={3}
                style={{
                    marginTop: "30px",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <h3>In-Progress Assignments</h3>
                {inProgressAssignments.map((assignment, idx) => (
                    <Card
                        key={idx}
                        style={{
                            padding: "15px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 6px lightgray",
                            textAlign: "center",
                        }}
                    >
                        <Card.Body>
                            <strong>{assignment.name}</strong>
                            <br />
                            Due: {assignment.duedate}
                        </Card.Body>
                    </Card>
                ))}
            </Stack>
        )} */}
    </div>
}
