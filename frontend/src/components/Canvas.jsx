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
    setHoverIndex(index);
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

  // ---------- DELETE BLOCK ----------
  const deleteBlock = (index) => {
    const updated = blocks.filter((_, i) => i !== index);
    setBlocks(updated);
    saveToLocal(updated);

    // FIX: Reset selected block after deletion
    setSelectedBlock(null);
  };

  // ---------- DUPLICATE BLOCK ----------
  const duplicateBlock = (index) => {
    const copy = {
      ...blocks[index],
      id: Date.now(),
    };

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
              {/* ---------- DROP INDICATOR ABOVE ---------- */}
              {hoverIndex === index && dragIndex !== null && (
                <motion.div
                  layout
                  className="h-2 bg-blue-300 rounded-md my-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* ---------- BLOCK CARD ---------- */}
              <motion.div
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onClick={() => setSelectedBlock({ index, type: block.type })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-lg shadow border cursor-pointer transition bg-gray-50 hover:bg-gray-100 ${
                  dragIndex === index
                    ? "opacity-50 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {/* DELETE + DUPLICATE BUTTONS */}
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

                {/* RENDER BLOCK */}
                <RenderBlock block={block} />
              </motion.div>

              {/* ---------- DROP INDICATOR AFTER LAST ELEMENT ---------- */}
              {index === blocks.length - 1 && hoverIndex === blocks.length && (
                <motion.div
                  layout
                  className="h-2 bg-blue-300 rounded-md mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
