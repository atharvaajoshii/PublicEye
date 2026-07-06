import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";

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
            alert("Officer assigned successfully");
        } catch (err) {
            console.log(err);
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
            <div className="flex justify-center items-center h-96">
                Loading...
            </div>
        );

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Issue Management
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {/* Left */}

                <div className="col-span-2 bg-white rounded shadow overflow-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">
                                    Actions
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {issues.map((issue) => (

                                <tr
                                    key={issue._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {issue.title}
                                    </td>

                                    <td className="p-3">
                                        {issue.category}
                                    </td>

                                    <td className="p-3">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm
                                            ${issue.status === "Resolved"
                                                    ? "bg-green-100 text-green-700"
                                                    : issue.status === "Assigned"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {issue.status}
                                        </span>

                                    </td>

                                    <td className="p-3 flex justify-center gap-2">

                                        <button
                                            onClick={() =>
                                                handleView(issue._id)
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(issue._id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
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

                <div className="bg-white rounded shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
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

                            <div className="mt-6">

                                <label className="font-semibold">
                                    Assign Officer
                                </label>

                                <select
                                    value={selectedOfficer}
                                    onChange={(e) =>
                                        setSelectedOfficer(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded p-2 mt-2"
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
                                    className={`mt-4 w-full py-2 rounded text-white ${selectedIssue.status === "Resolved"
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {selectedIssue.status === "Assigned"
                                        ? "Reassign Officer"
                                        : "Assign Officer"}
                                </button>

                            </div>

                        </>
                    ) : (
                        <p className="text-gray-500">
                            Select an issue to view details.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default IssueManagement;