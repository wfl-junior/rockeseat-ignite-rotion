import { ipcMain } from "electron";

ipcMain.handle("fetch-documents", async (_event, params) => {
  console.log(params);
  return "Hello World";
});
