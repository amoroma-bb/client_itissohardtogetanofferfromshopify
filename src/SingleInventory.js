import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "./Nav";

const SingleInventory = () => {
    const { slug_param } = useParams()
    const [inventory, setInventory] = useState('')
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/inventory/${slug_param}`)
            .then(response => setInventory(response.data))
            .catch(err => alert('Error loading single post'))
    }, [])

    // console.log(inventory);

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>{inventory.name}</h1>
            <p className="lead">
                Quantity: {inventory.quantity}  Price: ${inventory.price}
            </p>
        </div>
    )
}

export default SingleInventory