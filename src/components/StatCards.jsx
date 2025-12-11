import { Card, Row, Col } from "react-bootstrap";

export default function StatCards(props) {

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    let today = new Date();
    today.setDate(today.getDate() - 1);
    today = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    today = formatDate(today);

    let nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 6);
    nextWeek = `${nextWeek.getMonth() + 1}/${nextWeek.getDate()}/${nextWeek.getFullYear()}`;
    nextWeek = formatDate(nextWeek);

    const assignments = Object.values(props);
    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter((a) => a.status === "done").length;
    const assignmentsDueThisWeek = assignments.filter((a) => {
        const due = formatDate(a.duedate);
        return due >= today && due <= nextWeek && a.status !== "done";
    }).length;
    const overdueAssignments = assignments.filter((a) => {
        const due = formatDate(a.duedate);
        return due < today && a.status !== "done";
    }).length;

    return (
        <Row className="gx-3 gy-3 justify-content-center mt-2 mb-5">
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: "#e0e0e0", color: "#42464C" }}>
                    <Card.Title className="mb-2">Total Assignments</Card.Title>
                    <Card.Text className="fw-bold" style={{ fontSize: "1.75rem" }}>{totalAssignments}</Card.Text>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: "#e8d9ff", color: "#573681" }}>
                    <Card.Title className="mb-2">Due in the Next 7 Days</Card.Title>
                    <Card.Text className="fw-bold" style={{ fontSize: "1.75rem" }}>{assignmentsDueThisWeek}</Card.Text>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: "#d4edda", color: "#145222" }}>
                    <Card.Title className="mb-2">Completed Assignments</Card.Title>
                    <Card.Text className="fw-bold" style={{ fontSize: "1.75rem" }}>{completedAssignments}</Card.Text>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: "#ffd4d4", color: "#881B1B" }}>
                    <Card.Title className="mb-2">Overdue Assignments</Card.Title>
                    <Card.Text className="fw-bold" style={{ fontSize: "1.75rem" }}>{overdueAssignments}</Card.Text>
                </Card>
            </Col>
        </Row>
    );
}
