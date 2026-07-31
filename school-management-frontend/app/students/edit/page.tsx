"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getStudentById, updateStudent } from "@/services/studentService";
import { Student } from "@/types/student";

function EditStudentContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Student>({
    studentId: "",
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    course: "",
    age: 18,
    gender: "Male",
    address: "",
  });

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const data = await getStudentById(id);
      setFormData(data);
    } catch (err: any) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateStudent(id, formData);
      router.push("/students");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update student details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-indigo-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
        Loading student details...
      </div>
    );
  }

  const inputClass = "w-full bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all";
  const labelClass = "block text-sm font-semibold text-violet-700 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-violet-50 p-5 rounded-2xl border border-violet-100">
        <div>
          <h1 className="text-2xl font-bold text-violet-800">Edit Student Details</h1>
          <p className="text-sm text-violet-400 mt-0.5">
            Update the student record information below.
          </p>
        </div>
        <Link
          href="/students"
          className="text-sm text-violet-600 hover:text-violet-800 px-4 py-2 rounded-xl border border-violet-200 bg-white hover:bg-violet-50 transition-colors font-medium"
        >
          ← Cancel & Back
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          ⚠️ {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-violet-100 rounded-2xl p-6 space-y-5 shadow-sm shadow-violet-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Student ID *</label>
            <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Full Name *</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input type="email" name="emailAddress" required value={formData.emailAddress} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input type="text" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Course *</label>
            <input type="text" name="course" required value={formData.course} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Age *</label>
            <input type="number" name="age" min="1" required value={formData.age} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Address *</label>
          <textarea name="address" rows={3} required value={formData.address} onChange={handleChange} className={inputClass}></textarea>
        </div>

        <div className="pt-3 flex justify-end gap-3 border-t border-violet-50">
          <Link
            href="/students"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-md shadow-violet-200 text-sm font-semibold transition-all active:scale-95"
          >
            {saving ? "Updating..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditStudentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20 text-indigo-400">Loading...</div>}>
      <EditStudentContent />
    </Suspense>
  );
}
