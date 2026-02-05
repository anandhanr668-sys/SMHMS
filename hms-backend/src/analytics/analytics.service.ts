// src/analytics/analytics.service.ts

import { AnalyticsMetric } from "./analytics.model.js";

export const analyticsService = {
  collect: (name: string, value: number): AnalyticsMetric => {
    const metric: AnalyticsMetric = {
      name,
      value,
      collectedAt: new Date().toISOString()
    };

    // Placeholder: later push to DB / BI system
    console.log("📊 ANALYTICS:", metric);

    return metric;
  }
};
