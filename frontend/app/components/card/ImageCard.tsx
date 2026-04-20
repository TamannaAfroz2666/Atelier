"use client";

import { Search } from "lucide-react";
import { LuUpload } from "react-icons/lu";
import { imageItems } from "@/app/lib/imageItems";
import ImagePickerItem from "../pickers/ImagePickerItem";

type ImageCardProps = {
  open: boolean;
  activeTab: "recommended" | "upload";
  onTabChange: (tab: "recommended" | "upload") => void;
};

const GALLERY_IMAGE_WIDTH = 300;
const MAX_GALLERY_HEIGHT = 800;
const MIN_GALLERY_HEIGHT = 400;

function getDisplaySize(width: number, height: number) {
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

export default function ImageCard({
  open,
  activeTab,
  onTabChange,
}: ImageCardProps) {
  if (!open) return null;

  return (
    <div className="pointer-events-auto absolute left-[58px] top-[258px] z-[200]">
      <div className="relative flex h-[586px] w-[670px] overflow-visible rounded-[12px] border border-[#dddddd] bg-[#f6f6f6] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
        <div className="absolute left-[-8px] top-[274px] h-4 w-4 rotate-45 border-b border-l border-[#dddddd] bg-[#f7f7f7]" />

        <div className="flex w-[240px] flex-col justify-between border-r border-[#e8e8e8] bg-[#f7f7f7] px-5 py-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => onTabChange("recommended")}
              className={`flex w-full items-center rounded-[7px] px-2 py-[4px] text-left text-[15px] font-medium transition ${
                activeTab === "recommended"
                  ? "bg-[#e9e9e9] text-[#353535]"
                  : "text-[#4f4f4f] hover:bg-[#ededed]"
              }`}
            >
              Recommended
            </button>

            <button
              type="button"
              onClick={() => onTabChange("upload")}
              className={`flex w-full items-center rounded-[7px] px-2 py-[4px] text-left text-[15px] font-medium transition ${
                activeTab === "upload"
                  ? "bg-[#e9e9e9] text-[#353535]"
                  : "text-[#4f4f4f] hover:bg-[#ededed]"
              }`}
            >
              Upload your own
            </button>
          </div>

          <div>
            <p className="text-[12px] leading-[18px] text-[#8b8b8b]">
              Over 3 million free images
              <br />
              provided by <span className="underline underline-offset-2">Pexels</span>
            </p>

            <div className="relative mt-5">
              <input
                type="text"
                placeholder="Search images..."
                className="h-[38px] w-full rounded-[6px] border border-[#cfcfcf] bg-white pl-4 pr-10 text-[14px] text-[#444] outline-none placeholder:text-[#9c9c9c]"
              />
              <Search
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]"
              />
            </div>
          </div>
        </div>

        <div className="relative flex-1 bg-[#f4f4f4] p-4">
          {activeTab === "recommended" ? (
            <div className="h-full overflow-y-auto pr-2">
              <div className="space-y-[6px]">
                {imageItems.map((item) => {
                  const displaySize = getDisplaySize(item.width, item.height);

                  return (
                    <ImagePickerItem
                      key={item.id}
                      id={item.id}
                      src={item.src}
                      alt={item.alt}
                      originalWidth={item.width}
                      originalHeight={item.height}
                      displayWidth={displaySize.width}
                      displayHeight={displaySize.height}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-[8px] border border-dashed border-[#d5d5d5] bg-white/80 p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f0f0]">
                  <LuUpload size={24} className="text-[#666]" />
                </div>

                <p className="text-[16px] font-medium text-[#3a3a3a]">
                  Upload your own image
                </p>

                <p className="mt-2 text-[13px] leading-5 text-[#8c8c8c]">
                  Drag image here or add file upload logic later
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-[8px] border border-[#d7d7d7] bg-white px-4 py-2 text-[14px] font-medium text-[#444] shadow-sm hover:bg-[#f8f8f8]"
                >
                  Choose file
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}