import {useEffect, useState} from "react";
import {Product} from "../types/Product.ts";
import {API_DATA} from "../constants/constants.ts";
import {CartItem} from "../types/CartItem.ts";
import axios from "axios";

const HomePage = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [cartItems, setCartItems] =
        useState<CartItem[]>(  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : []);


    useEffect(() => {
       const apiCall =async()=>{
           try {
               const response = await axios.get(API_DATA.BASE_URL + 'product/getAllProducts');
               setProducts(response.data.data);
           } catch (e) {
               alert("Error getting products");
               console.log(e);
           }
       }
       apiCall();
    }, []);

    useEffect(() => {
        if ( localStorage.getItem("cart")) {
           setCartItems(JSON.parse(localStorage.getItem("cart")!))
        }
    }, []);

    useEffect(() => {
        addToLocalStorage(cartItems);
    }, [cartItems]);


    function addToCartHandle(product: Product) {

        const cartItem =new CartItem(0,product,1,product.price)
        setCartItems((c: CartItem[]) => [...c, cartItem]);

    }

    function addToLocalStorage(cartItems: CartItem[]) {
        localStorage.setItem("cart", JSON.stringify(cartItems));

    }

    return (
        <>
            <div className="mt-2 h1 text-center"><i className="bi bi-fire text-danger"></i> Hot Deals !</div>

            <div className="container-fluid  text-center">
                <div className="row">
                    {products.map((product: Product ,index:number) => (
                        <div className="col-2" key={index}>
                            <div className="card w-100">

                                <img src={atob(product.image)} style={{maxWidth:'150px', maxHeight:'120px'}}
                                     className="card-img-top align-self-center" alt="product-image"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Original Price: {product.price} LKR</p>
                                    <p className="card-text text-danger fw-bold" hidden={product.discount==0}>Discount: {product.discount} LKR</p>
                                    <button className="btn btn-primary"
                                            onClick={() => addToCartHandle(product)}>Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </>
    )
}

export default HomePage