"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { boardActions } from "@/app/store/board/boardSlice";
import { boardImageActions, type BoardImageItem } from "@/app/store/board/boardImageSlice";
import { NoteCard } from "../card/NoteCard";
import CanvasImageCard from "../card/CanvasImageCard";

export function BoardItemInner({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const item = useAppSelector((s) => {
    const mergedItems = [...s.board.items, ...s.boardImage.items];
    return mergedItems.find((i) => i.id === id); 
  });

  if (!item) return null;

  if (item.type === "note") {
    return <NoteCard item={item} />;
  }

  if (item.type === "image") {
    const imageItem = item as BoardImageItem;

    return (
      <div
        className="h-full w-full"
        onMouseDown={(e) => {
          e.stopPropagation();
          dispatch(boardImageActions.selectImageItem({ id: imageItem.id }));
          dispatch(boardActions.clearSelection());
        }}

        //  onPointerDown={onResizePointerDown}
      >
        <CanvasImageCard src={imageItem.src} alt={imageItem.alt} />
      </div>
    );
  }

  if (item.type === "board") {
    const title = item.content.title ?? "";

    return (
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          dispatch(boardActions.selectItem({ id: item.id }));
          dispatch(boardImageActions.clearSelectedImage());
        }}
      >
        <div className="border-b px-3 py-2 text-xs text-gray-500">BOARD</div>

        <div className="p-3">
          <div className="text-sm font-medium text-gray-800">
            {title || "Untitled"}
          </div>

          <div className="mt-2 text-xs text-gray-500">Drop items inside later</div>
        </div>
      </div>
    );
  }

  if (item.type === "link") {
    return (
      <div
        className="h-full"
        onMouseDown={(e) => {
          e.stopPropagation();
          dispatch(boardActions.selectItem({ id: item.id }));
          dispatch(boardImageActions.clearSelectedImage());
        }}
      >
        <div className="border-b px-3 py-2 text-xs text-gray-500">LINK</div>

        <div className="break-all p-3 text-sm text-blue-600">
          {item.content.url ?? "https://"}
        </div>
      </div>
    );
  }

  if (item.type === "todo") {
    return (
      <div
        className="h-full"
        onMouseDown={(e) => {
          e.stopPropagation();
          dispatch(boardActions.selectItem({ id: item.id }));
          dispatch(boardImageActions.clearSelectedImage());
        }}
      >

        <div className="border-b px-3 py-2 text-xs text-gray-500">TODO</div>

        <div className="p-3 text-sm text-gray-700">Todo list</div>
      </div>
    );
  }

  return null;
}

