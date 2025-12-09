import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";

const styles = {
    container: {
        padding: "10px",
        marginTop: "20px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}

export default function Documents() {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            setAssignments(Object.entries(data.results).map(([id, assignment]) => ({id, ...assignment})));
        })
    }, []);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 12;

    const filtered = assignments.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentAssignments = filtered.slice(startIndex, startIndex + cardsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push( <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}> {number} </Pagination.Item> );
    }

    console.log(assignments);
    
    return <div style={styles.container}>
        <Form.Control
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
            xs={12}
            className="mb-3"
        />

        <Row className="g-4 justify-content-center" style={{ minHeight: "500px" }}>
            {currentAssignments.map((assignment) => {
                const originalIndex = assignments.indexOf(assignment);

                return <DocumentCard key={originalIndex} {...assignment} index={originalIndex}/>
            })}
        </Row>

        {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {paginationItems}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
        )}
    </div>
}
