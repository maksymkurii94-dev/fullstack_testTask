import { memo } from "react";

function PartnerHeader({ partner, seatUsed }) {
  const seatPct =
    partner.seatAllocation > 0
      ? Math.min(100, Math.round((seatUsed / partner.seatAllocation) * 100))
      : 0;

  return (
    <header className="partner-header">
      <div
        className="partner-header__avatar"
        style={{ backgroundColor: partner.brandColor }}
        aria-hidden
      >
        {partner.brandInitials}
      </div>
      <div className="partner-header__body">
        <p className="partner-header__eyebrow">Partner overview</p>
        <h1 className="partner-header__title">{partner.name}</h1>
        {partner.description ? (
          <p className="partner-header__desc">{partner.description}</p>
        ) : null}
        <div className="partner-header__meta">
          <span className="partner-header__state">{partner.state}</span>
          <span className="partner-header__seats">
            {seatUsed} / {partner.seatAllocation} seats
          </span>
        </div>
        <div className="partner-header__bar" role="presentation">
          <div
            className="partner-header__bar-fill"
            style={{
              width: `${seatPct}%`,
              backgroundColor: partner.brandColor,
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default memo(PartnerHeader);
