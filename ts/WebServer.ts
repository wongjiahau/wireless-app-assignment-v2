import { Task } from "./Task";

export const API = (operation: ApiOption) => `http://192.168.0.9:5000/api/${operation}`;

export type ApiOption
  = "signup"
  | "login"
  | "get_session_id"
  | "task"
  | "logout"
  | "download"
  ;

export interface UserDetail {
  email: string;
  password: string;
}

async function register(userDetail: UserDetail) {
  const response = await(await postData("signup", userDetail)).json();
  if (response.error) {
    throw new Error(response.error);
  }
}

async function login(userDetail: UserDetail): string {
  const sessionId = await (await fetch(API("get_session_id"))).json();
  const response = await (await postData("login", {...userDetail, session_id: sessionId})).json();
  if (response.error) {
    throw new Error(response.error);
  }
  return sessionId;
}

async function logout(sessionId: string) {
  await postData("logout", {session_id: sessionId});
}

async function upload(sessionId: string, tasks: Task[]) {
   const result = await (await postData("task", {session_id: sessionId, tasks: tasks})).json();
   if (result.error) {
     throw new Error(result.error);
   }
}

async function download(sessionId: string) {
  return (await postData("download", {session_id: sessionId})).json();
}

async function postData<T>(api: ApiOption, body: T): Promise<any> {
  return await fetch(API(api), {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const WebServer = {
  register: register,
  login: login,
  logout: logout,
  upload: upload,
  download: download,
};
