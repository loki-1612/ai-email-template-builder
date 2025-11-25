import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Preview from './components/Preview';


export default function App(){
  const[blocks, setBlocks] =useState([]);

  function addBlock(type){
    setBlocks(prev => 
      [...prev, {type}]
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen">
      <Header />

      <div className='grid grid-cols-12 gap-4 mt-4'>
        <div className='col-span-2'>
          <Sidebar 
          addBlock={addBlock}/>
        </div>

        <div className='col-span-7'>
          <Canvas 
          blocks={blocks}/>
        </div>

        <div className='col-span-3'>
          <Preview 
          blocks={blocks}/>
        </div>

      </div>
    </div>
  );
}