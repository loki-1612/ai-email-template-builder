import React from "react";

function Sidebar(){
    return (
        <div className="bg-white p-4 rounded-xl shadow h-full">
            <h2 className="font-semibold text-lg mb-3">Elements</h2>
            <div className="flex flex-col gap-2">
                <button className="bg-gray-200 p-2 rounded">Text Block</button>
                <button className="bg-gray-200 p-2 rounded">Image Block</button>
                <button className="bg-gray-200 p-2 rounded">Button</button>
                <button className="bg-gray-200 p-2 rounded">Divider</button>
                <button className="bg-gray-200 p-2 rounded">Footer</button>
            </div>
        </div>
    );
}

export default Sidebar;