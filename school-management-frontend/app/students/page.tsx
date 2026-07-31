"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudents, deleteStudent } from "@/services/studentService";
import { Student } from "@/types/student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (err: any) {
      setError(err.message || "Failed to connect to Spring Boot server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete student "${name}"?`)) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
      } catch (err: any) {
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Student Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            View, search, edit, and manage all registered student profiles.
          </p>
        </div>
        <Link
          href="/students/add"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 active:scale-95"
        >
          + Add New Student
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by ID, name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <span className="text-xs text-slate-400 px-3 py-1.5 bg-slate-800 rounded-md">
          Total: {filteredStudents.length}
        </span>
      </div>

      {/* Content State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
          Loading student data...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-slate-800/80">
          <p className="text-slate-400 text-lg font-medium">No students found</p>
          <p className="text-slate-500 text-sm mt-1">
            {searchTerm
              ? "Try adjusting your search query."
              : "Get started by adding your first student profile."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Full Name</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Gender / Age</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-medium text-indigo-400">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {student.emailAddress}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {student.gender} ({student.age} yrs)
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/students/${student.id}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/students/edit/${student.id}`}
                      className="px-3 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/50 text-indigo-300 text-xs font-medium rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(student.id!, student.fullName)
                      }
                      className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-400 text-xs font-medium rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}