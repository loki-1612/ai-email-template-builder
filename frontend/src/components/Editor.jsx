import React, { useState } from "react";
import { generateText } from "../utils/ai";

let isGenerating = false; // cooldown flag

export default function Editor({ selectedBlock, blocks, updateBlock }) {
  // ---------- SAFETY ----------
  if (!selectedBlock || !blocks[selectedBlock.index]) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center text-gray-400">
        Select a block to edit
      </div>
    );
  }

  // ---------- BASIC DATA ----------
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

  // ---------- AI GENERATION ----------
  async function handleGenerate(kind) {
    if (isGenerating) return;

    isGenerating = true;
    setLoading(true);

    let prompt = "";

    if (kind === "headline") {
      prompt = `Write an email headline in a ${tone} tone.`;
    } else if (kind === "description") {
      prompt = `Write a 2-3 sentence email description in a ${tone} tone.`;
    } else if (kind === "subject") {
      prompt = `Write a short subject line in a ${tone} tone.`;
    }

    try {
      const aiText = await generateText(prompt);
      updateBlock(index, { content: aiText });
    } catch (err) {
      console.error("AI Error:", err);
    }

    setLoading(false);

    setTimeout(() => {
      isGenerating = false;
    }, 1200);
  }

  // ---------- TEXT BLOCK ----------
  if (type === "text") {
    return (
      <div className="bg-white p-4 rounded-xl shadow space-y-5">
        <h3 className="text-lg font-semibold text-gray-700">Edit Text</h3>

        <textarea
          value={block.content}
          onChange={(e) => {
            updateBlock(index, { content: e.target.value });
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="border p-3 w-full rounded-lg min-h-[80px] resize-none"
        />

        {/* AI Tone */}
        <div>
          <label className="text-sm font-semibold text-gray-600">
            AI Tone: <span className="text-blue-600">{toneLabels[tone]}</span>
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2 bg-gray-50"
          >
            <option value="friendly">Friendly 😊</option>
            <option value="professional">Professional 💼</option>
            <option value="urgent">Urgent ⚡</option>
            <option value="casual">Casual 😎</option>
            <option value="persuasive">Persuasive 🎯</option>
          </select>
        </div>

        {/* AI Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleGenerate("headline")}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "✨ Generating…" : "⚡ Generate Headline"}
          </button>

          <button
            onClick={() => handleGenerate("description")}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "✨ Generating…" : "⚡ Generate Description"}
          </button>

          <button
            onClick={() => handleGenerate("subject")}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "✨ Generating…" : "⚡ Generate Subject Line"}
          </button>
        </div>

        {/* Status Box */}
        <div className="bg-gray-50 p-3 rounded-lg border min-h-[60px] flex items-center justify-center">
          <p className="text-gray-600 text-sm text-center">
            {loading
              ? "✨ AI is generating content…"
              : "AI ready! See the result in the preview →"}
          </p>
        </div>
      </div>
    );
  }

  // ---------- IMAGE BLOCK ----------
  if (type === "image") {
    return (
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Edit Image</h3>
        <input
          type="text"
          value={block.content}
          onChange={(e) => updateBlock(index, { content: e.target.value })}
          className="border p-2 w-full rounded-lg"
        />
      </div>
    );
  }

  // ---------- BUTTON BLOCK ----------
  if (type === "button") {
    return (
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Edit Button</h3>

        <input
          type="text"
          value={block.content.label}
          onChange={(e) =>
            updateBlock(index, {
              content: { ...block.content, label: e.target.value },
            })
          }
          className="border p-2 w-full rounded-lg"
          placeholder="Button Label"
        />

        <input
          type="text"
          value={block.content.url}
          onChange={(e) =>
            updateBlock(index, {
              content: { ...block.content, url: e.target.value },
            })
          }
          className="border p-2 w-full rounded-lg"
          placeholder="Button URL"
        />
      </div>
    );
  }

  // ---------- FOOTER BLOCK ----------
  if (type === "footer") {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-700">Edit Footer</h3>
        <textarea
          value={block.content}
          onChange={(e) => updateBlock(index, { content: e.target.value })}
          className="border p-2 w-full rounded-lg h-24"
        />
      </div>
    );
  }

  return null;
}
