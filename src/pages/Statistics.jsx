import assignmentsData from "../data/assignmentsData";
import NextAssignmentCard from "../components/nextAssignmentCard";
import StatCard from "../components/StatCard";
import StatPieChart from "../components/StatPieChart";

export default function Statistics() {
    const statusOrder = ["in-progress", "todo", "done"];

    const formatDate = (date) => {
        if (!date) return new Date(0);
        const parts = date.replace(/\/$/, "").split("/");
        const [month, day, year] = parts;
        return new Date(`${year}-${month}-${day}`);
    };

    //sorting
    const sortedAssignments = statusOrder
        .map((status) =>
            assignmentsData
                .filter((a) => a.status === status)
                .sort((a, b) => formatDate(a.duedate) - formatDate(b.duedate))
        )
        .flat();

    const nextAssignment = sortedAssignments.find(
        (a) => a.status === "in-progress" || a.status === "todo"
    );

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    //summary stats
    const totalAssignments = assignmentsData.length;
    const completedAssignments = assignmentsData.filter(
        (a) => a.status === "done"
    ).length;

    const assignmentsDueThisWeek = assignmentsData.filter((a) => {
        const due = formatDate(a.duedate);
        return due >= today && due <= nextWeek && a.status !== "done";
    }).length;

    const overdueAssignments = assignmentsData.filter((a) => {
        const due = formatDate(a.duedate);
        return due < today && a.status !== "done";
    }).length;

    //data for amount of itme studied 
    const studyTimeByCourse = {};
    assignmentsData.forEach((a) => {
        if (!a.course || !a.studyTime) return;
        if (!studyTimeByCourse[a.course]) studyTimeByCourse[a.course] = 0;
        studyTimeByCourse[a.course] += a.studyTime;
    });

    const pieChartData = Object.entries(studyTimeByCourse).map(
        ([course, time]) => ({ course, time })
    );

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
            <h1>Statistics!</h1>

            {nextAssignment ? (
                <NextAssignmentCard {...nextAssignment} />
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

            {pieChartData.length > 0 ? (
                <StatPieChart data={pieChartData} />
            ) : (
                <p style={{ marginTop: "40px" }}>
                    Sorry, you haven't studied anything yet!
                </p>
            )}
        </div>
    );
}
