import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Preview from "./components/Preview";

export default function App() {
  const [blocks, setBlocks] = useState([]);

  // DAY 3: Add new block
  function addBlock(type) {
    const newBlock = { type };
    setBlocks((prev) => [...prev, newBlock]);
  }

  return (
    <div className="min-h-screen px-6">
      {/* DAY 1: Header */}
      <Header />

      <div className="grid grid-cols-12 gap-4 mt-5">
        {/* DAY 1 + 2: Sidebar */}
        <div className="col-span-2">
          <Sidebar addBlock={addBlock} />
        </div>

        {/* DAY 1 + 3: Canvas */}
        <div className="col-span-6">
          <Canvas blocks={blocks} />
        </div>

        {/* DAY 1 + 3: Preview */}
        <div className="col-span-4">
          <Preview blocks={blocks} />
        </div>
      </div>
    </div>
  );
}
