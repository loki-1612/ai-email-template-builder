import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Preview from './components/Preview';


export default function App(){
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen">
      <Header />

      <div className='grid grid-cols-12 gap-4 mt-4'>
        <div className='col-span-2'>
          <Sidebar />
        </div>

        <div className='col-span-7'>
          <Canvas />
        </div>

        <div className='col-span-3'>
          <Preview />
        </div>

      </div>
    </div>
  );
}