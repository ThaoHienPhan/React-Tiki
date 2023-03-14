import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.ezfrontend.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("Error Response: ", error.response);
    const { config, status, data } = error.response;
    const URLs = ["/auth/local/register", "/auth/local"]
    if (URLs.includes(config.url)  && status === 400) {
      // const errorList = data.data;
      // const messageList = errorList[0];
      // const firstMessage = messageList.messages;
      // const errorMessage = firstMessage[0].message
      // console.log(errorMessage);

      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }
    return Promise.reject(error);
  }
);

//interceptor
export default axiosClient;
