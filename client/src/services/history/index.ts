import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const requireLogin = (path?: string) => {
  return history.push({
    pathname: "/login",
    search: "?" + new URLSearchParams(path).toString(),
  });
};
export const backToHome = () => {
  return history.push("/");
};
