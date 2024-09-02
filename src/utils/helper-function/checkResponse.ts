import { BASE_URL } from "../data";

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function request(url: RequestInfo | URL, options: any) {
  return fetch(BASE_URL + url, options).then(checkResponse);
}
