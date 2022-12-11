import { app, Menu, nativeImage, Tray } from "electron";
import path from "node:path";

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, "rotionTemplate.png"),
  );

  const tray = new Tray(icon);
  const menu = Menu.buildFromTemplate([
    {
      label: "Rotion",
      enabled: false,
    },
    {
      type: "separator",
    },
    {
      label: "Salve",
    },
  ]);

  tray.setContextMenu(menu);
});
