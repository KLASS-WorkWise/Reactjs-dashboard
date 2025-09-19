export interface ManagerJobType {
	id: number;
	employerId: number;
	employerName: string;
	title: string;
	description: string;
	location: string;
	salaryRange: string;
	jobType: string;
	category: string;
	requiredSkills: string[];
	minExperience: number;
	requiredDegree: string;
	endAt: string;
	status: string;
	createdAt: string;
	postType: string;
}

export interface GetAllManagerJobResponse {
	data: ManagerJobType[];
}
