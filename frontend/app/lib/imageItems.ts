export type ImageGalleryItem = {
  id: string;
  src: string;
  alt: string;
  width: number;   // original image width
  height: number;  // original image height
  objectPosition?: string;
};

export const imageItems: ImageGalleryItem[] = [
  {
    id: "img-1",
    src: "/imageDemo/1.jpg",
    alt: "City street",
    width: 1200,
    height: 930,
    objectPosition: "center center",
  },
  {
    id: "img-2",
    src: "/imageDemo/2.jpg",
    alt: "Golden shadow",
    width: 1200,
    height: 110,
    objectPosition: "center center",
  },
  {
    id: "img-3",
    src: "/imageDemo/3.jpg",
    alt: "Warm building",
    width: 1200,
    height: 180,
    objectPosition: "center center",
  },
  {
    id: "img-4",
    src: "/imageDemo/4.jpg",
    alt: "Nature light",
    width: 1200,
    height: 150,
    objectPosition: "center center",
  },
  {
    id: "img-5",
    src: "/imageDemo/5.jpg",
    alt: "Street view",
    width: 1200,
    height: 240,
    objectPosition: "center center",
  },
  {
    id: "img-6",
    src: "/imageDemo/6.jpg",
    alt: "Orange wall",
    width: 1200,
    height: 130,
    objectPosition: "center center",
  },
  {
    id: "img-7",
    src: "/imageDemo/2.jpg",
    alt: "Minimal texture",
    width: 1200,
    height: 200,
    objectPosition: "center center",
  },
  {
    id: "img-8",
    src: "/imageDemo/3.jpg",
    alt: "Travel mood",
    width: 1200,
    height: 160,
    objectPosition: "center center",
  },
  {
    id: "img-9",
    src: "/imageDemo/4.jpg",
    alt: "Calm window",
    width: 1200,
    height: 220,
    objectPosition: "center center",
  },
  {
    id: "img-10",
    src: "/imageDemo/5.jpg",
    alt: "Soft sunlight",
    width: 1200,
    height: 170,
    objectPosition: "center center",
  },
];