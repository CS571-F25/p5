import { Card } from "react-bootstrap";

export default function StatCard({ title, value }) {
    return (
        <Card
            style={{
                width: "200px",
                textAlign: "center",
                padding: "15px",
                borderRadius: "12px",
                margin: "10px",
                boxShadow: "0 2px 5px lightgray",
            }}
        >
            <h5 style={{ marginBottom: "10px" }}>{title}</h5>
            <h2 style={{ fontWeight: "bold" }}>{value}</h2>
        </Card>
    );
}
