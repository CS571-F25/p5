import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StatPieChart({ data }) {
    return (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
            <h3>Study Time Breakdown</h3>

            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    dataKey="time"
                    nameKey="course"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
