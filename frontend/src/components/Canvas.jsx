import React, { useState } from "react";
import RenderBlock from "./RenderBlock";
import { motion, AnimatePresence } from "framer-motion";

export default function Canvas({ blocks, setBlocks, setSelectedBlock }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const saveToLocal = (data) => {
    localStorage.setItem("email_blocks", JSON.stringify(data));
  };

  // ---------- DRAG START ----------
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  // ---------- DRAG OVER ----------
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (hoverIndex !== index) {
      setHoverIndex(index);
    }
  };

  // ---------- DROP (REORDER) ----------
  const handleDrop = (dropIndex) => {
    if (dragIndex === null) return;

    const updated = [...blocks];
    const [movedItem] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, movedItem);

    setBlocks(updated);
    saveToLocal(updated);

    setDragIndex(null);
    setHoverIndex(null);
  };

  // ---------- DELETE ----------
  const deleteBlock = (index) => {
    const updated = blocks.filter((_, i) => i !== index);
    setBlocks(updated);
    saveToLocal(updated);
    setSelectedBlock(null);
  };

  // ---------- DUPLICATE ----------
  const duplicateBlock = (index) => {
    const copy = { ...blocks[index], id: Date.now() };
    const updated = [...blocks];
    updated.splice(index + 1, 0, copy);
    setBlocks(updated);
    saveToLocal(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl min-h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Canvas</h2>

      {blocks.length === 0 && (
        <p className="text-gray-400 text-center mt-20">
          Add blocks from the sidebar to build your template…
        </p>
      )}

      <div className="space-y-2">
        <AnimatePresence>
          {blocks.map((block, index) => (
            <motion.div key={block.id} layout>
              {/* DROP INDICATOR */}
              {hoverIndex === index && dragIndex !== null && (
                <motion.div
                  layout
                  className="h-2 bg-blue-300 rounded-md my-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* BLOCK CARD */}
              <motion.div
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onClick={() => setSelectedBlock({ index, type: block.type })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-lg border cursor-pointer transition
                  
                  ${dragIndex === index ? "opacity-50" : ""}

                  ${
                    // ⭐ DAY 12: Selected block highlight
                    block?.id === blocks[index]?.id &&
                    "border-blue-500 bg-blue-50 shadow-md"
                  }

                  ${
                    dragIndex !== index &&
                    "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }
                `}
              >
                {/* ACTION BUTTONS */}
                <div className="absolute right-3 top-3 flex gap-3">
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBlock(index);
                    }}
                  >
                    🗑
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateBlock(index);
                    }}
                  >
                    📄
                  </button>
                </div>

                {/* BLOCK CONTENT */}
                <RenderBlock block={block} />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
