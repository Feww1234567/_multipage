import "./Variable.css";

function Variable({name,value,setValue}) {
  return (
    <div>
      <div className="Main-variable-container">
      <h1 className="title">{name || 'counter'}</h1>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <button className="btn btn-danger" onClick={() => setValue(value - 1)}>
        -
      </button>
      <span className="value">{value}</span>
      <button className="btn btn-primary" onClick={() => setValue(value + 1)}>
        +
      </button>
      </div>
      </div>
    </div>//สร้างตัวแปรและเปลี่ยนค่าไว้ใช้ในงานต่างๆ
  );
}

export default Variable;
