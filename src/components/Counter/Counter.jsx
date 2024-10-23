import { useState } from 'react'
import './Counter.css'



function Counter(props) {
    // let value = props.value
    //     geter   seter
    const [value,setValue] = useState(props.value || 0)

    function inCrement(){
        setValue(value + 1)
    }//เปลี่ยนค่า
    
    function deCrement(){
        setValue(value - 1)
    }//เปลี่ยนค่า

    return ( 
        <div >
            <div className='Counter-container'>
            <h1 className='Counter-title'>{props.name||'counter'}</h1>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button className='btn btn-danger' onClick={deCrement}>-</button>
            <span className='Counter-value'>{value}</span>
            <button className='btn btn-primary' onClick={inCrement}>+</button>
            </div>
            </div>
        </div>//เปลี่ยนค่าโดยกดปุ่ม
     );
}

export default Counter;