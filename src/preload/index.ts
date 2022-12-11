import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "~/shared/constants/ipc";
import type {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  GetAllDocumentsResponse,
  GetDocumentRequest,
  GetDocumentResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from "~/shared/types/ipc";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  documents: {
    getAll(): Promise<GetAllDocumentsResponse> {
      return ipcRenderer.invoke(IPC.DOCUMENTS.GET_ALL);
    },
    getOne(request: GetDocumentRequest): Promise<GetDocumentResponse> {
      return ipcRenderer.invoke(IPC.DOCUMENTS.GET_ONE, request);
    },
    create(): Promise<CreateDocumentResponse> {
      return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
    },
    update(request: UpdateDocumentRequest): Promise<UpdateDocumentResponse> {
      return ipcRenderer.invoke(IPC.DOCUMENTS.UPDATE, request);
    },
    delete(request: DeleteDocumentRequest): Promise<void> {
      return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, request);
    },
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
