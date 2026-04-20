
"use client";

import { useState } from "react";
import { Canvas } from "../components/moodBoard/Canvas";
import AddImagePanel from "../components/pickers/AddImagePanel";

export default function ViewHome() {
  const [active, setActive] = useState<string | null>(null);

  return (<>
    <Canvas />
    <AddImagePanel open={active === "addImage"} />
  </>

  );
}
