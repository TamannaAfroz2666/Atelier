import { BoardItem, BoardItemType } from "@/app/types/board";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const loadBoardItems = createAsyncThunk<BoardItem[], { boardId: string }>(
  "board/loadBoardItems",
  async ({ boardId }) => {
    console.log("Mock load items for board:", boardId);
    return [];
  }
);

type BoardState = {
  items: BoardItem[];
  selectedId: string | null;
  status: "idle" | "loading" | "failed";
};

const initialState: BoardState = {
  items: [],
  selectedId: null,
  status: "idle",
};

function defaultSize(type: BoardItemType) {
  switch (type) {
    case "note":
      return { w: 240, h: 56 };
    case "image":
      return { w: 260, h: 180 };
    case "link":
      return { w: 260, h: 120 };
    case "todo":
      return { w: 260, h: 180 };
    case "board":
      return { w: 260, h: 140 };
  }
}

function defaultContent(type: BoardItemType) {
  switch (type) {
    case "note":
      return { text: "" };
    case "image":
      return { src: "", title: "Image" };
    case "link":
      return { url: "https://", title: "Link" };
    case "todo":
      return {
        todos: [
          { id: uuid(), text: "Task 1", done: false },
          { id: uuid(), text: "Task 2", done: false },
        ],
      };
    case "board":
      return { title: "New Board" };
  }
}

function createItem(type: BoardItemType, x: number, y: number): BoardItem {
  const { w, h } = defaultSize(type);

  return {
    id: uuid(),
    type,
    x,
    y,
    w,
    h,
    content: defaultContent(type),
    createdAt: Date.now(),
    isNew: true,
  };
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ type: BoardItemType }>) => {
      const last = state.items[state.items.length - 1];
      const x = last ? last.x + 24 : 120;
      const y = last ? last.y + 24 : 120;

      const newItem = createItem(action.payload.type, x, y);
      state.items.push(newItem);
      state.selectedId = newItem.id;
    },

    addItemAt: (
      state,
      action: PayloadAction<{ type: BoardItemType; x: number; y: number }>
    ) => {
      const { type, x, y } = action.payload;
      const newItem = createItem(type, x, y);
      state.items.push(newItem);
      state.selectedId = newItem.id;
    },

    selectItem: (state, action: PayloadAction<{ id: string | null }>) => {
      state.selectedId = action.payload.id;
    },

    clearSelection: (state) => {
      state.selectedId = null;
    },

    removeSelected: (state) => {
      if (!state.selectedId) return;
      state.items = state.items.filter((it) => it.id !== state.selectedId);
      state.selectedId = null;
    },

    updateItemContent: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<BoardItem["content"]> }>
    ) => {
      const { id, patch } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (!item) return;

      item.content = { ...item.content, ...patch };
      item.isNew = false;
    },

    moveItem: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (!item) return;

      item.x = x;
      item.y = y;
    },

    markItemAsNotNew: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((it) => it.id === action.payload.id);
      if (!item) return;
      item.isNew = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBoardItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBoardItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.selectedId = null;
      })
      .addCase(loadBoardItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;