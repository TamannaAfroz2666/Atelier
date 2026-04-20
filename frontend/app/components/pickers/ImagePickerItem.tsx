"use client";

import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";

type ImagePickerItemProps = {
  id: string;
  src: string;
  alt: string;
  displayWidth: number;
  displayHeight: number;
  originalWidth: number;
  originalHeight: number;
};

export default function ImagePickerItem({
  id,
  src,
  alt,
  displayWidth,
  displayHeight,
  originalWidth,
  originalHeight,
}: ImagePickerItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `picker-image-${id}`,
    data: {
      kind: "picker-image",
      src,
      alt,
      originalWidth,
      originalHeight,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative overflow-hidden rounded-[2px] bg-[#ddd] ${
        isDragging ? "opacity-60" : ""
      }`}
      style={{
        width: `${displayWidth}px`,
        height: `${displayHeight}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        sizes="300px"
        className="object-cover"
      />
    </div>
  );
}