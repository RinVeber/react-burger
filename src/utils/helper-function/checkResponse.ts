import { BASE_URL } from "../data";

async function getIngredientsApi() {
  function checkResponse(res: Response) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка загрузки данных с сервера: ${res.status}`);
  }
  const res = await fetch(BASE_URL);
  return checkResponse(res);
}

export default getIngredientsApi;