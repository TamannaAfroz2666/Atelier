
"use client";

type Props = {
  src: string;
  alt?: string;
};

export default function CanvasImageCard({ src, alt = "image" }: Props) {
  return (
    <div className="h-full w-full overflow-hidden bg-white">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

