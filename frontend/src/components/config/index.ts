import merge from "lodash.merge";

const stage = import.meta.env.VITE_STAGE || "local";
let envConfig;

const importConfig = async (configPath: string) => {
  const module = await import(configPath);
  return module.default;
};

if (stage === "prod") {
  envConfig = await importConfig("./prod");
} else if (stage === "testing") {
  envConfig = await importConfig("./testing");
} else {
  envConfig = await importConfig("./local");
}

const defaultConfig = {
  stage,
  backendurl: import.meta.env.VITE_BACKEND_URL,
  logging: false,
};

export default merge(defaultConfig, envConfig || {});
