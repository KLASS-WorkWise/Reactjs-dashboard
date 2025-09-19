import axios from "axios";
import type { GetAllManagerJobResponse, ManagerJobType } from "./managerjob.type";

export const fetchManagerJobs = async (): Promise<ManagerJobType[]> => {
	const response = await axios.get('http://localhost:8080/api/job-postings/all');
	return response.data ?? [];
};
