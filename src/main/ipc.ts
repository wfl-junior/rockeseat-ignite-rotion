import { ipcMain } from "electron";
import { IPC } from "~/shared/constants/ipc";
import type { GetAllDocumentsResponse } from "~/shared/types/ipc";

ipcMain.handle(
  IPC.DOCUMENTS.GET_ALL,
  async (): Promise<GetAllDocumentsResponse> => {
    return {
      documents: [
        { id: "1", title: "Ignite", content: "" },
        { id: "2", title: "Discover", content: "" },
        { id: "3", title: "Rocketseat", content: "" },
        { id: "4", title: "Docs", content: "" },
      ],
    };
  },
);
