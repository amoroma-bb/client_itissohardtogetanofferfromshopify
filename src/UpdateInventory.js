import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "./Nav";

const UpdateInventory = () => {
    const { slug_param } = useParams()
    const [state, setState] = useState({
        name: '',
        quantity: 0,
        price: 0,
        slug: ''
    })

    const {name,quantity,slug, price} = state
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/inventory/${slug_param}`)
            .then(response => {
                const {name,quantity,slug, price} = response.data
                setState({...state, name,quantity,slug, price})
            })
            .catch(err => alert('Error loading single inventory'))
    }, [])

    const handleChange = (n) => (event) =>{
        // console.log(state);
        setState({...state, [n]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})
        axios.put(`${process.env.REACT_APP_API}/inventory/${slug}`, {name, quantity, price})
        .then(response => {
            console.log(response);
            const {name, quantitiy, slug, price} = response.data
            // empty state
            setState({...state, name, quantitiy, price, slug})

            // show success alert
            alert(`Inventory ${name} is updated`)

        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data.error)
        })
    }

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Inventory Item</label>
                    <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="Inventory Item Name" required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} value={quantity} type="text" className="form-control" placeholder="Quantity" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} value={price} type="text" className="form-control" placeholder="Unit Price" required/>
                </div>
                <div>
                    <button className="btn btn-primary">
                        Update
                    </button>
                </div>
        </form>
    )
    // console.log(post);
    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>UPDATE INVENTORY</h1>
            {showUpdateForm()}
        </div>
    )
}

export default UpdateInventory