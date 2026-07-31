"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createStudent } from "@/services/studentService";
import { Student } from "@/types/student";

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError(null);
    try {
      await createStudent(formData);
      router.push("/students");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create student. Please check input values.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none placeholder-blue-300 transition-all";
  const labelClass = "block text-sm font-semibold text-indigo-700 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-800">Add New Student</h1>
          <p className="text-sm text-indigo-400 mt-0.5">
            Fill in the details below to register a new student.
          </p>
        </div>
        <Link
          href="/students"
          className="text-sm text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 transition-colors font-medium"
        >
          ← Back
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          ⚠️ {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-indigo-100 rounded-2xl p-6 space-y-5 shadow-sm shadow-indigo-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Student ID *</label>
            <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange} placeholder="e.g. STU1001" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Full Name *</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input type="email" name="emailAddress" required value={formData.emailAddress} onChange={handleChange} placeholder="john@example.com" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input type="text" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} placeholder="+1 234 567 890" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Course *</label>
            <input type="text" name="course" required value={formData.course} onChange={handleChange} placeholder="Computer Science" className={inputClass} />
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
          <textarea name="address" rows={3} required value={formData.address} onChange={handleChange} placeholder="123 Main St, City, Country" className={inputClass}></textarea>
        </div>

        <div className="pt-3 flex justify-end gap-3 border-t border-indigo-50">
          <Link
            href="/students"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-md shadow-indigo-200 text-sm font-semibold transition-all active:scale-95"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
