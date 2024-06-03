import React from "react";
import AppHeader from "../app-header/app-header";
import { Outlet } from "react-router-dom";
import { data, IDataItem } from "../../utils/data";
import getIngredientsApi from "../../utils/helper-function/checkResponse";

export function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [ingredientsData, setIngredientsData] = React.useState<
    IDataItem[] | null
  >();

  React.useEffect(() => {
    setIsLoading(true);
    getIngredientsApi()
      .then((res) => setIngredientsData(res.data))
      .catch((err) => {
        console.log(err);
        //если будет ошибка fetch, то берем моковые данные
        //почему то у меня ссылка иногда блокируется и запрос зависает в режиме pending, а после приходит error
        //в пакче сказали, что нужно блокнуть антивирус и что-то отключить, но я так и не нашел что именно.
        setIngredientsData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <Outlet
        context={{
          data:
            ingredientsData?.length === 0 || ingredientsData == null
              ? data
              : ingredientsData,
        }}
      />
    </React.Fragment>
  );
}
