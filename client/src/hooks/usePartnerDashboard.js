import { useEffect, useState } from "react";
import { DEMO_AS_OF, fetchDashboard, fetchPartners } from "../api.js";

const initialState = {
  status: "loading",
  partners: [],
  dashboard: null,
  error: null,
};

export function usePartnerDashboard(slug) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!slug) return undefined;

    const controller = new AbortController();
    const { signal } = controller;

    setState((prev) => ({
      ...prev,
      status: "loading",
      error: null,
    }));

    Promise.all([
      fetchPartners({ signal }),
      fetchDashboard(slug, DEMO_AS_OF, { signal }),
    ])
      .then(([partners, dashboard]) => {
        setState({
          status: "success",
          partners,
          dashboard,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({
          status: "error",
          partners: [],
          dashboard: null,
          error: err.message ?? "Failed to load dashboard",
        });
      });

    return () => controller.abort();
  }, [slug]);

  return state;
}
