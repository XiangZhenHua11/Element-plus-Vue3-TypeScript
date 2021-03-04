import { createI18n } from "vue-i18n";
import messages from "./index";
import { getLanguage } from "@/utils/cookies";
//注册并引入语言文件
const i18n = createI18n({
  locale: getLanguage() || "cn",
  messages,
});
export default i18n;
