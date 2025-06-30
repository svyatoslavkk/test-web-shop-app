import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Cart, ProductList } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
