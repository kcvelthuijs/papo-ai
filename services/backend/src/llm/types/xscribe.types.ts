export interface XscribeInput {
   file: Blob;
   language?: string;
}

export interface XscribeResponse {
   text: string;
}
