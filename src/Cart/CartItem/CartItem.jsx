import React, { useState } from 'react'
import CartImage from '../CartImage/CartImage'
import decreaseIcon from "../../assets/minus.png"
import increaseIcon from "../../assets/plus.png"
import trashIcon from "../../assets/trash.png"
import "./CartItem.css"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteCartItem } from '../../redux/cartAction'

export default function CartItem({ productImage, productName, productColor, productPrice, cartID, onQuantityChange }) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()


    const handleClickDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
            onQuantityChange(cartID, quantity - 1);
        } else {
            removeFromCart()
        }
    }

    const handleClickIncrease = () => {
        setQuantity(quantity => quantity + 1)
        onQuantityChange(cartID, quantity + 1);
    }

    const removeFromCart = async () => {
        axios.defaults.baseURL = 'http://localhost:8000/'
        await axios.delete(`/api/v1/cart/${cartID}`).then(respond => {
            dispatch(deleteCartItem(respond.data))
        })
    }

    const handleClickDelete = () => {
        removeFromCart()
    }

    return (
        <div className='cart-item-container'>
            <CartImage productImage={productImage} productName={productName} productColor={productColor} />
            <div className='cart-item-info'>
                <p className='cart-item-name'>{productName}</p>
                <p className='cart-item-price'>{`$${productPrice}`}</p>
                <div className='cart-item-info-quantity'>
                    <div className='cart-item-increase-decrease'>
                        <div onClick={handleClickDecrease} className='button decrease-button'><img src={decreaseIcon} alt='' /></div>
                        <p className='cart-item-quantity'>{quantity}</p>
                        <div onClick={handleClickIncrease} className='button increase-button'><img src={increaseIcon} alt='' /></div>
                    </div>
                    <div onClick={handleClickDelete} className='trash-button button'>
                        <img src={trashIcon} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}
