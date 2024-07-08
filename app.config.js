import 'dotenv/config';

export default {
  expo: {
    name: "AstroInsight",
    slug: "AstroInsight",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo1.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.render.astroinsight",
      buildNumber: "1.0.0",
      supportsTablet: true
    },
    android: {
      package: "com.render.astroinsight",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/logo1.png",
        backgroundColor: "#4B0082"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      REGISTER_TOKEN: process.env.REGISTER_TOKEN,
      UPDATE_TOKEN: process.env.UPDATE_TOKEN,
      DATA_TOKEN: process.env.DATA_TOKEN,
      DELETE_TOKEN: process.env.DELETE_TOKEN,
      LAST_LOGIN_TOKEN: process.env.LAST_LOGIN_TOKEN,
      API_NOMINATIM: process.env.API_NOMINATIM,
      API_LAST_LOGIN: process.env.API_LAST_LOGIN,
      API_GET: process.env.API_GET,
      API_REGISTER: process.env.API_REGISTER,
      API_UPDATE: process.env.API_UPDATE,
      API_DELETE: process.env.API_DELETE
    }
  }
};
