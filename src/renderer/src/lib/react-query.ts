import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export enum QueryKeys {
  DOCUMENTS = "documents",
  DOCUMENT = "document",
}
