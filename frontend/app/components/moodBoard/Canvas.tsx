"use client";

import { useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import { GridBackground } from "./GridBackground";
import { BoardItemInner } from "./boardItemInner";
import { cn } from "@/app/utils/cn";
import { boardActions } from "@/app/store/board/boardSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { boardImageActions } from "@/app/store/board/boardImageSlice";

type CanvasProps = {
  canvasRef: React.RefObject<HTMLDivElement | null>;
};

function CanvasDropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-full w-full overflow-auto",
        isOver && "outline-2 outline-gray-300"
      )}
    >
      {children}
    </div>
  );
}

export function Canvas({ canvasRef }: CanvasProps) {
  const boardItems = useAppSelector((s) => s.board.items);
  const boardImageItems = useAppSelector((s) => s.boardImage.items);
  const mergedItems = [...boardItems, ...boardImageItems];

  const dispatch = useAppDispatch();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea") return;

        dispatch(boardActions.removeSelected());
        dispatch(boardImageActions.removeSelectedImage());
      }

      if (e.key === "Escape") {
        dispatch(boardActions.clearSelection());
        dispatch(boardImageActions.clearSelectedImage());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  return (
    <CanvasDropZone>
      <div
        id="canvas-scroll-area"
        ref={canvasRef}
        className="relative h-full w-full overflow-auto"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            dispatch(boardActions.clearSelection());
            dispatch(boardImageActions.clearSelectedImage());
          }
        }}
      >
        <GridBackground />

        <div className="absolute right-3 top-3 z-10">
          <span className="rounded border bg-white px-3 py-1 text-xs text-gray-600">
            Unsorted
          </span>
        </div>

        {mergedItems.map((it) => (
          <BoardItemCard key={it.id} id={it.id} />
        ))}
      </div>
    </CanvasDropZone>
  );
}

function BoardItemCard({ id }: { id: string }) {
  const item = useAppSelector((s) => {
    const mergedItems = [...s.board.items, ...s.boardImage.items];
    return mergedItems.find((x) => x.id === id);
  });

  const selectedBoardId = useAppSelector((s) => s.board.selectedId);
  const selectedImageId = useAppSelector((s) => s.boardImage.selectedImageId);
  const isSelected = selectedBoardId === id || selectedImageId === id;

  const dispatch = useAppDispatch(); 

  const dragState = useRef<{
    pointerId: number | null;
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
    dragging: boolean;
  }>({
    pointerId: null,
    startClientX: 0,
    startClientY: 0,
    startX: 0,
    startY: 0,
    dragging: false,
  });

  const resizeState = useRef<{
    pointerId: number | null;
    startClientX: number;
    startClientY: number;
    startW: number;
    startH: number;
  }>({
    pointerId: null,
    startClientX: 0,
    startClientY: 0,
    startW: 0,
    startH: 0,
  });

  if (!item) return null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (tag === "textarea" || tag === "input") return;

    e.stopPropagation();

    if (item.type === "image") {
      dispatch(boardImageActions.selectImageItem({ id: item.id }));
      dispatch(boardActions.clearSelection());
    } else {
      dispatch(boardActions.selectItem({ id: item.id }));
      dispatch(boardImageActions.clearSelectedImage());
    }

    dragState.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startX: item.x,
      startY: item.y,
      dragging: false,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    const state = dragState.current;
    if (state.pointerId === null) return;

    const deltaX = e.clientX - state.startClientX;
    const deltaY = e.clientY - state.startClientY;

    if (!state.dragging) {
      const movedEnough = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;
      if (!movedEnough) return;
      state.dragging = true;
    }

    if (item.type === "image") {
      dispatch(
        boardImageActions.moveImageItem({
          id: item.id,
          x: Math.max(0, state.startX + deltaX),
          y: Math.max(0, state.startY + deltaY),
        })
      );
    } else {
      dispatch(
        boardActions.moveItem({
          id: item.id,
          x: Math.max(0, state.startX + deltaX),
          y: Math.max(0, state.startY + deltaY),
        })
      );
    }
  };

  const onPointerUp = () => {
    dragState.current.pointerId = null;
    dragState.current.dragging = false;

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  const onResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (item.type !== "image") return;

    dispatch(boardImageActions.selectImageItem({ id: item.id }));
    dispatch(boardActions.clearSelection());

    resizeState.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startW: item.w,
      startH: item.h,
    };

    window.addEventListener("pointermove", onResizePointerMove);
    window.addEventListener("pointerup", onResizePointerUp);
  };

  const onResizePointerMove = (e: PointerEvent) => {
    const state = resizeState.current;
    if (state.pointerId === null) return;
    if (item.type !== "image") return;

    const deltaX = e.clientX - state.startClientX;
    const deltaY = e.clientY - state.startClientY;

    const newWidth = Math.max(50, state.startW + deltaX);
    const newHeight = Math.max(20, state.startH + deltaY);

    dispatch(
      boardImageActions.resizeImageItem({
        id: item.id,
        w: newWidth,
        h: newHeight,
      })
    );
  };

  const onResizePointerUp = () => {
    resizeState.current.pointerId = null;

    window.removeEventListener("pointermove", onResizePointerMove);
    window.removeEventListener("pointerup", onResizePointerUp);
  };

  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-lg border border-amber-50 bg-white shadow-sm",
        isSelected ? "ring-2 ring-gray-300" : "border-gray-100"
      )}
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.type === "note" ? "auto" : item.h,
        minHeight: item.type === "note" ? item.h : undefined,
      }}
      onPointerDown={onPointerDown}
    >
      <BoardItemInner id={item.id} />

      {item.type === "image" && isSelected && (
        <div
          className="absolute bottom-1 right-1 z-20 h-4 w-4 cursor-se-resize rounded-sm border border-white/80 bg-gray-500 shadow"
          onPointerDown={onResizePointerDown}
          title="Resize"
        />
      )}
    </div>
  );
}