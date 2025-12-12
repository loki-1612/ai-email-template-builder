import React from "react";
import RenderBlock from "./RenderBlock";

export default function Preview({ blocks }) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Email Preview</h2>

      {/* Scrollable container */}
      <div className="bg-gray-50 border rounded-lg p-4 h-[500px] overflow-y-auto shadow-inner">
        
        {/* Centered email width */}
        <div className="max-w-[600px] mx-auto space-y-4">
          
          {blocks.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Your email preview will appear here…
            </p>
          ) : (
            blocks.map((block) => (
              <div key={block.id}>
                <RenderBlock block={block} />
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}
