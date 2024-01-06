import path from "path";
import { getWebpackConfig } from "@microfeb/config";

interface EnvVariables {
  mode?: "development" | "production";
  port?: number;
  analyze?: boolean;
}

export default (env: EnvVariables) => {
  return getWebpackConfig({
    mode: env.mode || "development",

    port: env.port || 3000,

    // отображать анализатор сборки
    analyze: env.analyze || false,

    // набор глоб js переменных
    define: {
      __PLATFORM__: "desktopb",
    },

    paths: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "src", "index.html"),
      output: path.resolve(__dirname, "build"),
      public: path.resolve(__dirname, "public"),
      srcAlias: path.resolve(__dirname, "src"),
    },
  });
};
