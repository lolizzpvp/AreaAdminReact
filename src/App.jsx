import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Users from "./Users";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                    <Route path="/users" element={<Users />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;