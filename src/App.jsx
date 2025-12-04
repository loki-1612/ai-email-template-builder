import React, { useState } from "react";   // ✅ FIX: Add React import
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Preview from "./components/Preview";

export default function App() {
  const [blocks, setBlocks] = useState([]);

  // DAY 4: schema-based block creation
  const addBlock = (type) => {
    let newBlock = {
      id: crypto.randomUUID(),
      type,
      content: "",
      settings: {
        align: "left",
        fontSize: 16,
        color: "#1e293b",
      },
    };

    // default content based on type
    if (type === "text") newBlock.content = "Sample text goes here…";

    if (type === "image")
      newBlock.content = "https://via.placeholder.com/400x200";

    if (type === "button")
      newBlock.content = { label: "Click Me", url: "#" };

    if (type === "footer")
      newBlock.content = "@LK Web Builder — All rights reserved.";

    if (type === "divider") newBlock.content = null;

    setBlocks((prev) => [...prev, newBlock]);
  };

  return (
    <div className="min-h-screen px-6 bg-gray-100">
      <Header />

      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-2">
          <Sidebar addBlock={addBlock} />
        </div>

        <div className="col-span-6">
          <Canvas blocks={blocks} />
        </div>

        <div className="col-span-4">
          <Preview blocks={blocks} />
        </div>
      </div>
    </div>
  );
}
