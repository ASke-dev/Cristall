import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from './context/CartContext';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// ...другие импорты

// ⚠️ ЗАМЕНИТЕ ЭТО НА ВАШ РЕАЛЬНЫЙ CLIENT ID PAYPAL!
// Используйте 'sb' для Sandbox (тестирования) или ваш реальный ID.
const initialOptions = {
    clientId: "AX30ZHyEiCzr-FYxO9NK0S2_TzOCG21ttY7rY7o7ynVgUm24Xwqrs4OWPYO9ul7vyIY4W1FasLZ1HCPf", 
    currency: "RUB", // Установите вашу валюту (например, RUB, USD, EUR)
    intent: "capture",
};


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
     <PayPalScriptProvider options={initialOptions}>
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
  </PayPalScriptProvider>
);
