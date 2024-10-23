import Counter from "../../components/Counter/Counter";
import Timer from "../../components/Timer/Timer";
import Temperatures from "../../components/Temperatures/Temperatures";
import Add from "../../components/Add/Add";

import "./Components.css";

function Components() {
  return (
    <div className="components-container">
      <div className="sup-Components-container">
        <div className="Titel-Components">
          <h1>
            <span className="badge bg-black" style={{ pointerEvents: "none" }}>
              REACT COMPONENTS
            </span>
          </h1>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Counter name={""} value={0} />
              </div>
              <div className="col">
                <Timer />
              </div>
            </div>
          </div>
          <div className="col">
            <Add />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Temperatures />
          </div>
        </div>
        <div className="Titel-Components">
          <h3>
            <span className="badge bg-black" style={{ pointerEvents: "none" }}>
              นายอัมรินทร์ ทรายแก้ว รหัสนักศึกษา 66057161
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Components;
