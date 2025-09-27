import axios from "axios";
import type { BannerEmployer } from "./banneremployer.type";

// Upload banner image, trả về url ảnh
export const uploadBannerImage = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append("file", file);
	const res = await fetch("http://localhost:8080/api/upload", {
		method: "POST",
		body: formData,
	});
	if (!res.ok) throw new Error("Upload ảnh thất bại!");
	return await res.json();
};


export const getBannersByUser = async (userId: number): Promise<BannerEmployer[]> => {
	const res = await axios.get(`http://localhost:8080/api/banners/user/${userId}`);
	return res.data;
};

export const createBanner = async (formData: FormData, access_token: string): Promise<any> => {
	return axios.post("http://localhost:8080/api/banners", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${access_token}`,
		},
	}).then(res => res.data);
};

export const updateBanner = async (id: number, data: Partial<BannerEmployer>): Promise<any> => {
	const res = await axios.patch(`http://localhost:8080/api/banners/${id}`, data);
	return res.data;
};

export const renewBanner = async (data: Partial<BannerEmployer>): Promise<any> => {
	const res = await axios.post("http://localhost:8080/api/banners", data);
	return res.data;
};
