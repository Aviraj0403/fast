import { attribution } from "./attribution";
import { PLATFORM } from "./site";
import { visitorId } from "./tracker";

/** Student sign-in and dashboard talk straight to the counsellor platform (same organisation as the leads). */
const API = `${PLATFORM.apiUrl}`;
const KEY = "fa_student_token";

export const getToken = (): string | null => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
export const setToken = (t: string | null) => {
  try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch { /* storage blocked */ }
};

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function call<T>(path: string, init: RequestInit = {}, token?: string | null): Promise<T> {
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...(init.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data?.message || data?.error?.message || "Something went wrong. Please try again.");
  return data as T;
}

export type RegisterInput = { name: string; phone: string; email: string; city?: string; interestedCourse?: string; consent: true; company_url?: string };

export const registerStudent = (v: RegisterInput) => {
  const t = attribution();
  return call<{ ok: boolean; loginEmailed: boolean }>(`/public/student-portal/${PLATFORM.tenantSlug}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...v, visitorId: visitorId() || undefined, utmCampaign: t.campaign }),
  });
};

export const loginStudent = async (email: string, password: string) => {
  const r = await call<{ token?: string; mfaRequired?: boolean; user?: { role: string } }>(`/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (r.mfaRequired || !r.token) throw new ApiError(400, "This account needs extra verification. Please use the counsellor portal.");
  if (r.user?.role !== "student") throw new ApiError(403, "This login is for students. Staff should use the admin portal.");
  setToken(r.token);
};

export const changePassword = (currentPassword: string, newPassword: string) =>
  call<{ token?: string }>(`/api/v1/auth/change-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) }, getToken()).then((r) => { if (r.token) setToken(r.token); });

export type Doc = { id: string; type: string; fileName?: string; status: string; rejectReason?: string; uploadedAt: string; superseded: boolean };
export type Application = {
  id: string; collegeName?: string; courseName?: string; status: string;
  statusHistory?: { to?: string; status?: string; at?: string }[];
  checklist?: { type: string; label: string; mandatory: boolean; state: string }[];
};
export type Overview = {
  profile: { name: string; email?: string; phone?: string };
  applications: Application[];
  documents: Doc[];
  counsellor: { name: string } | null;
};

export const overview = () => call<Overview>(`/api/v1/portal/student/overview`, {}, getToken());

export const uploadDocument = (type: string, file: File, label?: string) =>
  call<Doc>(`/api/v1/portal/student/documents?type=${encodeURIComponent(type)}${label ? `&label=${encodeURIComponent(label)}` : ""}`, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream", "x-file-name": file.name },
    body: file,
  }, getToken());

/** The documents almost every admission asks for. "other" takes anything else (caste certificate, migration, etc.). */
export const DOC_TYPES: { type: string; label: string }[] = [
  { type: "marksheet_10", label: "10th marksheet" },
  { type: "marksheet_12", label: "12th marksheet" },
  { type: "aadhaar", label: "Aadhaar card" },
  { type: "photo", label: "Passport photo" },
  { type: "other", label: "Other document" },
];
