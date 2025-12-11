import React, { useState } from "react";   
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Preview from "./components/Preview";
import Editor from "./components/Editor";

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null); 

  // ⭐ Day 4 - schema-based block creation
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

    if (type === "text") newBlock.content = "Sample text goes here…";
    if (type === "image") newBlock.content = "https://via.placeholder.com/400x200";
    if (type === "button") newBlock.content = { label: "Click Me", url: "#" };
    if (type === "footer") newBlock.content = "@LK Web Builder — All rights reserved.";
    if (type === "divider") newBlock.content = null;

    setBlocks((prev) => [...prev, newBlock]);
  };

  // ⭐ DAY 5 — Reorder blocks (drag & drop)
  const reorderBlocks = (fromIndex, toIndex) => {
    const updated = [...blocks];
    const movedItem = updated.splice(fromIndex, 1)[0];
    updated.splice(toIndex, 0, movedItem);
    setBlocks(updated);
  };

  // ⭐ DAY 6 — Update block content/settings
  const updateBlock = (index, newData) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], ...newData };
    setBlocks(updated);
  };

  return (
    <div className="min-h-screen px-6 bg-gray-100">
      <Header />

      <div className="grid grid-cols-12 gap-4 mt-5">
        
        <div className="col-span-2">
          <Sidebar addBlock={addBlock} />
        </div>

        <div className="col-span-6">
          <Canvas
            blocks={blocks}
            reorderBlocks={reorderBlocks}
            setSelectedBlock={setSelectedBlock}  
          />
        </div>

        <div className="col-span-2">
          <Editor
            selectedBlock={selectedBlock}  
            blocks={blocks}
            updateBlock={updateBlock}
          />
        </div>

        <div className="col-span-2">
          <Preview blocks={blocks} />
        </div>

      </div>
    </div>
  );
}
