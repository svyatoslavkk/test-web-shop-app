import { Plus, Minus, Trash2 } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import type { CartItem as CartItemType } from "../../types/index";
import { removeFromCart, updateQuantity } from "../../store/cart/slice";
import { Card, Button, Typography, Col, Flex, Input, Image } from "antd";
import "./CartItem.css";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { Text } = Typography;
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleInputChange = (value: string) => {
    const num = Number.parseInt(value);
    if (!isNaN(num) && num > 0) {
      handleQuantityChange(num);
    }
  };

  return (
    <Card key={item.id}>
      <Flex align="stretch" gap={32} justify="space-between" wrap>
        <Flex gap={16} align="center" justify="flex-start">
          <Image
            width={64}
            src={`https://test-frontend.dev.int.perx.ru${item.product.image}`}
            alt={item.product.name}
          />
          <Col>
            <Text strong>{item.product.name}</Text>
            <br />
            <Text type="secondary">
              Price: ${item.product.price.toFixed(2)}
            </Text>
            <br />
            <Text strong>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </Col>
        </Flex>
        <Flex gap={8} align="center" justify="space-between">
          <Flex align="center" gap={8}>
            <Button
              size="small"
              type="default"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </Button>

            <Input
              type="number"
              size="small"
              min="1"
              value={item.quantity}
              width={48}
              className="quantity-input"
              onChange={(e) => handleInputChange(e.target.value)}
            />

            <Button
              size="small"
              type="default"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} />
            </Button>
          </Flex>
          <Button
            size="small"
            type="text"
            color="danger"
            icon={<Trash2 size={16} color="red" />}
            onClick={handleRemove}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default CartItem;
