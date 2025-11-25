import React from "react";

function RenderBlock({block}){
    switch(block.type){

        case "text":
            return <p className="text-lg font-medium text-gray-800 leading-relaxed">Sample text goes here...</p>

        case "image":
            return (
                <div className="border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
                    <img src="https://via.placeholder.com/400x200" className="rounded" alt="placeholder" />
                </div>

            ) 

        case "button":
            return (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition">Click Me</button>
            )
            
        case "divider":
            return <hr className="my-6 border-gray-400"/>;

        case "footer":
            return <p className="text-gray-700 text-sm tracking-wide">@LK Web Builder - All rights reserved.</p>;

        default:
            return null;
    }
}

export default RenderBlock;