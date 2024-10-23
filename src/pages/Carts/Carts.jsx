import "./Carts.css";
import { Card, Button } from "react-bootstrap";

function Carts({ carts, setCarts }) {
  return (
    <div className="Carts-container">
      <div className="item-carts-container">
        {carts.map((cart) => (
          <Card key={cart.id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={cart.thumbnailUrl} alt={cart.title} />
            <Card.Body>
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>Cost:$ {cart.price}</Card.Text>
              <Button
                className="card-button"
                variant="outline-danger"
                onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="Total-Footer-container">
        <h3>
          item:
          <i className="bi bi-cart-fill">
            <b className="badge bg-danger">{carts.length}&nbsp;Item</b>
          </i>
          - price:
          <i class="bi bi-currency-dollar">
            <b className="badge bg-success">
              &nbsp;
              {carts.reduce((total, cart) => total + cart.price, 0).toFixed(2)}
            </b>
          </i>
        </h3>
        <div className="checkout-button-container">
          <button className="btn btn-warning" style={{ width: "20%" }}>
            Check out <i class="bi bi-credit-card-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carts;
