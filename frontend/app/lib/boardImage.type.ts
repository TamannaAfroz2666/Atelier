export type BoardImageItem = {
  id: string;
  type: "image";
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  cropX?: number;
  cropY?: number;
  cropScale?: number;
  originalWidth?: number;
  originalHeight?: number;
};