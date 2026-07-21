import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import "../../styles/atharva.css"
import IssueImage from "../../components/IssueImage";

function IssueManagement() {
	const [issues, setIssues] = useState([]);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [category, setCategory] = useState("");
	const [sort, setSort] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [officers, setOfficers] = useState([]);
	const [selectedIssue, setSelectedIssue] = useState(null);
	const [expandedIssue, setExpandedIssue] = useState(null);
	const [selectedOfficer, setSelectedOfficer] = useState("");
	const [loading, setLoading] = useState(true);
	const [issueTrack, setIssueTrack] = useState(null);

	const fetchData = async () => {
		try {
			setLoading(true);

			const [issueRes, officerRes] = await Promise.all([
				adminService.getAllIssues({ search: debouncedSearch, status, category, sort, }),
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
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);

		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		fetchData();
	}, [debouncedSearch, status, category, sort]);

	const handleView = async (id) => {
		try {
			const res = await adminService.getIssueById(id);

			if (expandedIssue === id) {
				setExpandedIssue(null);
				setSelectedIssue(null);
				setIssueTrack(null);
				return;
			}

			setExpandedIssue(id);
			setSelectedIssue(res.data.issue);
			setIssueTrack(res.data.issueTrack);
			setSelectedOfficer(res.data.issueTrack?.officer?._id || "");
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
			toast.error("error assigning officer", err)
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this issue?")) return;

		try {
			await adminService.deleteIssue(id);
			toast.success("Issue deleted successfully");
			setIssueTrack(null);
			setSelectedOfficer("");
			fetchData();
		} catch (err) {
			console.log(err);
			toast.error("error deleting Issue")
		}
	};
	if (loading)
		return (
			<div className="loading main">
				Loading...
			</div>
		);

	return (
		<div className="officer-dashboard-container">
			<h1 className="officer-dashboard-main-title">
				Issue Management
			</h1>

			{/* fiter here */}
			<div className="officer-filters-toolbar">
				<input
					type="search"
					className="officer-input-search"
					placeholder="Search Issues..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select
					className="officer-select-filter"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="">All Status</option>
					<option value="Pending">Pending</option>
					<option value="Assigned">Assigned</option>
					<option value="In Progress">In Progress</option>
					<option value="Resolved">Resolved</option>
					<option value="Rejected">Rejected</option>
				</select>

				<select
					className="officer-select-filter"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="">All Categories</option>
					<option value="Road">Road</option>
					<option value="Garbage">Garbage</option>
					<option value="Water">Water</option>
					<option value="Electricity">Electricity</option>
					<option value="Street Light">Street Light</option>
					<option value="Other">Other</option>
				</select>

				<select
					className="officer-select-filter"
					value={sort}
					onChange={(e) => setSort(e.target.value)}
				>
					<option value="">Sort By</option>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
					<option value="votes">Most Votes</option>
				</select>
			</div>

			<div className="issue-list">
				{issues.map((issue) => (
					<div
						key={issue._id}
						className={`issue-card ${expandedIssue === issue._id ? "expanded" : ""
							}`}
					>
						{/* Header */}
						<div
							className="issue-header"
							onClick={() => handleView(issue._id)}
						>
							<div className="issue-header-left">
								<h3>{issue.title}</h3>

								<span className="issue-category">
									{issue.category}
								</span>
							</div>

							<div className="issue-header-right">
								<span
									className={`officer-status-badge ${issue.status.toLowerCase()}`}
								>
									{issue.status}
								</span>

								<span className="expand-icon">
									{expandedIssue === issue._id ? "−" : "+"}
								</span>
							</div>
						</div>

						{/* Expanded Details */}
						<div
							className={`issue-details ${expandedIssue === issue._id ? "open" : ""
								}`}
						>
							{selectedIssue?._id === issue._id && (
								<>
									<div className="detail-grid">
										<div className="detail-item">
											<label>Description</label>
											<span>{selectedIssue.description}</span>
										</div>

										<div className="detail-item">
											<label>Location</label>
											<span>{selectedIssue.location}</span>
										</div>

										<div className="detail-item">
											<label>Assigned Officer</label>
											<span>
												{issueTrack?.officer?.name || "Not Assigned"}
											</span>
										</div>

										<div className="detail-item">
											<label>Email</label>
											<span>
												{issueTrack?.officer?.email || "-"}
											</span>
										</div>
									</div>
									<div className="detail-item">
										<label>Select Officer</label>

										<select
											value={selectedOfficer}
											onChange={(e) =>
												setSelectedOfficer(e.target.value)
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
									</div>
									<div className="issue-image-wrapper">
										<IssueImage issueId={selectedIssue._id} />
									</div>
									<div className="issue-actions">
										<button
											className="officer-btn btn-primary"
											onClick={handleAssign}
											disabled={
												["Resolved", "Rejected"].includes(selectedIssue.status)
											}
										>
											{selectedIssue.status === "Assigned"
												? "Reassign Officer"
												: "Assign Officer"}
										</button>

										<button
											className="officer-btn btn-danger"
											onClick={() =>
												handleDelete(selectedIssue._id)
											}
										>
											Delete
										</button>
									</div>
								</>
							)}
						</div>

					</div>
				))}
			</div>
		</div>
	);
}
export default IssueManagement;