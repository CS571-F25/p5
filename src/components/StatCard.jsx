import { Card } from "react-bootstrap";

export default function StatCard({ title, value }) {
    return (
        <Card className="text-center p-3 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-center">
            <h5 className="mb-2">{title}</h5>
            <div className="fw-bold" style={{ fontSize: "1.75rem" }}>
                {value}
            </div>
        </Card>
    );
}
