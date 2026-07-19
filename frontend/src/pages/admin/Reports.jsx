import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import "../../styles/atharva.css";
function Reports() {
	const [reports, setReports] = useState([]);
	const [selectedReport, setSelectedReport] = useState(null);
	const [loading, setLoading] = useState(true);
	const [expandedReport, setExpandedReport] = useState(null);

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
			if (expandedReport === id) {
				setExpandedReport(null);
				setSelectedReport(null);
				return;
			}

			const res = await adminService.getReportById(id);

			setExpandedReport(id);
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
			<div className="loading">
				Loading...
			</div>
		);
	}

	return (
		<div className="main user-management">
			<div className="content">
				<h1 className="page-title">
					Report Management
				</h1>

				<div className="issue-list">

					{reports.map((report) => (

						<div
							key={report._id}
							className={`issue-card ${expandedReport === report._id ? "expanded" : ""
								}`}
						>

							{/* Header */}

							<div
								className="issue-header"
								onClick={() => handleView(report._id)}
							>

								<div className="issue-header-left">

									<h3>
										{report.issue?.title || report.issueSnapshot?.title}
									</h3>

									<span className="issue-category">
										{report.reason}
									</span>

								</div>

								<div className="issue-header-right">

									<span
										className={`officer-status-badge ${report.status.toLowerCase()}`}
									>
										{report.status}
									</span>

									<span className="expand-icon">
										{expandedReport === report._id ? "−" : "+"}
									</span>

								</div>

							</div>

							<div
								className={`issue-details ${expandedReport === report._id ? "open" : ""
									}`}
							>

								{selectedReport?._id === report._id && (

									<>
										<div className="detail-grid">

											<div className="detail-item">
												<label>Issue</label>
												<span>
													{selectedReport.issue?.title || selectedReport.issueSnapshot?.title}
												</span>
											</div>

											<div className="detail-item">
												<label>Description</label>
												<span>
													{selectedReport.issue?.description || selectedReport.issueSnapshot?.description}
												</span>
											</div>

											<div className="detail-item">
												<label>Officer</label>
												<span>{selectedReport.officer?.name}</span>
											</div>

											<div className="detail-item">
												<label>Email</label>
												<span>{selectedReport.officer?.email}</span>
											</div>

											<div className="detail-item">
												<label>Reason</label>
												<span>{selectedReport.reason}</span>
											</div>

											<div className="detail-item">
												<label>Remarks</label>
												<span>{selectedReport.description || "-"}</span>
											</div>

											<div className="detail-item">
												<label>Status</label>
												<span>{selectedReport.status}</span>
											</div>

										</div>

										<div className="issue-actions">

											<button
												className={`officer-btn btn-primary ${selectedReport.status !== "Pending"
													? "disabled-btn"
													: ""
													}`}
												disabled={selectedReport.status !== "Pending"}
												onClick={handleApprove}
											>
												Approve
											</button>

											<button
												className={`officer-btn btn-danger ${selectedReport.status !== "Pending"
													? "disabled-btn"
													: ""
													}`}
												disabled={selectedReport.status !== "Pending"}
												onClick={handleReject}
											>
												Reject
											</button>

										</div>

									</>

								)}

							</div>

						</div>

					))}

				</div>
			</div>
		</div>
	);
}

export default Reports;