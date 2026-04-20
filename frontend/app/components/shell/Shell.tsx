"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch } from "@/app/store/hook";
import { boardActions } from "@/app/store/board/boardSlice";
import { boardImageActions } from "@/app/store/board/boardImageSlice";

import { AppHeader } from "./AppHeader";
import ToolsSidebar from "./ToolSidebar";

const GALLERY_IMAGE_WIDTH = 300;
const MAX_GALLERY_HEIGHT = 800;
const MIN_GALLERY_HEIGHT = 400;

function getDroppedImageSize(width: number, height: number) {
  if (!width || !height) {
    return { width: 300, height: 400 };
  }

  let finalWidth = GALLERY_IMAGE_WIDTH;
  let finalHeight = Math.round((height / width) * GALLERY_IMAGE_WIDTH);

  if (finalHeight > MAX_GALLERY_HEIGHT) {
    finalHeight = MAX_GALLERY_HEIGHT;
  }

  if (finalHeight < MIN_GALLERY_HEIGHT) {
    finalHeight = MIN_GALLERY_HEIGHT;
  }

  return {
    width: finalWidth,
    height: finalHeight,
  };
}

export function Shell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [lastPointer, setLastPointer] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setLastPointer({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || over.id !== "canvas") return;

    const data = active.data.current as
      | {
          kind?: "tool";
          blockType?: "note" | "link" | "todo" | "board";
        }
      | {
          kind?: "picker-image";
          src?: string;
          alt?: string;
          originalWidth?: number;
          originalHeight?: number;
        }
      | undefined;

    if (!data) return;

    const container = document.getElementById("canvas-scroll-area");
    if (!container || !lastPointer) return;

    const rect = container.getBoundingClientRect();

    const x = lastPointer.x - rect.left + container.scrollLeft;
    const y = lastPointer.y - rect.top + container.scrollTop;

    if (data.kind === "picker-image" && data.src) {
      const originalWidth = data.originalWidth || 300;
      const originalHeight = data.originalHeight || 400;

      const droppedSize = getDroppedImageSize(originalWidth, originalHeight);

      dispatch(
        boardImageActions.addImageItem({
          src: data.src,
          alt: data.alt || "Dropped image",
          x: Math.max(0, x - droppedSize.width / 2),
          y: Math.max(0, y - 20),
          w: droppedSize.width,
          h: droppedSize.height,
          originalWidth: originalWidth,
          originalHeight: originalHeight,
        })
      );

      return;
    }

    if (data.kind === "tool" && data.blockType) {
      dispatch(
        boardActions.addItemAt({
          type: data.blockType,
          x: Math.max(0, x - 80),
          y: Math.max(0, y - 20),
        })
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen w-full flex-col bg-[#f7f7f7] text-gray-700">
        <AppHeader />

        <div className="flex flex-1 overflow-hidden">
          <ToolsSidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </DndContext>
  );
}