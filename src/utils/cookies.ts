import Cookies from "js-cookie";

// App
const sidebarStatusKey = "xzh_sidebar_status";
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus);

// User
const tokenKey = "xzh_token";
export const getToken = () => Cookies.get(tokenKey) || "";
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);

//language
const languageKey = "xzh_language";
export const getLanguage = () => Cookies.get(languageKey) || "zh";
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, language);
