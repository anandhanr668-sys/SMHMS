// src/api/v1/http.ts

import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach tenant + auth automatically
http.interceptors.request.use((config) => {
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("accessToken");

  if (tenantId) {
    config.headers["x-tenant-id"] = tenantId;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
