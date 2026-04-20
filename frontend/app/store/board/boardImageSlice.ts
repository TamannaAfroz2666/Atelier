import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardImageItem = {
  id: string;
  type: "image";
  src: string;
  alt?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  originalWidth?: number;
  originalHeight?: number;
  objectPosition?: string;
};

type ImagePanelTab = "recommended" | "upload";

type BoardImageState = {
  items: BoardImageItem[];
  selectedImageId: string | null;
  isImagePanelOpen: boolean;
  activeTab: ImagePanelTab;
};

const initialState: BoardImageState = {
  items: [],
  selectedImageId: null,
  isImagePanelOpen: false,
  activeTab: "recommended",
};

const boardImageSlice = createSlice({
  name: "boardImage",
  initialState,
  reducers: {
    openImagePanel: (state) => {
      state.isImagePanelOpen = true;
    },

    closeImagePanel: (state) => {
      state.isImagePanelOpen = false;
    },

    toggleImagePanel: (state) => {
      state.isImagePanelOpen = !state.isImagePanelOpen;
    },

    setImagePanelTab: (state, action: PayloadAction<ImagePanelTab>) => {
      state.activeTab = action.payload;
    },

    selectImageItem: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedImageId = action.payload.id;
    },

    clearSelectedImage: (state) => {
      state.selectedImageId = null;
    },

    addImageItem: (
      state,
      action: PayloadAction<{
        src: string;
        alt?: string;
        x: number;
        y: number;
        w: number;
        h: number;
        originalWidth?: number;
        originalHeight?: number;
        objectPosition?: string;
      }>
    ) => {
      const newItem: BoardImageItem = {
        id: crypto.randomUUID(),
        type: "image",
        src: action.payload.src,
        alt: action.payload.alt,
        x: action.payload.x,
        y: action.payload.y,
        w: action.payload.w,
        h: action.payload.h,
        originalWidth: action.payload.originalWidth,
        originalHeight: action.payload.originalHeight,
        objectPosition: action.payload.objectPosition || "center center",
      };

      state.items.push(newItem);
      state.selectedImageId = newItem.id;
    },

    moveImageItem: (
      state,
      action: PayloadAction<{
        id: string;
        x: number;
        y: number;
      }>
    ) => {
      const item = state.items.find((img) => img.id === action.payload.id);
      if (!item) return;

      item.x = Math.max(0, action.payload.x);
      item.y = Math.max(0, action.payload.y);
    },

    resizeImageItem: (
      state,
      action: PayloadAction<{
        id: string;
        w: number;
        h: number;
      }>
    ) => {
      const item = state.items.find((img) => img.id === action.payload.id);
      if (!item) return;

      item.w = Math.max(50, action.payload.w);
      item.h = Math.max(20, action.payload.h);
    },

    updateImageObjectPosition: (
      state,
      action: PayloadAction<{
        id: string;
        objectPosition: string;
      }>
    ) => {
      const item = state.items.find((img) => img.id === action.payload.id);
      if (!item) return;

      item.objectPosition = action.payload.objectPosition;
    },

    removeImageItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((img) => img.id !== action.payload.id);

      if (state.selectedImageId === action.payload.id) {
        state.selectedImageId = null;
      }
    },

    removeSelectedImage: (state) => {
      if (!state.selectedImageId) return;

      state.items = state.items.filter(
        (img) => img.id !== state.selectedImageId
      );
      state.selectedImageId = null;
    },
  },
});

export const boardImageActions = boardImageSlice.actions;
export default boardImageSlice.reducer;