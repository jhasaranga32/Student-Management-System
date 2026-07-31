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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Student Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View, search, edit, and manage all registered student profiles.
          </p>
        </div>
        <Link
          href="/students/add"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition-all active:scale-95"
        >
          + Add New Student
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by ID, name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 transition-colors"
          />
        </div>
        <span className="text-xs text-gray-500 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-200">
          Total: {filteredStudents.length}
        </span>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
          Loading student data...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-lg font-medium">No students found</p>
          <p className="text-gray-400 text-sm mt-1">
            {searchTerm
              ? "Try adjusting your search query."
              : "Get started by adding your first student profile."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Full Name</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Gender / Age</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-indigo-50/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-medium text-indigo-600">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {student.emailAddress}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {student.gender} ({student.age} yrs)
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/students/list?id=${student.id}`}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors border border-gray-200"
                    >
                      View
                    </Link>
                    <Link
                      href={`/students/edit?id=${student.id}`}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(student.id!, student.fullName)
                      }
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-medium rounded-lg transition-colors"
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