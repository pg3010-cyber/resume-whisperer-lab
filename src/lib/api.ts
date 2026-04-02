import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({ baseURL: BASE_URL });

// Attach JWT from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rw_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Kick to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("rw_token");
      localStorage.removeItem("rw_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────
export const authApi = {
  login:  (email: string, password: string) =>
    api.post("/auth/login", { email, password }).then((r) => r.data),
  signup: (name: string, email: string, password: string) =>
    api.post("/auth/signup", { name, email, password }).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
};

// ─── Resume / Analysis ────────────────────────────────────────────────────
export const resumeApi = {
  analyze: (file: File, jdText = "", jobTitle = "", company = "") => {
    const form = new FormData();
    form.append("file", file);
    form.append("jd_text", jdText);
    form.append("job_title", jobTitle);
    form.append("company", company);
    return api.post("/resume/analyze", form).then((r) => r.data);
  },
  getHistory: () => api.get("/resume/history").then((r) => r.data),
  getAnalysis: (id: string) => api.get(`/resume/analysis/${id}`).then((r) => r.data),
};

// ─── Jobs ─────────────────────────────────────────────────────────────────
export const jobsApi = {
  analyzeJD: (payload: {
    title: string; company: string; location?: string;
    salary?: string; job_type?: string; description: string;
  }) => api.post("/jobs/analyze-jd", payload).then((r) => r.data),
  getSaved:  () => api.get("/jobs/saved").then((r) => r.data),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`).then((r) => r.data),
};

// ─── Dashboard ────────────────────────────────────────────────────────────
export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats").then((r) => r.data),
};