"use client";

import { Search } from "lucide-react";
import Image from "next/image";

type AddImagePanelProps = {
  open: boolean;
};

const demoImages = [
  "/demo/demo1.jpg",
  "/demo/demo2.jpg",
  "/demo/demo3.jpg",
];

export default function AddImagePanel({ open }: AddImagePanelProps) {
  if (!open) return null;

  return (
    <div
      className="
        absolute left-[56px] top-[250px] z-50
        h-[560px] w-[545px]
        overflow-hidden rounded-[10px]
        border border-[#d9d9d9]
        bg-[#f6f6f6]
        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
      "
    >
      <div className="flex h-full">
        {/* left menu */}
        <div className="w-[210px] border-r border-[#e5e5e5] bg-[#f7f7f7] px-5 py-5">
          <div className="space-y-2">
            <button
              className="
                flex w-full items-center rounded-md
                bg-[#e9e9e9] px-4 py-2.5
                text-left text-[15px] font-medium text-[#333]
              "
            >
              Recommended
            </button>

            <button
              className="
                flex w-full items-center rounded-md
                px-4 py-2.5 text-left
                text-[15px] font-medium text-[#555]
                hover:bg-[#ececec]
              "
            >
              Upload your own
            </button>
          </div>

          <div className="mt-[360px]">
            <p className="text-[13px] leading-5 text-[#8a8a8a]">
              Over 3 million free images
              <br />
              provided by Pexels
            </p>

            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search images..."
                className="
                  h-[36px] w-full rounded-md border border-[#cfcfcf]
                  bg-white pl-4 pr-10 text-[14px] text-[#444]
                  outline-none placeholder:text-[#9a9a9a]
                "
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
              />
            </div>
          </div>
        </div>

        {/* right gallery */}
        <div className="relative flex-1 bg-[#f3f3f3] p-4">
          {/* fake scrollbar indicator */}
          <div className="absolute right-3 top-6 h-6 w-[4px] rounded-full bg-[#bdbdbd]" />

          <div className="h-full overflow-hidden rounded-md">
            <div className="space-y-3">
              <div className="relative h-[430px] w-full overflow-hidden rounded-sm bg-[#ddd]">
                <Image
                  src="/imageDemo/city-street.jpg"
                  alt="Recommended image 1"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-[120px] w-full overflow-hidden rounded-sm bg-[#ddd]">
                <Image
                  src="/imageDemo/golden-shadow.jpg"
                  alt="Recommended image 2"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-[150px] w-full overflow-hidden rounded-sm bg-[#ddd]">
                <Image
                  src="/imageDemo/third-image.jpg"
                  alt="Recommended image 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* left pointer / arrow */}
      <div
        className="
          absolute left-[-8px] top-[305px]
          h-4 w-4 rotate-45
          border-l border-t border-[#d9d9d9]
          bg-[#f7f7f7]
        "
      />
    </div>
  );
}