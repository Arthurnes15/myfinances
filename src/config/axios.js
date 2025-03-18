import axios from 'axios';
const axiosUrl = import.meta.env.VITE_AXIOS_URL;
export default axios.create({
  baseURL: axiosUrl,
});
