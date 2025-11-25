import React from "react";

function Sidebar({addBlock}){
    return (
        <div className="bg-white p-4 rounded-xl shadow h-full">
            <h2 className="font-semibold text-lg mb-3 ml-10 text-black">Elements</h2>
            <div className="flex flex-col gap-2">
                <button className="bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow" onClick={()=>addBlock("image")}>Image Block</button>
                <button className="bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow" onClick={()=>addBlock("text")}>Text Block</button>
                <button className="bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow" onClick={()=>addBlock("button")}>Button</button>
                <button className="bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow" onClick={()=>addBlock("divider")}>Divider</button>
                <button className="bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow" onClick={()=>addBlock("footer")}>Footer</button>
            </div>
        </div>
    );
}

export default Sidebar;