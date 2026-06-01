import { Navigate, Route, Routes } from "react-router-dom";
import PartnerDashboardPage from "./pages/PartnerDashboardPage.jsx";

const DEFAULT_SLUG = "vanguard-realty";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/partner/${DEFAULT_SLUG}`} replace />} />
      <Route path="/partner/:slug" element={<PartnerDashboardPage />} />
      <Route path="*" element={<Navigate to={`/partner/${DEFAULT_SLUG}`} replace />} />
    </Routes>
  );
}
