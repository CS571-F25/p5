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
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: "#e0e0e0", color: "#6c757d" }}>
                    <h5 className="mb-2">Total Assignments</h5>
                    <div className="fw-bold" style={{ fontSize: "1.75rem" }}>{totalAssignments}</div>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ background: "#e8d9ff", color: "#5e3a8c" }}>
                    <h5 className="mb-2">Due in the Next 7 Days</h5>
                    <div className="fw-bold" style={{ fontSize: "1.75rem" }}>{assignmentsDueThisWeek}</div>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ background: "#c9f7d7", color: "#1e7a44" }}>
                    <h5 className="mb-2">Completed Assignments</h5>
                    <div className="fw-bold" style={{ fontSize: "1.75rem" }}>{completedAssignments}</div>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center" style={{ background: "#ffd4d4", color: "#b32424" }}>
                    <h5 className="mb-2">Overdue Assignments</h5>
                    <div className="fw-bold" style={{ fontSize: "1.75rem" }}>{overdueAssignments}</div>
                </Card>
            </Col>
        </Row>
    );
}
