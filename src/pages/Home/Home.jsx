import "./Home.css";

function Home() {
  return (
    <div className="Home-container">
      <h1 style={{ textAlign: "left", marginLeft: "12vh" }}></h1>
      <div className="main-Home-container">
        <div className="img-container">
          <img src="./ME.jpg" alt="ME" />
        </div>
        <div className="text-container">
          <h3 style={{ textAlign: "left", marginLeft: "4vh" }}>
            Hello I'm Amarin Saikaew
            <br />
            I'm 19 years old
            <br />
            I'm from Thailand
            <br />
            I'm Study at Sripatum University
            <br />
            I'm beginer Font-End Developer
            <br />
          </h3>
          <div style={{ height: "28vh" }}></div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              textDecoration: "underline",
              pointerEvents: "none",
            }}
          >
            This web site is created in Class CSI-205
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
