import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import Sidebar from "../../components/Sidebar";
import toast from 'react-hot-toast';

function IssueManagement() {
    const [issues, setIssues] = useState([]);
    const [officers, setOfficers] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedOfficer, setSelectedOfficer] = useState("");
    const [loading, setLoading] = useState(true);
    const [issueTrack, setIssueTrack] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [issueRes, officerRes] = await Promise.all([
                adminService.getAllIssues(),
                adminService.getAllOfficers(),
            ]);

            setIssues(issueRes.data.issues);
            setOfficers(officerRes.data.officers);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await adminService.getIssueById(id);

            setSelectedIssue(res.data.issue);
            setIssueTrack(res.data.issueTrack);

            setSelectedOfficer(
                res.data.issueTrack?.officer?._id || ""
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleAssign = async () => {
        if (!selectedOfficer || !selectedIssue) return;

        try {
            if (selectedIssue.status === "Assigned") {
                await adminService.reassignOfficer(
                    selectedIssue._id,
                    selectedOfficer
                );
            } else {
                await adminService.assignOfficer(
                    selectedIssue._id,
                    selectedOfficer
                );
            }
            await fetchData();
            await handleView(selectedIssue._id);
            toast.success("Officer assigned successfully");
        } catch (err) {
            console.log(err);
            toast.error("error assigning officer")
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this issue?")) return;

        try {
            await adminService.deleteIssue(id);

            setIssueTrack(null);
            setSelectedOfficer("");
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };
    if (loading)
        return (
            <div>
                <Sidebar/>
                Loading...
            </div>
        );

    return (
        <div className="p-6">
            <Sidebar/>
            <h1 className="text-3xl font-bold mb-6">
                Issue Management
            </h1>
            <div className="grid grid-cols-3 gap-6">
                {/* Left */}
                <div>

                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>
                                    Actions
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {issues.map((issue) => (
                                <tr key={issue._id}>
                                    <td>
                                        {issue.title}
                                    </td>
                                    <td>
                                        {issue.category}
                                    </td>
                                    <td>

                                        <span>
                                            {issue.status}
                                        </span>

                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleView(issue._id)
                                            }
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(issue._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Right */}
                <div>
                    <h2>
                        Issue Details
                    </h2>
                    {selectedIssue ? (
                        <>
                            <p>
                                <strong>Title:</strong>{" "}
                                {selectedIssue.title}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {selectedIssue.description}
                            </p>
                            <p>
                                <strong>Category:</strong>{" "}
                                {selectedIssue.category}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {selectedIssue.status}
                            </p>
                            <p>
                                <strong>Assigned Officer:</strong>{" "}
                                {issueTrack?.officer?.name || "Not Assigned"}
                            </p>
                            <p>
                                <strong>Officer Email:</strong>{" "}
                                {issueTrack?.officer?.email || "-"}
                            </p>
                            <p>
                                <strong>Location:</strong>{" "}
                                {selectedIssue.location}
                            </p>
                            <div>
                                <label>
                                    Assign Officer
                                </label>
                                <select
                                    value={selectedOfficer}
                                    onChange={(e) =>
                                        setSelectedOfficer(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Officer
                                    </option>
                                    {officers.map((officer) => (
                                        <option
                                            key={officer._id}
                                            value={officer._id}
                                        >
                                            {officer.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAssign}
                                    disabled={selectedIssue.status === "Resolved"}
                                >
                                    {selectedIssue.status === "Assigned"
                                        ? "Reassign Officer"
                                        : "Assign Officer"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>
                            Select an issue to view details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default IssueManagement;