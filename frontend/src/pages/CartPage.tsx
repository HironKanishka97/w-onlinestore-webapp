import {CartItem} from "../types/CartItem.ts";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [isCartEmpty, setIsCartEmpty] = useState(true)

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cart");

        if (storedCartItems) {
            const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
            if (parsedCartItems.length > 0) {
                setIsCartEmpty(false);
            }
            const mergedCartItems = parsedCartItems.reduce((acc: CartItem[], currentItem: CartItem) => {
                const existingItem = acc.find(item => item.product.id === currentItem.product.id);

                if (existingItem) {
                    existingItem.productCount += currentItem.productCount;
                    existingItem.totalAmount = existingItem.productCount * existingItem.product.price;
                } else {
                    acc.push(currentItem);
                }
                return acc;
            }, []);

            setCartItems(mergedCartItems);
        }
    }, [reload]);


    function removeOneProduct(cartitem: CartItem) {
        const updatedCartItems = cartItems.map(item => {
            if (item.product.id === cartitem.product.id) {
                item.productCount -= 1;
            }
            return item;
        }).filter(item => item.productCount !== 0);
        setCartItems(updatedCartItems);
        if (updatedCartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        }else{
            localStorage.removeItem("cart");
        }
        setReload(!reload);
    }

    function addOneProdut(cartitem: CartItem) {
        cartItems.map(item => {
            if (item.product.id === cartitem.product.id) {
                item.productCount += 1;
            }
        });
        setCartItems(cartItems);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        setReload(!reload);
    }

    return (
        <>
                    <div className="mt-2 h1 text-center"><i className="bi bi-bag-check-fill"></i>
                        {isCartEmpty ? "Your Cart Is Empty" : "Your Cart"}</div>
                    <div className="container-fluid text-center">
                        <div className="row">
                            {cartItems.map((cartitem: CartItem, index: number) => (
                                <div className="col-2" key={index}>
                                    <div className="card w-100">
                                        <img src={atob(cartitem.product.image)}
                                             style={{width: '150px'}} className="card-img-top align-self-center"
                                             alt="cartitem-image"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{cartitem.product.name}</h5>
                                            <p className="card-text">{cartitem.product.description}</p>
                                            <p className="card-text">Original Price: {cartitem.product.price} LKR</p>
                                            <p className="card-text text-danger fw-bold">Discount: {cartitem.product.discount} LKR</p>
                                            <p className="card-text">Count : {cartitem.productCount}</p>
                                            <div className='btn-group gap-2'>
                                                <button className="btn btn-outline-danger"
                                                        onClick={() => removeOneProduct(cartitem)}><i
                                                    className="bi  bi-dash-circle-fill"></i>
                                                </button>
                                                <button className="btn btn-outline-success"
                                                        onClick={() => addOneProdut(cartitem)}><i
                                                    className="bi bi-plus-circle-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <NavLink to='/clientorder'>
                                <button hidden={isCartEmpty} className='btn btn-primary'>Proceed to Order</button>
                            </NavLink>
                        </div>
                    </div>

        </>
    )
}

export default CartPage;