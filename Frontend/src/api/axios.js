import axios from "axios";

export default axios.create({
  baseURL: 'https://jwt-auth-app.onrender.com/api/v1/auth',
});

