import axios, { AxiosResponse } from "axios";

import {
  ADMIN_STUDENT_URL,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

export interface Student {
  ID: number;
  roll_no: string;
  name: string;
  specialization: string;
  preference: string;
  gender: string;
  disability: string;
  dob: number;
  expected_graduation_year: number;
  iitk_email: string;
  personal_email: string;
  phone: string;
  alternate_phone: string;
  whatsapp_number: string;
  program_department_id: number;
  secondary_program_department_id: number;
  current_cpi: number;
  ug_cpi: number;
  tenth_board: string;
  tenth_year: number;
  tenth_marks: number;
  twelfth_board: string;
  twelfth_year: number;
  twelfth_marks: number;
  entrance_exam: string;
  entrance_exam_rank: number;
  category: string;
  category_rank: number;
  current_address: string;
  permanent_address: string;
  friend_name: string;
  friend_phone: string;
  is_editable: string;
}

const instance = axios.create({
  baseURL: ADMIN_STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const AdminStudentRequest = {
  delete: (token: string, id: number) =>
    instance
      .delete<StatusResponse, AxiosResponse<StatusResponse, Student>>(
        `/${id}`,
        setConfig(token)
      )
      .then(responseBody),
  getAll: (token: string) =>
    instance.get<Student[]>("", setConfig(token)).then(responseBody),
  getById: (token: string, id: number) =>
    instance.get<Student>(`/${id}`, setConfig(token)).then(responseBody),
  updateById: (token: string, id: number, body: Student) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, Student>, Student>(
        `/${id}`,
        body,
        setConfig(token)
      )
      .then(responseBody),
};

export default AdminStudentRequest;