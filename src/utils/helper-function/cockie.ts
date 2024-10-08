type TMultiType = number | string | boolean;

type TCookieValue = TMultiType | Date;

type TCookieProps = {
  path?: string;
  expires?: TCookieValue;
} & { [name: string]: TCookieValue };

export function setCookie(
  name: string,
  value: TMultiType,
  props?: TCookieProps,
): void {
  props = {
    path: "/",
    ...props,
  };

  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
    console.log(exp);
  }
  if (exp instanceof Date) {
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function cleanTokenCookies(cookiesNames: string[]): void {
  cookiesNames.forEach((cookie) => {
    setCookie(cookie, "");
  });
}
