import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
    return (
        <Navbar
            bg="white"
            className="shadow-sm mb-4"
            style={{ padding: "0.75rem 1rem", margin: 12, borderRadius: 12 }}
        >
            <Container className="d-flex justify-content-center">
                <Nav className="d-flex gap-4">

                    <LinkContainer to="/">
                        <Nav.Link className="fw-semibold">Home</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/documents">
                        <Nav.Link className="fw-semibold">Documents</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/statistics">
                        <Nav.Link className="fw-semibold">Statistics</Nav.Link>
                    </LinkContainer>

                </Nav>
            </Container>
        </Navbar>
    );
}
