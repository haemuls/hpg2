const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com"
    : "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

export default API_BASE_URL;