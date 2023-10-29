import axios from "axios";

const base_url = "http://localhost:4500/api/user"


export const  register = (userdata) =>  axios.post(`${base_url}/register`,userdata);

export const login  = (userdata) => axios.post(`${base_url}/login`,userdata)

export const updateUser = (userdata) => axios.put(`${base_url}/updateprofile`,userdata)