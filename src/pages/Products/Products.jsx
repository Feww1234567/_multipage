import "./Products.css";
import { Card, Button } from "react-bootstrap";

function Products({ producths, carts, setCarts }) {
  return (
    <div className="Products-container">
      <div className="item-products-container">
        {producths.map((product) => (
          <Card key={product.id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Img
              variant="top"
              src={product.thumbnailUrl}
              alt={product.title}
            />
            <Card.Body className="card-body">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>Cost: ${product.price}</Card.Text>
              {carts.find((carts) => carts.id === product.id) ? (
                <button className="btn btn-success card-button" disabled>
                  Added
                </button>
              ) : (
                <Button
                  variant="outline-primary"
                  className="card-button"
                  onClick={() => setCarts([...carts, product])}
                >
                  Add to cart
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
