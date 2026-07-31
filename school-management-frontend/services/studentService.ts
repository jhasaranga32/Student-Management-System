import axios from "axios";
import {Student} from "@/types/student";


const API_URL =
"http://localhost:8080/api/students";


export const getStudents = async()=>{

    const response =
    await axios.get<Student[]>(API_URL);

    return response.data;

}



export const getStudentById = async (id: string) => {
  const response = await axios.get<Student>(`${API_URL}/${id}`);
  return response.data;
};

export const createStudent = async (student: Student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
};

export const updateStudent = async (id: string, student: Student) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};