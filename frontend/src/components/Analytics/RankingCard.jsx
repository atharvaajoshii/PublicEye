import React from "react";
import { useNavigate } from "react-router-dom";

function RankingCard({ title, data }) {
  const navigate = useNavigate();

  const rankedIssues = [...data]
  .filter((issue) => issue.votes > 0)   // Remove issues with 0 votes
  .sort((a, b) => b.votes - a.votes);   // Highest votes first

const maxVotes =
  rankedIssues.length > 0
    ? rankedIssues[0].votes
    : 1;

  return (
    <div className="chart-card ranking-card">
      <h3 className="chart-title">{title}</h3>

      <div className="ranking-list">
        {rankedIssues.map((issue, index) => {
          const percentage = (issue.votes / maxVotes) * 100;

          return (
            <div
              key={issue._id}
              className="ranking-item"
              onClick={() => navigate(`/issue/${issue._id}`)}
            >
              <div className="ranking-header">
                <div className="ranking-number">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </div>

                <div className="ranking-info">
                  <h4>{issue.title}</h4>

                  <span>{issue.votes} votes</span>
                </div>
              </div>

              <div className="ranking-progress">
                <div
                  className="ranking-progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RankingCard;
