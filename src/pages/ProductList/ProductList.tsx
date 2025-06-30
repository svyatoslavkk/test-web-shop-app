import { ProductCard } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { Typography, Alert, Flex, Spin } from "antd";
import { useGetProductsQuery } from "../../store/api";
import "./ProductList.css";

export const ProductList = () => {
  const { Title, Paragraph } = Typography;
  const dealers = useAppSelector((state) => state.config.dealers);
  const { data: products, isLoading, error } = useGetProductsQuery(dealers);

  if (isLoading) {
    return (
      <Flex gap={8} align="center" justify="center">
        <Spin size="default" />
        <Paragraph style={{ margin: 0 }}>Загрузка товаров...</Paragraph>
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка при загрузке товаров. Попробуйте обновить страницу."
        type="error"
        showIcon
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Flex className="products-not-found">
        <Paragraph>Товары не найдены</Paragraph>
      </Flex>
    );
  }

  return (
    <Flex vertical>
      <Title level={1}>Каталог товаров</Title>

      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={`${product.name}-${index}`} product={product} />
        ))}
      </div>
    </Flex>
  );
};

export default ProductList;
