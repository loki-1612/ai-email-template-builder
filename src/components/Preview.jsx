import React from "react";
import RenderBlock from "./RenderBlock";

function Preview({blocks}){
    return(
        <div className="bg-white p-6 rounded-xl shadow-md min-h-[600px] border border-gray-200">
            <h2 className="font-semibold text-lg mb-4 bg-gray-500">
                Preview
            </h2>

            {blocks.length === 0 && (
                <p className="text-gray-400 mt-20 text-center">
                Preview will appear here...
            </p>
            )}

            {blocks.map((block, index) => (
                <div key={index} className="mb-3">
                    <RenderBlock block={block} />
                </div>
            ))}
        </div>
    )

}

export default Preview;