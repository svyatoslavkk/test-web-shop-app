import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { loadCartFromStorage } from "../../store/cart/slice";
import { Badge, Button, Flex, Switch } from "antd";
import { selectCartItemsCount } from "../../store/cart/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Header.css";
import { useTheme } from "../../providers";

export const Header = () => {
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();

  const isCartPage = location.pathname === "/cart";
  const isProductsPage = location.pathname === "/";

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <header className="header">
      <Flex
        justify="center"
        align="center"
        className="header-container"
        gap={16}
      >
        <nav>
          <Flex gap={16} align="center" justify="center">
            <Button
              type={isProductsPage ? "primary" : "default"}
              onClick={() => navigate("/")}
            >
              Товары
            </Button>
            <Badge count={cartItemsCount}>
              <Button
                type={isCartPage ? "primary" : "default"}
                onClick={() => navigate("/cart")}
                icon={<ShoppingCart size={16} />}
              >
                Корзина
              </Button>
            </Badge>
          </Flex>
        </nav>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={mode === "dark"}
          onChange={toggleTheme}
        />
      </Flex>
    </header>
  );
};

export default Header;
