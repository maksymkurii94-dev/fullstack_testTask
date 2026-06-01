import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import PartnerHeader from "../components/PartnerHeader.jsx";
import PartnerSelect from "../components/PartnerSelect.jsx";
import RecentActivityTable from "../components/RecentActivityTable.jsx";
import StatCard from "../components/StatCard.jsx";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard.js";
import {
  formatCurrency,
  formatDate,
  formatPercent,
} from "../utils/format.js";

export default function PartnerDashboardPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { status, partners, dashboard, error } = usePartnerDashboard(slug);

  const brandStyle = useMemo(() => {
    if (!dashboard?.partner?.brandColor) return undefined;
    return { "--partner-accent": dashboard.partner.brandColor };
  }, [dashboard?.partner?.brandColor]);

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error" || !dashboard) {
    return (
      <ErrorState
        message={error ?? "Unknown error"}
        onRetry={() => navigate(0)}
      />
    );
  }

  const { partner, stats, recentActivity } = dashboard;

  return (
    <div className="dashboard" style={brandStyle}>
      <div className="dashboard__grain" aria-hidden />

      <nav className="dashboard__top">
        <a className="dashboard__logo" href="/">
          RealEstateU
        </a>
        {partners.length > 0 ? (
          <PartnerSelect partners={partners} currentSlug={slug} />
        ) : null}
      </nav>

      <PartnerHeader
        partner={partner}
        seatUsed={stats.studentsEnrolled}
      />

      <section className="stats-grid" aria-label="Partner statistics">
        <StatCard
          label="Students enrolled"
          value={stats.studentsEnrolled}
          hint="Total learners under this partner"
          delay={0}
        />
        <StatCard
          label="Active CE agents"
          value={stats.activeCeAgents}
          hint="Licensed agents with active enrollments"
          delay={60}
        />
        <StatCard
          label="Commission (MTD)"
          value={formatCurrency(stats.commissionMtd, true)}
          hint={`As of ${formatDate(stats.asOf)} · ${partner.commissionRate}% rate`}
          delay={120}
        />
        <StatCard
          label="Course completions"
          value={stats.courseCompletions}
          hint={`${formatPercent(stats.completionRate)} completion rate · ${stats.totalCourses} courses`}
          delay={180}
        />
      </section>

      <section className="activity-section">
        <div className="activity-section__head">
          <h2 className="activity-section__title">Recent student activity</h2>
          <p className="activity-section__sub">
            Latest enrollments and course progress
          </p>
        </div>
        <RecentActivityTable rows={recentActivity} />
      </section>
    </div>
  );
}
