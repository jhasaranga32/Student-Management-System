"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getStudentById, deleteStudent } from "@/services/studentService";
import { Student } from "@/types/student";

function StudentDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const data = await getStudentById(id);
      setStudent(data);
    } catch (err: any) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      student &&
      confirm(`Are you sure you want to delete student "${student.fullName}"?`)
    ) {
      try {
        await deleteStudent(id);
        router.push("/students");
      } catch (err: any) {
        alert("Failed to delete student.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
        Loading student record...
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
          ⚠️ {error || "Student record not found."}
        </div>
        <Link
          href="/students"
          className="inline-block text-sm text-indigo-400 hover:underline"
        >
          ← Back to Students List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-indigo-500/20">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {student.fullName}
            </h1>
            <p className="text-sm font-mono text-indigo-400">
              ID: {student.studentId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/students/edit?id=${id}`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-md transition-all"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-950/50 hover:bg-red-900/60 border border-red-900/50 text-red-400 font-medium text-sm rounded-xl transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Profile Info Details Grid */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
            Email Address
          </span>
          <p className="text-slate-200 font-medium">{student.emailAddress}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
            Phone Number
          </span>
          <p className="text-slate-200 font-medium">{student.phoneNumber}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
            Enrolled Course
          </span>
          <p className="text-slate-200 font-medium">{student.course}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
            Age & Gender
          </span>
          <p className="text-slate-200 font-medium">
            {student.age} years old ({student.gender})
          </p>
        </div>

        <div className="md:col-span-2 space-y-1 pt-2 border-t border-slate-800/60">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
            Residential Address
          </span>
          <p className="text-slate-300 leading-relaxed">{student.address}</p>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Return to Student Directory
        </Link>
      </div>
    </div>
  );
}

export default function StudentDetailsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20 text-slate-400">Loading...</div>}>
      <StudentDetailsContent />
    </Suspense>
  );
}
