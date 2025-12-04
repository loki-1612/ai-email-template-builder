import React from "react";
import RenderBlock from "./RenderBlock";

export default function Preview({ blocks }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow h-[500px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>

      {blocks.map((block) => (
        <div key={block.id} className="mb-4">
          {block.type === "text" && (
            <p
              style={{
                textAlign: block.settings.align,
                fontSize: block.settings.fontSize,
                color: block.settings.color,
              }}
            >
              {block.content}
            </p>
          )}

          {block.type === "image" && (
            <img className="rounded-lg" src={block.content} alt="preview-img" />
          )}

          {block.type === "button" && (
            <a
              href={block.content.url}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block"
            >
              {block.content.label}
            </a>
          )}

          {block.type === "divider" && <hr />}

          {block.type === "footer" && (
            <p className="text-gray-600 text-sm">{block.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
