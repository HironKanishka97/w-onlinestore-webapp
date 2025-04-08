import { CartItem } from "../types/CartItem.ts";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks.ts";
import { updateCartItem } from "../store/slices/cartSlice.ts";
import { useEffect, useState } from "react";
interface UpdateCartItemObj {
    productId: number;
    productCount: number;
}

function CartPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cartItems.cartItems)
    const isCartEmpty = cartItems.length === 0;
    const [reload, setReload] = useState(true);

    useEffect(() => {
//used this because delay of cartItems updating until 
    },
        [reload]
    )

    function removeOneProduct(cartitem: CartItem) {
        const obj: UpdateCartItemObj = { productId: cartitem.product.id, productCount: -1 }
        dispatch(updateCartItem(obj));
        setReload(!reload)

    }
    function addOneProdut(cartitem: CartItem) {
        const obj: UpdateCartItemObj = { productId: cartitem.product.id, productCount: 1 }
        dispatch(updateCartItem(obj));
        setReload(!reload)

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
                                    style={{ width: '150px' }} className="card-img-top align-self-center"
                                    alt="cartitem-image" />
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