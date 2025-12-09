import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function AssignmentCalendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.replace(/\/$/, "").split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const assignmentsOnSelectedDate = selectedDate
        ? Object.values(props).filter(a => {
            const due = formatDate(a.duedate);
            return (
                due.getFullYear() === selectedDate.getFullYear() &&
                due.getMonth() === selectedDate.getMonth() &&
                due.getDate() === selectedDate.getDate()
            );
        })
        : [];

    return <>
        <Row className="gx-3 gy-3 justify-content-center mb-3">
            <Col xs={12} md={8}>
                <div className="p-3 border rounded shadow-sm mt-3" style={{ textAlign: "center" }}>
                    <h4 className="mb-3">Assignment Calendar</h4>
                    <Calendar
                        onClickDay={(date) => setSelectedDate(date)}
                        value={selectedDate}
                        className="m-auto"
                    />
                </div>
            </Col>
        </Row>

        {selectedDate && (
            <Row className="mt-4 justify-content-center">
                <Col xs={12} md={8}>
                    <div className="p-3 border rounded shadow-sm">
                        <h4 className="text-center mb-3">
                            Assignments Due on {selectedDate.toLocaleDateString()}
                        </h4>
                        {assignmentsOnSelectedDate.length === 0 ? (
                            <p className="text-center text-muted">No assignments due on this day.</p>
                        ) : (
                            <ul className="list-group">
                                {assignmentsOnSelectedDate.map(a => (
                                    <li key={a.id} className="list-group-item d-flex justify-content-between">
                                        <span>{a.name}</span>
                                        <span>{a.duedate}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Col>
            </Row>
        )}
    </>
}