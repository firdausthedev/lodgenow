import merge from "lodash.merge";
import localConfig from "./local";
import testingConfig from "./local";

const stage = import.meta.env.VITE_STAGE || "local";
let envConfig;

if (stage === "prod") {
  envConfig = testingConfig;
} else if (stage === "testing") {
  envConfig = testingConfig;
} else {
  envConfig = localConfig;
}

const defaultConfig = {
  stage,
  backendurl: import.meta.env.VITE_BACKEND_URL,
  logging: false,
};

export default merge(defaultConfig, envConfig || {});
