import React, { useState, useEffect } from "react";
import { patientsApi } from "@/api/v1/patients.api";
import { visitsApi } from "@/api/v1/visits.api";
import { reportsApi } from "@/api/v1/reports.api";

interface MetricCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  description: string;
}

// Demo data
const DEMO_PATIENTS = [
  { id: "p-1", firstName: "Ravi", lastName: "Kumar", gender: "Male" },
  { id: "p-2", firstName: "Priya", lastName: "Singh", gender: "Female" },
  { id: "p-3", firstName: "Amitesh", lastName: "Sharma", gender: "Male" },
  { id: "p-4", firstName: "Neha", lastName: "Patel", gender: "Female" },
];

const DEMO_VISITS = [
  {
    id: "v-1",
    patientId: "p-1",
    patientName: "Ravi Kumar",
    visitDate: new Date(2026, 1, 6),
    status: "ONGOING",
  },
  {
    id: "v-2",
    patientId: "p-2",
    patientName: "Priya Singh",
    visitDate: new Date(2026, 1, 5),
    status: "COMPLETED",
  },
  {
    id: "v-3",
    patientId: "p-3",
    patientName: "Amitesh Sharma",
    visitDate: new Date(2026, 1, 4),
    status: "SCHEDULED",
  },
];

const DEMO_REPORTS = [
  { id: "r-1", visitId: "v-1", templateVersion: "1.0", createdAt: new Date(2026, 1, 6) },
  { id: "r-2", visitId: "v-2", templateVersion: "1.0", createdAt: new Date(2026, 1, 5) },
  { id: "r-3", visitId: "v-3", templateVersion: "2.0", createdAt: new Date(2026, 1, 4) },
];

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch data
        let patients = DEMO_PATIENTS;
        let visits = DEMO_VISITS;
        let reports = DEMO_REPORTS;

        try {
          const patientsResponse = await patientsApi.getAll();
          patients = (patientsResponse as any) || DEMO_PATIENTS;
        } catch {
          patients = DEMO_PATIENTS;
        }

        try {
          const visitsResponse = await visitsApi.getAll();
          visits = (visitsResponse as any) || DEMO_VISITS;
        } catch {
          visits = DEMO_VISITS;
        }

        try {
          const reportsResponse = await reportsApi.getAll();
          reports = (reportsResponse as any) || DEMO_REPORTS;
        } catch {
          reports = DEMO_REPORTS;
        }

        // Calculate metrics
        const ongoingVisits = visits.filter((v) => v.status === "ONGOING").length;
        const totalPatients = patients.length;
        const pendingReports = visits.length - reports.length;
        const occupancyRate = Math.round((ongoingVisits / Math.max(totalPatients, 1)) * 100);

        const metricsData: MetricCard[] = [
          {
            title: "Total Patients",
            value: totalPatients,
            icon: "👥",
            color: "#3b82f6",
            description: "Active patients in system",
          },
          {
            title: "Active Visits",
            value: ongoingVisits,
            icon: "🏥",
            color: "#10b981",
            description: "Ongoing visits TODAY",
          },
          {
            title: "Pending Reports",
            value: pendingReports,
            icon: "📄",
            color: "#f59e0b",
            description: "Reports awaiting completion",
          },
          {
            title: "Occupancy Rate",
            value: `${occupancyRate}%`,
            icon: "🛏️",
            color: "#8b5cf6",
            description: "Current bed utilization",
          },
          {
            title: "Revenue (This Month)",
            value: "$45,840",
            icon: "💳",
            color: "#ec4899",
            description: "Total billing amount",
          },
          {
            title: "Staff Count",
            value: "220",
            icon: "👨‍⚕️",
            color: "#06b6d4",
            description: "Total staff members",
          },
        ];

        setMetrics(metricsData);

        // Set recent data (sorted by date descending)
        const sorted_visits = visits
          .sort(
            (a, b) =>
              new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
          )
          .slice(0, 5);
        setRecentVisits(sorted_visits);

        const sorted_patients = patients.slice(0, 5);
        setRecentPatients(sorted_patients);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#1f2937", fontSize: "28px" }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, color: "#666" }}>
          Welcome back! Here's your hospital overview.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              borderLeft: `4px solid ${metric.color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "14px" }}>
                  {metric.title}
                </p>
                <h2 style={{ margin: "0 0 5px 0", color: "#1f2937", fontSize: "32px" }}>
                  {metric.value}
                </h2>
                <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>
                  {metric.description}
                </p>
              </div>
              <div style={{ fontSize: "40px" }}>{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Data Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Recent Visits */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", color: "#1f2937" }}>Recent Visits</h3>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Patient
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentVisits.map((visit) => (
                  <tr key={visit.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px", color: "#1f2937" }}>
                      {visit.patientName}
                    </td>
                    <td style={{ padding: "10px", color: "#666" }}>
                      {new Date(visit.visitDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          backgroundColor:
                            visit.status === "ONGOING"
                              ? "#dcfce7"
                              : visit.status === "COMPLETED"
                              ? "#e0e7ff"
                              : "#fef3c7",
                          color:
                            visit.status === "ONGOING"
                              ? "#166534"
                              : visit.status === "COMPLETED"
                              ? "#312e81"
                              : "#92400e",
                        }}
                      >
                        {visit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Patients */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", color: "#1f2937" }}>Recent Patients</h3>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Gender
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px", color: "#1f2937" }}>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td style={{ padding: "10px", color: "#666" }}>
                      {patient.gender}
                    </td>
                    <td style={{ padding: "10px", color: "#666" }}>
                      {patient.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
