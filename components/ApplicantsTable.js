"use client";

import { useMemo, useState } from "react";
import ApplicantRow from "@/components/ApplicantRow";
import EmptyState from "@/components/EmptyState";

const STATUSES = ["All", "Applied", "Reviewing", "Shortlisted", "Interview", "Selected", "Rejected"];

export default function ApplicantsTable({ applications }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      const name = (app.profiles?.full_name || "").toLowerCase();
      const phone = app.profiles?.phone || "";
      const matchesQuery = query.trim() === "" || name.includes(query.toLowerCase()) || phone.includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [applications, query, statusFilter]);

  if (applications.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No applicants yet"
        message="Applications will show up here as candidates apply."
      />
    );
  }

  return (
    <>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="filter-search"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>
          ))}
        </select>
        <span className="filter-count">{filtered.length} of {applications.length}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Applied on</th>
                <th>Resume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <ApplicantRow key={app.id} application={app} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon="search" title="No matches" message="Try a different name, phone number, or status filter." />
      )}
    </>
  );
}
