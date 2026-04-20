export type BoardItemType = "note" | "image" | "link" | "todo" | "board";

export type BoardItem = {
  id: string;
  type: BoardItemType;
  x: number;
  y: number;
  w: number;
  h: number;
  content: {
    text?: string;
    url?: string;
    src?: string; 
    title?: string;
    todos?: Array<{ id: string; text: string; done: boolean }>;
  };
  createdAt: number;
  isNew?: boolean;

};

// for image  

export type ImageSourceType =
  | "upload"
  | "url"
  | "ai"
  | "template"
  | "recommended";

export type BoardItemBase = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type NoteItem = BoardItemBase & {
  type: "note";
  content: string;
};

export type ImageItem = BoardItemBase & {
  type: "image";
  src: string;
  alt?: string;
  sourceType?: ImageSourceType;
};

export type BoardItemForImage = NoteItem | ImageItem;