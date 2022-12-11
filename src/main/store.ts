import Store from "electron-store";

interface IStore {
  documents: Record<string, { title: string }>;
}

export const store = new Store<IStore>({
  defaults: {
    documents: {},
  },
});
