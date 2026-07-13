import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import Sidebar from "../../components/Sidebar";
import toast from 'react-hot-toast';

function Reports() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await adminService.getAllReports();
            setReports(res.data.reports);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await adminService.getReportById(id);
            setSelectedReport(res.data.report);
        } catch (err) {
            console.log(err);
        }
    };

    const handleApprove = async () => {
        if (!selectedReport) return;

        try {
            await adminService.approveReport(selectedReport._id);
            await fetchReports();
            setSelectedReport(null);
            toast.success("Report approved successfully");
        } catch (err) {
            console.log(err);
            toast.error("failed to approve")
        }
    };

    const handleReject = async () => {
        if (!selectedReport) return;

        try {
            await adminService.rejectReport(selectedReport._id);
            await fetchReports();
            setSelectedReport(null);
            toast.success("Report rejected successfully");
        } catch (err) {
            console.log(err);
            toast.error("failed to reject")
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Sidebar />
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">
            <Sidebar />
            <h1 className="text-3xl font-bold mb-6">
                Report Management
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {/* Reports Table */}

                <div className="col-span-2 bg-white rounded-lg shadow overflow-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Issue</th>
                                <th className="p-3 text-left">Officer</th>
                                <th className="p-3 text-left">Reason</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {reports.map((report) => (

                                <tr
                                    key={report._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {report.issue?.title}
                                    </td>

                                    <td className="p-3">
                                        {report.officer?.name}
                                    </td>

                                    <td className="p-3">
                                        {report.reason}
                                    </td>

                                    <td className="p-3">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${report.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : report.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {report.status}
                                        </span>

                                    </td>

                                    <td className="p-3 text-center">

                                        <button
                                            onClick={() =>
                                                handleView(report._id)
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Report Details */}

                <div className="bg-white rounded-lg shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Report Details
                    </h2>

                    {selectedReport ? (
                        <>

                            <p>
                                <strong>Issue:</strong>{" "}
                                {selectedReport.issue?.title}
                            </p>

                            <p className="mt-2">
                                <strong>Description:</strong>{" "}
                                {selectedReport.issue?.description}
                            </p>

                            <p className="mt-2">
                                <strong>Officer:</strong>{" "}
                                {selectedReport.officer?.name}
                            </p>

                            <p className="mt-2">
                                <strong>Email:</strong>{" "}
                                {selectedReport.officer?.email}
                            </p>

                            <p className="mt-2">
                                <strong>Reason:</strong>{" "}
                                {selectedReport.reason}
                            </p>

                            <p className="mt-2">
                                <strong>Remarks:</strong>{" "}
                                {selectedReport.description || "-"}
                            </p>

                            <p className="mt-2">
                                <strong>Status:</strong>{" "}
                                {selectedReport.status}
                            </p>

                            <div className="mt-6 flex gap-3">

                                <button
                                    onClick={handleApprove}
                                    disabled={
                                        selectedReport.status !== "Pending"
                                    }
                                    className={`flex-1 py-2 rounded text-white ${selectedReport.status !== "Pending"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={handleReject}
                                    disabled={
                                        selectedReport.status !== "Pending"
                                    }
                                    className={`flex-1 py-2 rounded text-white ${selectedReport.status !== "Pending"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    Reject
                                </button>

                            </div>

                        </>
                    ) : (
                        <p className="text-gray-500">
                            Select a report to view details.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Reports;