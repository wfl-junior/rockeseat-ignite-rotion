import Store from "electron-store";
import type { Document } from "~/shared/types/ipc";

interface IStore {
  documents: Record<string, Document>;
}

export const store = new Store<IStore>({
  defaults: {
    documents: {},
  },
});
