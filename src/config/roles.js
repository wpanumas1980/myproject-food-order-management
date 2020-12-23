import Home from "../containers/page/Home/Home";
import Login from "../containers/page/Login/Login";
import Register from "../containers/page/Register/Register";
import ProductCart from "../containers/page/ProductCart/ProductCart";
import ProductDetail from "../containers/page/ProductDetail/ProductDetail";
import Profile from "../containers/page/Profile/Profile";
import InputFood from "../containers/page/InputFood/InputFood";

const components = {
    login: {
      path: "/login",
      page: Login
    },
    register: {
      path: "/register",
      page: Register
    },
    home: {
      path: "/",
      page: Home
    },
    profile: {
      path: "/profile",
      page: Profile
    },
    productcart: {
      path: "/productcart",
      page: ProductCart
    },
    productdetail: {
      path: "/productdetail",
      page: ProductDetail
    },
    inputfood: {
      path: "/inputfood",
      page: InputFood
    }
  };
  
  const roles = {
    GUEST: [
      components.home,
      components.login,
      components.register
    ],
    USER: [
      components.home,
      components.productdetail,
      components.productcart,
      components.profile,
      components.inputfood
    ]
  };
  
  export default roles;