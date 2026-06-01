import { memo } from "react";
import { useNavigate } from "react-router-dom";

function PartnerSelect({ partners, currentSlug }) {
  const navigate = useNavigate();

  return (
    <label className="partner-select">
      <span className="partner-select__label">Partner</span>
      <select
        className="partner-select__control"
        value={currentSlug}
        onChange={(e) => navigate(`/partner/${e.target.value}`)}
      >
        {partners.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default memo(PartnerSelect);
