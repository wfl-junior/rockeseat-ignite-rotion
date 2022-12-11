import { app, BrowserWindow, globalShortcut } from "electron";
import { IPC } from "~/shared/constants/ipc";

export function createShortcuts(window: BrowserWindow) {
  app.on("browser-window-focus", () => {
    globalShortcut.register("CommandOrControl+N", () => {
      window.webContents.send(IPC.ON_NEW_DOCUMENT_REQUEST);
    });
  });

  app.on("browser-window-blur", () => {
    globalShortcut.unregisterAll();
  });
}
