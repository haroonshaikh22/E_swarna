const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { default: i18n } = require("./i18n");
export default async function getLangTranslation() {
    var lang = AsyncStorage.getItem(i18n.language);
  //  console.log("lang331",lang);
    return lang;

}