import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import Nav from "./Nav";

const AssignShippment = () => {
    const { slug_param } = useParams()
    const [state, setState] = useState({
        labelid: '',
        name: '',
        quantity: '',
        price: 0
    })

    const { labelid, name, quantity, price } = state

    const fetchItemInfo = () =>{
        axios.get(`${process.env.REACT_APP_API}/inventory/${slug_param}`)
            .then(response => {
                const { name, slug, price } = response.data
                setState({ ...state, name, slug, price })
            })
            .catch(err => alert('Error loading single inventory'))
    }

    useEffect(() => {
        fetchItemInfo()
    }, [])

    const handleChange = (n) => (event) => {
        // console.log(state);
        setState({ ...state, [n]: event.target.value })

    }


    const handleSubmit = event => {
        event.preventDefault()
        const quantities = quantity
        axios.put(`${process.env.REACT_APP_API}/inventory/update/${slug_param}`, { quantities })
        axios.put(`${process.env.REACT_APP_API}/shippment/update`, { labelid, name, quantity, price })
            .then(response => {
                // console.log(response);
                const { labelId } = response.data
                alert(`Items has been assigned to a shippment ${labelId}`)
            })
            .catch(
                error => {
                    console.log(error.response);
                    alert(error.response.data.error)
                }
            )

    }




    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>ASSIGN A SHIPPMENT</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">label ID</label>
                    <input onChange={handleChange('labelid')} value={labelid} type="text" className="form-control" placeholder="label ID" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Item Name</label>
                    <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="Item Name" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} value={quantity} type="text" className="form-control" placeholder="Number of quantity to be shipped" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} value={price} type="text" className="form-control" placeholder="Unit Price" required />
                </div>
                <button className="btn btn-primary">
                    Assign
                </button>
            </form>
        </div>
    )
}


export default AssignShippment