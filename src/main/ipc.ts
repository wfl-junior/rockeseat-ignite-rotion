import { ipcMain } from "electron";
import { randomUUID } from "node:crypto";
import { IPC } from "~/shared/constants/ipc";
import type {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  GetAllDocumentsResponse,
  GetDocumentRequest,
  GetDocumentResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from "~/shared/types/ipc";
import { store } from "./store";

ipcMain.handle(
  IPC.DOCUMENTS.GET_ALL,
  async (): Promise<GetAllDocumentsResponse> => {
    return {
      documents: Object.values(store.get("documents")),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.GET_ONE,
  async (_event, { id }: GetDocumentRequest): Promise<GetDocumentResponse> => {
    return {
      document: store.get(`documents.${id}`),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID();
    const document: Document = {
      id,
      title: "Untitled",
      content: "",
    };

    store.set(`documents.${id}`, document);

    return {
      document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.UPDATE,
  async (
    _event,
    document: UpdateDocumentRequest,
  ): Promise<UpdateDocumentResponse> => {
    store.set(`documents.${document.id}`, document);

    return {
      document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_event, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  },
);
