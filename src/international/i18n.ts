/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 17:44:48
 */
import { createI18n } from "vue-i18n";
import storeAction_app from "@storeAction/app";
import lang_cn from "element-plus/lib/locale/lang/zh-cn";
import lang_en from "element-plus/lib/locale/lang/en";
//注册并引入语言文件
const i18n = createI18n({
  locale: storeAction_app.getLanguage().current,
  messages: {
    zh: {
      ...require("./language/zh-cn.json"),
      ...lang_cn,
    },
    en: {
      ...require("./language/en.json"),
      ...lang_en,
    },
  },
  silentTranslationWarn: true, // 去除console中黄色报错
});
export default i18n;
