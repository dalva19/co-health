const dev = {
  url: {
    PORT: "http://127.0.0.1:3000",
    COHEALTH_CREATE_USER: `http://localhost:3000/co-healtn/user/register`,
    SOCKET_SERVER: "http://localhost:8000",
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : "";
