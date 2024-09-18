import { request } from "./checkResponse";
import { getCookie, setCookie } from "./cockie";

export function sendRefreshToken() {
  const res = request(`/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
  return res;
}

export interface RequestInitWithAuth extends RequestInit {
  headers?: Record<string, string>;
}

export const fetchWithRefresh = async (
  url: RequestInfo | URL,
  options: RequestInitWithAuth,
) => {
  try {
    const res = await request(url, options);
    return res;
  } catch (err) {
    console.log(err);
    if (err === "Ошибка 401") {
      return null;
      // return (window.location.href = "/login");
    }
    if (err === "Ошибка 403") {
      const refreshData = await sendRefreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("accessToken", refreshData.accessToken);
      setCookie("refreshToken", refreshData.refreshToken);
      const newHeaders: HeadersInit = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await request(url, { ...options, headers: newHeaders });
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
