import 'dotenv/config';

export default {
  expo: {
    name: "rn-AstroZone",
    slug: "rn-AstroZone",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.render.rnastrozone",
      buildNumber: "1.0.0",
      supportsTablet: true
    },
    android: {
      package: "com.render.rnastrozone",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#FFFFFF"
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
      API_NOMINATIM: process.env.API_NOMINATIM
    }
  }
};
