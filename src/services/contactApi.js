import axios from "axios";
import Config from "../Constants/Config"; 

export const sendContactMessage = async (data) => {
  const res = await axios.post(`${Config.API_BASE_URL}/api/contact`, data);
  return res.data;
};
