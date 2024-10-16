const API_URL = process.env.API_URL ?? "https://jsonplaceholder.typicode.com";

export const httpConfig = {
  user: {
    fetch: `${API_URL}/users`,
  },
};
