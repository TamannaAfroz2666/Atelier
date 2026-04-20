import {
  StickyNote,
  Link2,
  CheckSquare,
  PencilLine,
  LayoutGrid,
  Columns3,
  MessageSquareText,
  Image as ImageIcon,
  Upload,
  Trash2,
} from "lucide-react";

export type ToolKey =
  | "note"
  | "link"
  | "todo"
  | "line"
  | "board"
  | "column"
  | "comment"
  | "image"
  | "upload";

export type ToolItem = {
  key: ToolKey;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export const TOOL_ITEMS: ToolItem[] = [
  { key: "note", label: "Note", Icon: StickyNote },
  { key: "link", label: "Link", Icon: Link2 },
  { key: "todo", label: "To-do", Icon: CheckSquare },
  { key: "line", label: "Line", Icon: PencilLine },
  { key: "board", label: "Board", Icon: LayoutGrid },
  { key: "column", label: "Column", Icon: Columns3 },
  { key: "comment", label: "Comment", Icon: MessageSquareText },
  { key: "image", label: "Add image", Icon: ImageIcon },
  { key: "upload", label: "Upload", Icon: Upload },
];

export const TRASH = { label: "Trash", Icon: Trash2 };