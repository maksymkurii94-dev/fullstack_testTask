import { Router } from "express";
import { loadCollection } from "../lib/loadJson.js";
import {
  buildPartnerDashboard,
  getPartnerBySlug,
} from "../services/partnerDashboardService.js";

const router = Router();

router.get("/partners", (_req, res) => {
  res.json(loadCollection("partners"));
});

router.get("/partners/:slug", (req, res) => {
  const partner = getPartnerBySlug(req.params.slug);
  if (!partner) {
    return res.status(404).json({ error: "Partner not found" });
  }
  res.json(partner);
});

router.get("/partners/:slug/dashboard", (req, res) => {
  const dashboard = buildPartnerDashboard(
    req.params.slug,
    req.query.asOf,
  );
  if (!dashboard) {
    return res.status(404).json({ error: "Partner not found" });
  }
  res.json(dashboard);
});

router.get("/users", (_req, res) => {
  res.json(loadCollection("users"));
});

router.get("/user-packages", (_req, res) => {
  res.json(loadCollection("userPackages"));
});

router.get("/user-courses", (_req, res) => {
  res.json(loadCollection("userCourses"));
});

router.get("/orders", (_req, res) => {
  res.json(loadCollection("orders"));
});

router.get("/packages", (_req, res) => {
  res.json(loadCollection("packages"));
});

export default router;
