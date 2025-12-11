import React, { useState } from "react";
import RenderBlock from "./RenderBlock";
import { motion, AnimatePresence } from "framer-motion";

export default function Canvas({ blocks, reorderBlocks, setSelectedBlock }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (index !== hoverIndex) {
      setHoverIndex(index);
    }
  };

  const handleDrop = (index) => {
    reorderBlocks(dragIndex, index);
    setDragIndex(null);
    setHoverIndex(null);
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

              {/* DROP INDICATOR above block */}
              {hoverIndex === index && dragIndex !== null && (
                <motion.div
                  layout
                  className="h-2 bg-blue-300 rounded-md my-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* DRAGGABLE + CLICKABLE BLOCK */}
              <motion.div
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onClick={() =>
                  setSelectedBlock({ index, type: block.type })
                }
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg shadow border cursor-pointer transition
                bg-gray-50 hover:bg-gray-100
                ${dragIndex === index ? "opacity-50 border-blue-500" : "border-gray-300"}`}
              >
                <RenderBlock block={block} />
              </motion.div>

              {/* DROP INDICATOR after last block */}
              {index === blocks.length - 1 &&
                hoverIndex === blocks.length && (
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
