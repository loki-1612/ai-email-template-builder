import React from "react";
import { exportEmailHtml } from "../utils/exportHtml";

export default function Header({ blocks, setBlocks, setSelectedBlock }) {
  const handleExport = () => {
    const html = exportEmailHtml(blocks);
    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "email-template.html";
    link.click();
  };

  const handleReset = () => {
    const confirmReset = window.confirm("Clear entire email template?");
    if (!confirmReset) return;

    localStorage.removeItem("email_blocks");
    setBlocks([]);
    setSelectedBlock(null);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">AI Email Template Builder</h1>

      <div className="flex gap-3">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Export HTML
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

