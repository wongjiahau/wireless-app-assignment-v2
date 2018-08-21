export const API = (operation: Operation) => `http://172.16.130.135:5000/api/${operation}`;

export type Operation = "signup";

export interface UserDetail {
  email: string;
  password: string;
}

async function register(userDetail: UserDetail): Promise<any> {
  return await fetch(API("signup"), {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetail),
  });
}

export const WebServer = {
  register: register,
};
