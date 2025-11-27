import React from "react";

export default function Sidebar({ addBlock }) {
  return (
    <aside className="bg-gray-200 p-4 rounded-xl shadow space-y-3">
      <h2 className="text-lg font-semibold mb-2">Add Blocks</h2>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => addBlock("text")}>
        Text Block
      </button>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => addBlock("image")}>
        Image Block
      </button>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => addBlock("button")}>
        Button Block
      </button>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => addBlock("divider")}>
        Divider
      </button>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => addBlock("footer")}>
        Footer
      </button>
    </aside>
  );
}
