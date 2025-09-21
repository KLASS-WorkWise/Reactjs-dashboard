import apiClient from "../libs/api-client";
import type {
  ApiResponse,
  ApplicantResponse,
  ApplicantTracking,
  PaginatedEmployeeListJobResponseDto,
  TimelineEvent,
} from "../types/employerJobAplicant.type";

export const applicantService = {
 getApplicantsByJob: async (jobId: number) => {
  const res = await apiClient.get<ApplicantResponse[]>(
    `/employers-status/applicants/${jobId}`
  );
   console.log("👉 Response full:", res);
  console.log("👉 Response data:", res.data);
  return res; // ✅ trả về ApplicantResponse[]
},

  getMyJobs: () =>
    apiClient.get<ApiResponse<PaginatedEmployeeListJobResponseDto>>(
      "/employers-status/jobs"
    ),

  updateApplicantStatus: (id: number, status: string, note?: string) =>
    apiClient.put<ApplicantResponse>(
      `/employers-status/applicants/${id}/status`,
      null,
      { params: { status, note } }
    ),

  getApplicantDetail: async (id: number) => {
    return apiClient.get<ApplicantTracking>(`/applicant/detail/${id}`);
  },
 getEmployeeTracking: (id: number) =>
    apiClient.get<ApplicantTracking>(`/employers-status/${id}/tracking`),

  getTracking: (id: number) =>
    apiClient.get<ApplicantTracking>(`/applicant/${id}/tracking`),

  getTimeline: (id: number) =>
    apiClient.get<TimelineEvent[]>(`/applicant/${id}/timeline`),

  addTimelineEvent: (id: number, payload: { status: string; note: string }) =>
    apiClient.post<TimelineEvent>(`/applicant/${id}/timeline`, payload),
};
