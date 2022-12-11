import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  fetchDocuments(params: any) {
    return ipcRenderer.invoke("fetch-documents", params);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
