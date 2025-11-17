import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import assignmentsData from "../data/assignmentsData";

export default function Documents() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const cardsPerPage = 9;
    const cardWidth = 300;
    
    const filtered = assignmentsData.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentAssignments = filtered.slice(startIndex, startIndex + cardsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container style={{ marginTop: "20px" }}>
            <Form.Control
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                style={{
                    marginBottom: "25px",
                    padding: "12px",
                    borderRadius: "12px",
                    fontSize: "16px"
                }}
            />

            <Row
                className="g-4 justify-content-center"
                style={{ minHeight: "500px" }}
            >
                {currentAssignments.map((assignment) => {
                    const originalIndex = assignmentsData.indexOf(assignment);

                    return (
                        <Col
                            key={originalIndex}
                            style={{ flex: `0 0 ${cardWidth}px` }}
                        >
                            <Card
                                onClick={() => navigate(`/documents/${originalIndex}`)}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "15px",
                                    padding: "10px",
                                    minHeight: "150px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                }}
                            >
                                <Card.Body>
                                    <Card.Title className="fw-bold">{assignment.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Subject:</strong> {assignment.subject} <br />
                                        <strong>Due:</strong> {assignment.duedate}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            )}
        </Container>
    );
}
