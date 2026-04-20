"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { useAppDispatch } from "@/app/store/hook";
import { boardActions } from "@/app/store/board/boardSlice";
import { BoardItem } from "@/app/types/board";

const { TextArea } = Input;

type Props = {
  item: BoardItem;
};

const MIN_WIDTH = 300;
const MIN_HEIGHT = 120;

export function NoteCard({ item }: Props) {
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [draftText, setDraftText] = useState(item.content.text ?? "");
  const [width, setWidth] = useState<number>(item.w ?? MIN_WIDTH);
  const [height, setHeight] = useState<number>(item.h ?? MIN_HEIGHT);

  useEffect(() => {
    setDraftText(item.content.text ?? "");
  }, [item.content.text]);

  useEffect(() => {
    setWidth(item.w ?? MIN_WIDTH);
    setHeight(item.h ?? MIN_HEIGHT);
  }, [item.w, item.h]);

  const persistNote = (next?: { w?: number; h?: number; text?: string }) => {
    dispatch(
      boardActions.updateItemContent({
        id: item.id,
        patch: {
          text: next?.text ?? draftText,
        },
      })
    );

    dispatch(
      boardActions.updateItemPosition({
        id: item.id,
        patch: {
          w: next?.w ?? width,
          h: next?.h ?? height,
        },
      })
    );
  };

  const handleBlur = () => {
    persistNote();
  };

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const onMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.max(MIN_WIDTH, startWidth + (event.clientX - startX));
      const nextHeight = Math.max(MIN_HEIGHT, startHeight + (event.clientY - startY));

      setWidth(nextWidth);
      setHeight(nextHeight);
    };

    const onMouseUp = (event: MouseEvent) => {
      const finalWidth = Math.max(MIN_WIDTH, startWidth + (event.clientX - startX));
      const finalHeight = Math.max(MIN_HEIGHT, startHeight + (event.clientY - startY));

      setWidth(finalWidth);
      setHeight(finalHeight);
      persistNote({ w: finalWidth, h: finalHeight });

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={(e) => e.stopPropagation()}
      className="group relative overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-sm"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${MIN_WIDTH}px`,
        minHeight: `${MIN_HEIGHT}px`,
      }}
    >
      <div className="h-full w-full">
        <TextArea
          ref={(node) => {
            if (!node) return;
            const inner = node.resizableTextArea?.textArea;
            if (inner) textareaRef.current = inner;
          }}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onBlur={handleBlur}
          onClick={(e) => e.stopPropagation()}
          placeholder="Start typing..."
          autoSize={false}
          className="!h-full !w-full resize-none !border-0 !bg-transparent !p-3 !text-[14px] !font-medium !leading-6 !text-zinc-700 placeholder:!text-zinc-400 focus:!shadow-none"
          style={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        />
      </div>

      <div
        onMouseDown={startResize}
        className="absolute bottom-1 right-1 z-10 flex h-4 w-4 cursor-se-resize items-end justify-end opacity-60 transition-opacity group-hover:opacity-100"
        title="Resize note"
      >
        <span className="block h-3 w-3 border-b-2 border-r-2 border-zinc-400" />
      </div>
    </div>
  );
}