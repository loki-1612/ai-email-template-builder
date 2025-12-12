import React from "react";

export default function Sidebar({ addBlock }) {
  return (
    <aside className="bg-gray-200 p-4 rounded-xl shadow space-y-3">
      <h2 className="text-lg font-semibold mb-2">Add Blocks</h2>

      <button
        onClick={() => addBlock("text")}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Text Block
      </button>

      <button
        onClick={() => addBlock("image")}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Image Block
      </button>

      <button
        onClick={() => addBlock("button")}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Button Block
      </button>

      <button
        onClick={() => addBlock("divider")}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Divider
      </button>

      <button
        onClick={() => addBlock("footer")}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Footer
      </button>
    </aside>
  );
}
