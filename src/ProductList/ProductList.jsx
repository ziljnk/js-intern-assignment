import React, { useEffect, useState } from 'react'
import "./ProductList.css"
import logo from "../assets/nike.png"
import ProductItem from './ProductItem/ProductItem'
import CartItem from '../Cart/CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialCartItems, setInitialShoesList } from '../redux/cartAction'

export default function ProductList() {
    const dispatch = useDispatch()
    const allShoes = useSelector(state => state.productsList)
    const allCart = useSelector(state => state.cartItems)
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartQuantities, setCartQuantities] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/products")
            .then(res => {
                res.json().then(data => dispatch(setInitialShoesList(data)))
            })

        fetch("http://localhost:8000/api/v1/cart")
            .then(res => {
                res.json().then(data => dispatch(setInitialCartItems(data)))
            })
    }, [])

    const handleTotalPrice = (cartID, quantity) => {
        setCartQuantities(prevQuantities => ({
            ...prevQuantities,
            [cartID]: quantity,
        }));
    }

    useEffect(() => {
        let totalPrice = 0;
        allCart.forEach(cart => {
            const quantity = cartQuantities[cart._id] || 1;
            totalPrice += cart.productID.price * quantity;
        });
        setTotalPrice(totalPrice);
    }, [allCart, cartQuantities]);

    return (
        <div className='background'>
            <div className='card left-card'>
                <img className='card-logo' src={logo} alt='logo' />
                <p className='title'>Our Products</p>
                <div className='product-list-container'>
                    {
                        allShoes.map(shoe => (
                            <ProductItem
                                key={shoe._id}
                                productID={shoe._id}
                                isAdded={shoe.isAdded}
                                productName={shoe.name}
                                productDescription={shoe.description}
                                productImage={shoe.image}
                                productColor={shoe.color}
                                productPrice={shoe.price}
                            />
                        ))
                    }
                </div>
            </div>
            <div className='card right-card'>
                <img className='card-logo' src={logo} alt='logo' />
                <div className='cart-header'>
                    <p className='title'>Your Cart</p>
                    <p className='total-price'>{`$${totalPrice.toFixed(2)}`}</p>
                </div>
                <div className='cart-list-container'>
                    {
                        allCart.length > 0 ?
                            allCart.map(cart => (
                                <CartItem
                                    onQuantityChange={handleTotalPrice}
                                    cartID={cart._id}
                                    key={cart._id}
                                    productImage={cart.productID.image}
                                    productName={cart.productID.name}
                                    productColor={cart.productID.color}
                                    productPrice={cart.productID.price}
                                />
                            )) : "Your cart is empty."
                    }
                </div>
            </div>
        </div>
    )
}
