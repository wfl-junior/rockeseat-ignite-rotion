export interface Document {
  id: string;
  title: string;
  content: string;
}

// Request
export interface GetDocumentRequest {
  id: Document["id"];
}

export interface UpdateDocumentRequest extends Document {}

export interface DeleteDocumentRequest {
  id: Document["id"];
}

// Response
export interface GetAllDocumentsResponse {
  documents: Document[];
}

export interface GetDocumentResponse {
  document: Document;
}

export interface CreateDocumentResponse {
  document: Document;
}

export interface UpdateDocumentResponse {
  document: Document;
}
