import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "~/shared/constants/ipc";
import type { GetAllDocumentsResponse } from "~/shared/types/ipc";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  getAllDocuments(): Promise<GetAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.GET_ALL);
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
