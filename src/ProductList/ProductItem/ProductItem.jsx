import React from 'react'
import "./ProductItem.css"
import check from "../../assets/check.png"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartAction'

export default function ProductItem({ productImage, productName, productDescription, productPrice, productColor, isAdded, productID }) {
    const dispatch = useDispatch()
    const handleClickAddToCart = async () => {
        axios.defaults.baseURL = 'http://localhost:8000/'
        await axios.post(`/api/v1/cart/`, {
            productID: productID,
        }).then(respond => {
            dispatch(addToCart(respond.data))
        })
    }

    return (
        <div className='product-container'>
            <div style={{ backgroundColor: productColor, borderRadius: "28px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img className='product-image' src={productImage} alt={productName} />
            </div>
            <p className='product-name'>{productName}</p>
            <p className='product-description'>{productDescription}</p>
            <div className='product-price-container'>
                <p className='product-price'>{`$${productPrice}`}</p>
                {isAdded ? <div className='product-check-icon-container'><img src={check} alt='Check Icon' /></div> : <button onClick={handleClickAddToCart} className='product-add-button'>ADD TO CART</button>}
            </div>
        </div>
    )
}
