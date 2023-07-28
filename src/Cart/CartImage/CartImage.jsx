import React from 'react'
import "./CartImage.css"

export default function CartImage({ productImage, productName, productColor }) {
    return (
        <div className='cart-image-container' style={{ backgroundColor: productColor }}>
            <img src={productImage} alt={productName} />
        </div>
    )
}
