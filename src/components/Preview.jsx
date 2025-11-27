import React from "react";
import RenderBlock from "./RenderBlock";

export default function Preview({ blocks }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow min-h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>

      {blocks.length === 0 && (
        <p className="text-gray-400">Preview will appear here…</p>
      )}

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={index}>
            {block.type === "text" && <p className="text-gray-900">Sample text goes here…</p>}
            {block.type === "image" && (
              <img
                className="rounded-lg"
                src="https://via.placeholder.com/400x200"
                alt="image"
              />
            )}
            {block.type === "button" && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Click Me
              </button>
            )}
            {block.type === "divider" && <hr />}
            {block.type === "footer" && (
              <p className="text-gray-700">@LK Web Builder — All rights reserved.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
