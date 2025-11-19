import React, { useState } from "react";
import { Card, Row, Col, Form, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import assignmentsData from "../data/assignmentsData";
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
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 12;

    const filtered = assignmentsData.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentAssignments = filtered.slice(startIndex, startIndex + cardsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push( <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}> {number} </Pagination.Item> );
    }

    return <div style={styles.container}>
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

        <Row className="g-4 justify-content-center" style={{ minHeight: "500px" }}>
            {currentAssignments.map((assignment) => {
                const originalIndex = assignmentsData.indexOf(assignment);

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
