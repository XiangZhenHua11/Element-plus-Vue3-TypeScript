import { createI18n } from "vue-i18n";
import { getLanguage } from "@/utils/cookies";
//注册并引入语言文件
const i18n = createI18n({
  locale: getLanguage(),
  messages: {
    cn: require("./language/zh-CN.json"),
    en: require("./language/en.json"),
  },
  silentTranslationWarn: true, // 去除console中黄色报错
});
export default i18n;
