import React, { useState } from 'react';
import './Add.css';
import Variable from '../variable/Variable';


function Add() {
    const [A,setA] = useState(0);
    const [B,setB] = useState(0);
        
    return (
        <div>
            <div className='Add-container'>
            <h3 style={{textAlign:'center'}}>Add</h3>
            <h2 className='badge-container'>
                <span className='badge bg-primary'>A={A}</span> 
                <span className='badge bg-primary'>A+B= {A+B}</span> 
                <span className='badge bg-primary'>B={B}</span> 
                </h2>{/* ดูผลลัพท์ */}
            <div className='variable-container'>
                <Variable name="A" value={A} setValue={setA} />
                <Variable name="B" value={B} setValue={setB} />
            </div>
            </div>{/* สร้างตัวแปรและเปลี่ยนค่า */}
        </div>

     );
}

export default Add;

