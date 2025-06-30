import { useNavigate } from "react-router-dom";
import { CartItem } from "../../components";
import { clearCart } from "../../store/cart/slice";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCartItems, selectCartTotal } from "../../store/cart/selectors";
import { Card, Button, Typography, Divider, Col, Space, Flex, Row } from "antd";

export const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const { Title, Text, Paragraph } = Typography;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <Card>
        <Flex vertical gap={16} align="center">
          <ShoppingBag size={64} color="gray" />
          <Title level={3} style={{ margin: 0 }}>
            Корзина пуста
          </Title>
          <Paragraph>Добавьте товары из каталога</Paragraph>
          <Button type="primary" variant="solid" onClick={() => navigate("/")}>
            Перейти к покупкам
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Col>
      <Flex gap={16} justify="space-between" wrap="wrap">
        <Title level={2} style={{ margin: 0 }}>
          Корзина
        </Title>
        <Button variant="filled" danger onClick={handleClearCart}>
          <Trash2 size={16} />
          Очистить корзину
        </Button>
      </Flex>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Space>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Итого</Title>
            <Flex justify="space-between">
              <Text>Товаров:</Text>
              <Text>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </Flex>
            <Divider />
            <Flex vertical gap={16}>
              <Flex align="center" justify="space-between" gap={8}>
                <Title level={4} style={{ margin: 0 }}>
                  Total
                </Title>
                <Title level={4} style={{ margin: 0 }}>
                  ${cartTotal.toFixed(2)}
                </Title>
              </Flex>

              <Button type="primary" block size="large">
                Заказать
              </Button>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default Cart;
