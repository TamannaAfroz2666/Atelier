"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useAppDispatch } from "@/app/store/hook";
import { boardActions } from "@/app/store/board/boardSlice";
// import ImageCard from "./ImageCard";

import {
  LuListTodo,
  LuTrendingUp,
  LuLayoutGrid,
  LuColumns2,
  LuMessageSquare,
  LuTable2,
  LuImagePlus,
  LuUpload,
  LuPencil,
} from "react-icons/lu";
import { RxBorderDotted } from "react-icons/rx";
import { BsTrash2 } from "react-icons/bs";
import { VscNote } from "react-icons/vsc";
import { IoIosLink } from "react-icons/io";
import ImageCard from "../card/ImageCard";

type ToolKey =
  | "note"
  | "link"
  | "todo"
  | "line"
  | "board"
  | "column"
  | "comment"
  | "table"
  | "more"
  | "addImage"
  | "upload"
  | "draw";

type ActiveTool = ToolKey | null;
type BlockType = "note" | "link" | "todo" | "board";

const toolKeyToBlockType = (key: ToolKey): BlockType | null => {
  if (key === "note") return "note";
  if (key === "link") return "link";
  if (key === "todo") return "todo";
  if (key === "board") return "board";
  return null;
};

function DraggableToolButton({
  toolKey,
  label,
  Icon,
  isActive,
  onClick,
}: {
  toolKey: ToolKey;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
  onClick: () => void;
}) {
  const blockType = toolKeyToBlockType(toolKey);
  const showLabel = Boolean(label);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tool:${toolKey}`,
    data: {
      kind: "tool",
      toolKey,
      blockType,
    },
    disabled: !blockType,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={label || String(toolKey)}
        title={label || String(toolKey)}
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 select-none transition-all duration-300 delay-[10ms] hover:ml-3"
      >
        <span
          className={`my-[4px] inline-flex items-center justify-center rounded-md border px-1 py-1 transition active:scale-[0.98] ${
            isActive
              ? "border-[#3b6df6] bg-[#3b6df6]"
              : "border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          }`}
        >
          <Icon size={20} className={isActive ? "text-white" : "text-gray-600"} />
        </span>

        {showLabel && (
          <span className="text-[10.5px] leading-none text-gray-400">
            {label}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      ref={setNodeRef}
      type="button"
      aria-label={label || String(toolKey)}
      title={label || String(toolKey)}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 select-none transition-all duration-300 delay-[10ms] hover:ml-3 ${
        isDragging ? "opacity-60" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <span
        className={`my-[4px] inline-flex items-center justify-center rounded-md border px-1 py-1 transition active:scale-[0.98] ${
          isActive
            ? "border-[#3b6df6] bg-[#3b6df6]"
            : "border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        }`}
      >
        <Icon size={20} className={isActive ? "text-white" : "text-gray-600"} />
      </span>

      {showLabel && (
        <span className="text-[10.5px] leading-none text-gray-400">{label}</span>
      )}
    </button>
  );
}

export default function ToolsSidebar() {
  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<ActiveTool>("board");
  const [imageTab, setImageTab] = useState<"recommended" | "upload">(
    "recommended"
  );

  const items = useMemo(
    () => [
      { key: "note" as const, label: "Note", Icon: VscNote },
      { key: "link" as const, label: "Link", Icon: IoIosLink },
      { key: "todo" as const, label: "To-do", Icon: LuListTodo },
      { key: "line" as const, label: "Line", Icon: LuTrendingUp },
      { key: "board" as const, label: "Board", Icon: LuLayoutGrid },
      { key: "column" as const, label: "Column", Icon: LuColumns2 },
      { key: "comment" as const, label: "Comment", Icon: LuMessageSquare },
      { key: "table" as const, label: "Table", Icon: LuTable2 },
      { key: "more" as const, label: " ", Icon: RxBorderDotted },
      { key: "addImage" as const, label: "Add image", Icon: LuImagePlus },
      { key: "upload" as const, label: "Upload", Icon: LuUpload },
      { key: "draw" as const, label: "Draw", Icon: LuPencil },
    ],
    []
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;

      setActive((prev) => (prev === "addImage" ? null : prev));
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToolClick = (key: ToolKey) => {
    if (key === "addImage") {
      setActive((prev) => (prev === "addImage" ? null : "addImage"));
      setImageTab("recommended");
      return;
    }

    setActive(key);

    const blockType = toolKeyToBlockType(key);
    if (!blockType) return;

    dispatch(boardActions.addItem({ type: blockType }));
  };

  return (
    <div ref={rootRef} className="relative overflow-visible">
      <aside className="flex h-full w-[78px] flex-col justify-between border-r border-gray-200 bg-[#f1f1f1]">
        <div className="my-4 flex flex-col items-center gap-2">
          {items.map(({ key, label, Icon }) => (
            <DraggableToolButton
              key={key}
              toolKey={key}
              label={label}
              Icon={Icon}
              isActive={active === key}
              onClick={() => handleToolClick(key)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1.5 py-3">
          <button
            type="button"
            aria-label="Trash"
            onClick={() => console.log("trash")}
            className="flex flex-col items-center gap-1.5 select-none"
          >
            <span>
              <BsTrash2 size={32} className="text-gray-700" />
            </span>
            <span className="text-[11px] leading-none text-gray-600">
              Trash
            </span>
          </button>
        </div>
      </aside>

      <ImageCard
        open={active === "addImage"}
        activeTab={imageTab}
        onTabChange={setImageTab}
      />
    </div>
  );
}