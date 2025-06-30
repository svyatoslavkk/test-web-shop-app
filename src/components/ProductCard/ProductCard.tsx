import { useState } from "react";
import type { Product } from "../../types/index";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cart/slice";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Card, Col, Button, Input, Typography, Flex, Image } from "antd";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { Title, Paragraph } = Typography;
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  return (
    <Card className="product-card">
      <Col>
        <Image
          src={`https://test-frontend.dev.int.perx.ru${product.image}`}
          alt={product.name}
          height={200}
          width="100%"
          className="product-card-image"
        />
        <Title
          level={3}
          ellipsis={{
            rows: 3,
            expandable: "collapsible",
          }}
        >
          {product.name}
        </Title>
        <Paragraph className="product-price">
          ${product.price.toFixed(2)}
        </Paragraph>
      </Col>

      <Flex vertical gap={8}>
        <Flex gap={8} justify="center">
          <Button
            variant="outlined"
            size="small"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </Button>

          <Input
            size="small"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="quantity-input"
          />

          <Button variant="outlined" size="small" onClick={incrementQuantity}>
            <Plus size={16} />
          </Button>
        </Flex>

        <Button onClick={handleAddToCart} icon={<ShoppingCart size={16} />}>
          В корзину
        </Button>
      </Flex>
    </Card>
  );
};

export default ProductCard;
