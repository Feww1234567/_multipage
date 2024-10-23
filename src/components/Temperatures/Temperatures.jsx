import './Temperatures.css';
import Variable from '../variable/Variable';

import { useEffect, useState } from 'react';

function Temperatures({name,startCelsius}) {
    const [Celsius, setCelsius] = useState(startCelsius || 25);//เปลี่ยนเป็นเซลเซียส
    const [Fahrenheit, setFahrenheit] = useState(
        (startCelsius || 25) * 9 / 5 + 32
    );//เปลี่ยนเป็นฟาเรนไฮต์
    const [Kelvin, setKelvin] = useState(
        (startCelsius || 25) + 273.15
    );//เปลี่ยนเป็นเคลวิน

    const toFahrenheit = (Celsius) => (Celsius * 9 / 5) + 32;//แปลงเป็นฟาเรนไฮต์
    const toKelvin = (Celsius) => Celsius + 273.15;//แปลงเป็นเคลวิน
    const toCelsius = (Fahrenheit) => ((Fahrenheit-32) * 5 / 9);//แปลงเป็นเซลเซียส

    const roundTo2Decimal = (num) => Math.round((num + Number.EPSILON) * 100) / 100;//ทศนิยมสองตำแหน่ง


    useEffect(() => {
        setKelvin(roundTo2Decimal(toKelvin(Celsius)));
    },[Celsius]);//เรียกใช้งานการแปลงเคลวินจากองศา
    useEffect(() => {
        setCelsius(roundTo2Decimal(toCelsius(Fahrenheit)));
    },[Fahrenheit]);//เรียกใชงานการแปลงเซลเซียสจากฟาเรนไฮต์    
    useEffect(() => {
        setFahrenheit(roundTo2Decimal(toFahrenheit(Kelvin - 273.15)));
    },[Kelvin]);//เรียกใช้งานการแปลงฟาเรนไฮด์จากเคลวิน


    return ( 
    <div>
        <div className='Temperatures-container'>
        <h3 style={{textAlign:'center'}}>{name || "Temperatures"}</h3>
        <h4 className='badge-container'>
            <span className='badge bg-primary'>{Celsius.toFixed(2)}C </span>
            <span className='badge bg-primary'>{Fahrenheit.toFixed(2)}F </span>
            <span className='badge bg-primary'>{Kelvin.toFixed(2)}K </span>
        </h4>
        {/* แสดงค่าเซลเซียส ฟาเรนไฮต์ เคลวิน */}
        <div className='Temperatures-variable-container'>
            <Variable name="Celsius" type="float" value={Celsius} setValue={setCelsius} />
            <Variable name="Fahrenheit" type="float" value={Fahrenheit} setValue={setFahrenheit} />
            <Variable name="Kelvin" type="float" value={Kelvin} setValue={setKelvin} />
        </div> 
        </div>
        {/* แสดงค่าเซลเซียส ฟาเรนไฮต์ เคลวิน จากVariable */}
    </div> );
}

export default Temperatures;


