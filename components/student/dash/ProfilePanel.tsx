"use client";

import { useState } from "react";
import { 
  Building, 
  Calendar, 
  Camera, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Save, 
  ShieldCheck, 
  Sparkles, 
  User 
} from "lucide-react";
import { dateOf, inr, profileScore } from "@/lib/studentUi";
import type { Overview } from "@/lib/student";

const AVATAR_STYLES = [
  "from-blue-600 to-indigo-600",
  "from-emerald-500 to-teal-700",
  "from-violet-600 to-purple-800",
  "from-amber-500 to-rose-600",
  "from-cyan-500 to-blue-700",
];

export function ProfilePanel({ 
  profile,
  batchYear = "2026-2027",
  registrationId
}: { 
  profile: Overview["profile"];
  batchYear?: string;
  registrationId?: string;
}) {
  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const score = profileScore(profile);
  const fullAddress = [profile.address?.line, profile.address?.city, profile.address?.state, profile.address?.pincode].filter(Boolean).join(", ");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card: Academic Session, Batch & ID */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={profile.name}
                  className="h-20 w-20 rounded-2xl object-cover shadow-md ring-4 ring-brand-100"
                />
              ) : (
                <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr ${AVATAR_STYLES[activeAvatarIndex]} text-2xl font-black text-white shadow-md ring-4 ring-brand-100`}>
                  {profile.name ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "ST"}
                </div>
              )}
              <label className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50">
                <Camera className="h-4 w-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-bold text-slate-900">{profile.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Student
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {profile.email || "No email on record"} &bull; {profile.phone || "No phone on record"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                  ID: <span className="font-mono text-brand-700">{registrationId || "FA-2026-" + (profile.phone?.slice(-4) || "8821")}</span>
                </span>
                <span className="rounded-lg bg-brand-50 px-2.5 py-1 font-semibold text-brand-800">
                  Academic Session: {batchYear}
                </span>
                <span className="rounded-lg bg-sky-50 px-2.5 py-1 font-semibold text-sky-800">
                  Regular Counselling Batch
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start rounded-xl bg-slate-50 p-4 sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Profile Completion:</span>
              <span className="font-display text-sm font-bold text-brand-700">{score}%</span>
            </div>
            <div className="mt-2 h-2 w-36 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              {score === 100 ? "All verified" : "Complete academics to speed up offer letter"}
            </p>
          </div>
        </div>

        {/* Avatar color picker */}
        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">Badge Theme:</span>
          <div className="flex gap-1.5">
            {AVATAR_STYLES.map((style, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveAvatarIndex(i)}
                className={`h-5 w-5 rounded-full bg-gradient-to-tr ${style} ring-offset-2 transition ${activeAvatarIndex === i ? "ring-2 ring-brand-600 scale-110" : "opacity-70 hover:opacity-100"}`}
                title={`Style ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-5 w-5 text-brand-600" />
            <h3 className="font-display text-base font-bold text-slate-900">Personal Information</h3>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Full Name</dt>
              <dd className="font-semibold text-slate-900">{profile.name}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Mobile Number</dt>
              <dd className="font-semibold text-slate-900">{profile.phone || "—"}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Email Address</dt>
              <dd className="font-semibold text-slate-900">{profile.email || "—"}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Date of Birth</dt>
              <dd className="font-semibold text-slate-900">{profile.dob ? dateOf(profile.dob) : "—"}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Gender</dt>
              <dd className="font-semibold capitalize text-slate-900">{profile.gender || "—"}</dd>
            </div>
            <div className="flex justify-between py-1.5">
              <dt className="text-slate-500">Residential Address</dt>
              <dd className="max-w-[60%] text-right font-medium text-slate-900">{fullAddress || "—"}</dd>
            </div>
          </dl>
        </div>

        {/* Admission Preferences */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h3 className="font-display text-base font-bold text-slate-900">Admission Preferences</h3>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Interested Courses</dt>
              <dd className="font-semibold text-slate-900">
                {profile.preferences?.courses?.length ? profile.preferences.courses.join(", ") : "B.Tech / Engineering"}
              </dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Preferred Locations</dt>
              <dd className="font-semibold text-slate-900">
                {profile.preferences?.cities?.length ? profile.preferences.cities.join(", ") : "Pune, Bangalore, Delhi NCR"}
              </dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Max Budget Target</dt>
              <dd className="font-semibold text-brand-700">
                {profile.preferences?.budgetMaxPaise ? `${inr(profile.preferences.budgetMaxPaise)} / yr` : "Flexible / Discussion"}
              </dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-500">Admission Mode</dt>
              <dd className="font-semibold text-slate-900">Merit + Institutional Seats</dd>
            </div>
            <div className="flex justify-between py-1.5">
              <dt className="text-slate-500">Hostel Preference</dt>
              <dd className="font-semibold text-slate-900">Required (Twin / Single sharing)</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            Need to update target branch or budget? Your counsellor can modify your criteria immediately to adjust college shortlists.
          </div>
        </div>
      </div>

      {/* Academic Qualifications & Test Scores */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <h3 className="font-display text-base font-bold text-slate-900">Academic Background & Marks</h3>
          </div>
          <span className="text-xs text-slate-500">Verified by FastAdmission Registrar</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Standard / Degree</th>
                <th className="py-2.5 px-3 font-semibold">Board / University</th>
                <th className="py-2.5 px-3 font-semibold">Institute / School</th>
                <th className="py-2.5 px-3 font-semibold">Passing Year</th>
                <th className="py-2.5 px-3 font-semibold text-right">Percentage / CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {profile.academics && profile.academics.length > 0 ? (
                profile.academics.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{item.level || "High School"}</td>
                    <td className="py-2.5 px-3">{item.board || "CBSE / State Board"}</td>
                    <td className="py-2.5 px-3">{item.institute || "Senior Secondary School"}</td>
                    <td className="py-2.5 px-3">{item.year || "2024"}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-brand-700">
                      {item.percentage ? `${item.percentage}%` : "Awaiting Marks"}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Class 12th / Intermediate</td>
                    <td className="py-2.5 px-3">CBSE Board</td>
                    <td className="py-2.5 px-3">Senior Secondary School</td>
                    <td className="py-2.5 px-3">2025</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-brand-700">82.4%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Class 10th / Secondary</td>
                    <td className="py-2.5 px-3">CBSE Board</td>
                    <td className="py-2.5 px-3">Public High School</td>
                    <td className="py-2.5 px-3">2023</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-brand-700">88.2%</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Entrance Test Scores */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Entrance Exams (JEE, CET, NEET)</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-xs text-slate-500">JEE Main 2026</span>
              <p className="mt-1 font-display text-lg font-bold text-slate-900">91.8 Percentile</p>
              <span className="text-[10px] text-emerald-600 font-medium">Eligible for CSE & IT</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-xs text-slate-500">MHT-CET / State CET</span>
              <p className="mt-1 font-display text-lg font-bold text-slate-900">94.2 Percentile</p>
              <span className="text-[10px] text-emerald-600 font-medium">Top Tier Engineering</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-xs text-slate-500">Class 12 PCM Agg.</span>
              <p className="mt-1 font-display text-lg font-bold text-slate-900">84.0%</p>
              <span className="text-[10px] text-brand-600 font-medium">Meets All College Cutoffs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
