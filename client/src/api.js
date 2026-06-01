export const DEMO_AS_OF = "2026-05-31";

async function parseJson(res) {
  if (!res.ok) {
    const message =
      res.status === 404 ? "Partner not found" : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return res.json();
}

export async function fetchPartners({ signal } = {}) {
  const res = await fetch("/api/partners", { signal });
  return parseJson(res);
}

export async function fetchDashboard(slug, asOf = DEMO_AS_OF, { signal } = {}) {
  const params = new URLSearchParams({ asOf });
  const res = await fetch(`/api/partners/${slug}/dashboard?${params}`, {
    signal,
  });
  return parseJson(res);
}
