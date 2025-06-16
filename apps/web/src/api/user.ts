import axiosInstance from "./axiosInstance"



export const getMe = async () => {
    const res = await axiosInstance.get(`/api/user/me/`);
    return res.data;
}
