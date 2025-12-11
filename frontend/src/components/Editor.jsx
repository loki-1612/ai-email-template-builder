import React, { useState } from "react";
import { generateText } from "../utils/ai";

let isGenerating = false; // cooldown

export default function Editor({ selectedBlock, blocks, updateBlock }) {
  if (selectedBlock === null) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center text-gray-400">
        Select a block to edit
      </div>
    );
  }

  const { index, type } = selectedBlock;
  const block = blocks[index];

  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("friendly");

  const toneLabels = {
    friendly: "Friendly 😊",
    professional: "Professional 💼",
    urgent: "Urgent ⚡",
    casual: "Casual 😎",
    persuasive: "Persuasive 🎯",
  };

  async function handleGenerate(promptType) {
    if (isGenerating) return;

    isGenerating = true;
    setLoading(true);

    let prompt = "";

    if (promptType === "headline") {
      prompt = `Write an email headline in a **${tone}** tone.`;
    } else if (promptType === "description") {
      prompt = `Write a 23 sentence email description in a **${tone}** tone.`;
    }

    try {
      const aiText = await generateText(prompt);

      updateBlock(index, {
        ...block,
        content: aiText,
      });
    } catch (error) {
      console.error("AI Error:", error);
    }

    setLoading(false);

    setTimeout(() => {
      isGenerating = false;
    }, 1200);
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Edit Text</h3>

      {/* TEXTAREA */}
      <textarea
        value={block.content}
        onChange={(e) => {
          updateBlock(selectedBlock, e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        className="border p-3 w-full rounded-lg h-32 shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      {/* 🔥 TONE SLIDER */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          AI Tone: <span className="text-blue-600">{toneLabels[tone]}</span>
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mt-1 w-full border rounded-lg p-2 bg-gray-50 shadow-sm"
        >
          <option value="friendly">Friendly 😊</option>
          <option value="professional">Professional 💼</option>
          <option value="urgent">Urgent ⚡</option>
          <option value="casual">Casual 😎</option>
          <option value="persuasive">Persuasive 🎯</option>
        </select>
      </div>

      {/* AI BUTTONS */}
      <div className="space-y-2">
        <button
          onClick={() => handleGenerate("headline")}
          disabled={loading}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          {loading ? "✨ Generating..." : "⚡ Generate Headline"}
        </button>

        <button
          onClick={() => handleGenerate("description")}
          disabled={loading}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          {loading ? "✨ Generating..." : "⚡ Generate Description"}
        </button>

        <button
          onClick={() => handleGenerate("subject")}
          disabled={loading}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-600 text-white px-4 py-2 rounded-lg shadow"
        >
          {loading ? "✨ Creating Subject Line..." : "⚡ Generate Subject Line"}
        </button>
      </div>

      {/* AI OUTPUT PREVIEW BOX */}
      <div className="bg-gray-50 p-3 rounded-lg border shadow-inner min-h-[80px] flex items-center justify-center">
        <p className="text-gray-600 text-sm text-center">
          {loading
            ? "✨ AI is generating content…"
            : "AI is ready! Preview the result on the right →"}
        </p>
      </div>
    </div>
  );
}
