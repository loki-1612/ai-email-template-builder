import React from "react";
import RenderBlock from "./RenderBlock";

function Canvas({blocks}){
    return(
        <div className="bg-white p-6 rounded-xl shadow-md min-h-[600px] border border-gray-200 0verflow-y-auto">
            <h2 className="font-semibold text-lg mb-4 bg-gray-500">
                Canvas
            </h2>

            {blocks.length===0 && (
                <p className="text-gray-400 mt-20 text-center">
                Drag or click elements to build your email...
            </p>
            )}

            {blocks.map((block, index)=>(
                <div key ={index} className="p-4 rounded-lg mb-4 bg-gray-100 border border-gray-300 hover:shadow transition">
                    
                    <RenderBlock block={block}/>
                </div>
            ))}
            
        </div>
    );

}

export default Canvas;