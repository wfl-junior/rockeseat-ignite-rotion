import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  fetchDocuments(): Promise<Array<{ id: string; title: string }>> {
    return ipcRenderer.invoke("fetch-documents");
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
