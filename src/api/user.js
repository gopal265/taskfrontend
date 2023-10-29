import axios from "axios";

const base_url = "https://profilebackend-e16g.onrender.com/api/user"


export const  register = (userdata) =>  axios.post(`${base_url}/register`,userdata);

export const login  = (userdata) => axios.post(`${base_url}/login`,userdata)

export const updateUser = (userdata) => axios.put(`${base_url}/updateprofile`,userdata)