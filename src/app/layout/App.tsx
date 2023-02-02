import { ContactPage } from "@mui/icons-material";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catlog from "../../features/catlog/Catlog";
import ProductDetalis from "../../features/catlog/ProductDetalis";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/BasketSlice";
import Register from "../../features/account/Register";
import Login from '../../features/account/Login'
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import Test from "../../features/test/Test";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:7539/api/Products", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Access-Control-Allow-Origin' : 'http://localhost:3000'
  //     },
  //   }).then(res => res.json()).then(data => console.log(data))
  // });

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }
    catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp]);

  const [darkMode, setDArkMode] = useState<boolean>(false);
  const paletterType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletterType,
      background: {
        default: paletterType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  const handleThemeChange = () => {
    setDArkMode(!darkMode);
  };

  if (loading) return <LoadingComponents message="Initialisin App..." />;
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Container sx = {{mt : 4}}><Outlet /></Container>} >
            <Route path="/catalog" element={<Catlog />} />
            <Route path="/catalog/:id" element={<ProductDetalis />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/basket" element={<BasketPage />} />
            {/* <PrivateRoute>
              <Route path="/checkout" element={<CheckOut />} />
            </PrivateRoute> */}
            <Route path='/checkout' element={<PrivateRoute component={CheckoutWrapper} />} />
            <Route path='/orders' element={<PrivateRoute component={Orders} />} />
            <Route path='/inventory' element={<PrivateRoute roles={['Admin']} component={Inventory} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
