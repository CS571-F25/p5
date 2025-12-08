import React, { useState, useEffect } from "react";
import NextAssignmentCard from "../components/NextAssignmentCard";
import StatCard from "../components/StatCard";

export default function Statistics() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState("");

    const statusOrder = ["in-progress", "todo", "done"];

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const [month, day, year] = date.replace(/\/$/, "").split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/assignments", {
            method: "GET",
            headers: { "X-CS571-ID": CS571.getBadgerId() },
        })
            .then((res) => res.json())
            .then((data) => {
                const assignmentsArray = Object.entries(data.results).map(([id, a]) => ({
                    id,
                    ...a,
                }));
                setAssignments(assignmentsArray);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const sortedAssignments = statusOrder
        .map((status) =>
            assignments
                .filter((a) => a && a.status === status)
                .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))
        )
        .flat();

    const nextAssignment = sortedAssignments.find(
        (a) => a.status === "in-progress" || a.status === "todo"
    );

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

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

    useEffect(() => {
        if (!nextAssignment) return;

        const interval = setInterval(() => {
            const now = new Date();
            const due = formatDate(nextAssignment.duedate);
            const diff = due - now;

            if (diff <= 0) {
                setCountdown("Due today!");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [nextAssignment]);

    if (loading) {
        return (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <h1>Statistics</h1>
                <p>Loading assignments...</p>
            </div>
        );
    }

    if (!assignments || assignments.length === 0) {
        return (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <h1>Statistics</h1>
                <p>No assignments available.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <h1>Statistics</h1>

            {nextAssignment ? (
                <NextAssignmentCard {...nextAssignment}>
                    <p style={{ marginTop: "10px" }}>
                        Countdown: <strong>{countdown}</strong>
                    </p>
                </NextAssignmentCard>
            ) : (
                <p>No upcoming assignments!</p>
            )}

            <div
                style={{
                    marginTop: "40px",
                    width: "100%",
                    maxWidth: "900px",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                <StatCard title="Total Assignments" value={totalAssignments} />
                <StatCard title="Completed" value={completedAssignments} />
                <StatCard title="Due This Week" value={assignmentsDueThisWeek} />
                <StatCard title="Overdue" value={overdueAssignments} />
            </div>
        </div>
    );
}
