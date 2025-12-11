import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Pagination, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";

export default function Documents() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setAssignments(Object.entries(data.results).map(([id, assignment]) => ({ id, ...assignment })));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 9;

    const filtered = assignments.filter(a => {
        const searchMatch = a.name.toLowerCase().includes(search.toLowerCase());
        const filterMatch = !filter || a.subject === filter;
        return searchMatch && filterMatch;
    });

    const totalPages = Math.ceil(filtered.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentAssignments = filtered.slice(startIndex, startIndex + cardsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(<Pagination.Item as="button" key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}> {number} </Pagination.Item>);
    }

    const uniqueSubjects = [...new Set(assignments.map(a => a.subject?.trim()).filter(s => s && s.length > 0))].sort();

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" className="mt-3">
                    <span className="visually-hidden">Loading documents...</span>
                </Spinner>
            </Container>
        );
    }

    return <Container className="mt-4 pb-4">
        
        <Form.Group controlId="searchInput">
            <Row>
                <Col lg="9" xs="8">
                    <Form.Label htmlFor="searchDocuments" className="visually-hidden">Search documents</Form.Label>
                    <Form.Control  id="searchDocuments" type="text" placeholder="Search documents" value={search} aria-label="Search documents" onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} className="mb-3" />
                </Col>
                <Col lg="3" xs="4">
                    <Form.Label htmlFor="filterBySubject" className="visually-hidden">Filter documents ny subject</Form.Label>
                    <Form.Select  id="filterBySubject" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter documents by subject">
                        <option value="">Any Subject</option>
                        {uniqueSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                    </Form.Select>
                </Col>
            </Row>
        </Form.Group>

        <Row className="g-4 justify-content-center" style={{ minHeight: "500px" }}>
            {currentAssignments.map((assignment) => {
                const originalIndex = assignments.indexOf(assignment);

                return <DocumentCard key={originalIndex} {...assignment} index={originalIndex} />
            })}
        </Row>

        {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {paginationItems}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
        )}
    </Container>
}
