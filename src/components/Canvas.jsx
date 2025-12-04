import React from "react";
import RenderBlock from "./RenderBlock";

export default function Canvas({ blocks }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow min-h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Canvas</h2>

      {blocks.length === 0 && (
        <p className="text-gray-500 text-center mt-20">
          Add blocks to start building your email…
        </p>
      )}

      <div className="space-y-4">
        {blocks.map((block) => (
          <div key={block.id} className="border p-4 rounded-lg bg-white">
            <RenderBlock block={block} />
          </div>
        ))}
      </div>
    </div>
  );
}
