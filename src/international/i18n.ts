import { createI18n } from "vue-i18n";
import { getLanguage } from "@/utils/cookies";
// import lang_cn from "element-plus/lib/locale/lang/zh-cn";
// import lang_en from "element-plus/lib/locale/lang/en";
//注册并引入语言文件
const i18n = createI18n({
  locale: getLanguage(),
  messages: {
    cn: require("./language/zh-cn.json"),
    en: require("./language/en.json"),
  },
  silentTranslationWarn: true, // 去除console中黄色报错
});
export default i18n;
