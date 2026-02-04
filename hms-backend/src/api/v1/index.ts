// src/api/v1/index.ts

import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import patientRoutes from "./patients.routes.js";
import visitRoutes from "./visits.routes.js";
import reportRoutes from "./reports.routes.js";
import formRoutes from "./forms.routes.js";
import reportTemplateRoutes from "./reportTemplates.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/patients", patientRoutes);
router.use("/visits", visitRoutes);
router.use("/reports", reportRoutes);
router.use("/forms", formRoutes);
router.use("/report-templates", reportTemplateRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
