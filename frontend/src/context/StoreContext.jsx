import { useEffect, useState, useCallback } from "react";
import { food_list as staticFoodList } from "../assets/assets";
import axios from "axios";
import { StoreContext } from "./StoreContext.js";

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    // Determine API base from Vite env, remove any trailing /api so existing code can append /api/*
    const envApi = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const url = envApi.replace(/\/api\/?$/, "");
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    const [tableNo, setTableNo] = useState("");
    const [orderStatus, setOrderStatus] = useState("Pending");
    const [waiterAssigned, setWaiterAssigned] = useState("");
    const [billNumber, setBillNumber] = useState("");
    const [orderId, setOrderId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [userId, setUserId] = useState("");

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for(const item in cartItems){
    //         if(cartItems[item]>0){
    //             let iteminfo = food_list.find((product) => product._id === item);
    //             totalAmount += iteminfo.price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const iteminfo = food_list.find(
            (product) => String(product._id) === String(item)
          );
          if (iteminfo && typeof iteminfo.price === "number") {
            totalAmount += iteminfo.price * cartItems[item];
          }
        }
      }
      return totalAmount;
    };



    useEffect(() => {
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
        if(localStorage.getItem("tableNo")){
            setTableNo(localStorage.getItem("tableNo"))
        }
    },[])

    const fetchFoodList = useCallback(async() => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.data && response.data.data.length > 0) {
                setFoodList(response.data.data);
            } else {
                // Fallback to static food list if DB is empty
                setFoodList(staticFoodList);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
            // Fallback to static food list on error
            setFoodList(staticFoodList);
        }
    }, [url]);


    const loadCartData = useCallback(async (token) => {
        try {
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
            // Ensure we always keep cartItems as an object
            setCartItems(response?.data?.cartData ?? {});
        } catch (err) {
            console.error("Error loading cart data:", err);
            setCartItems({});
        }
    }, [url]);


    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[fetchFoodList, loadCartData])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,setToken,
        tableNo, setTableNo,
        orderStatus, setOrderStatus,
        waiterAssigned, setWaiterAssigned,
        billNumber, setBillNumber,
        orderId, setOrderId,
        searchTerm, setSearchTerm,
        searchResults, setSearchResults,
        userId, setUserId
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider