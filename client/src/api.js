
export const DEMO_AS_OF = "2026-05-31";

export async function fetchPartners() {
  const res = await fetch("/api/partners");
  if (!res.ok) throw new Error("Failed to load partners");
  return res.json();
}

export async function fetchDashboard(slug, asOf = DEMO_AS_OF) {
  const params = new URLSearchParams({ asOf });
  const res = await fetch(`/api/partners/${slug}/dashboard?${params}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Partner not found");
    throw new Error("Failed to load dashboard");
  }
  return res.json();
}
