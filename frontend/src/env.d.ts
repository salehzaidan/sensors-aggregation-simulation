/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENSOR_DATA_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
