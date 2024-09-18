import { BASE_URL } from "../data";

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res}`);
};

export function request(url: RequestInfo | URL, options: RequestInit) {
  return fetch(BASE_URL + url, options).then(checkResponse).then(checkSuccess);
}
