import React, {useState} from "react";
import axios from 'axios'
import Nav from "./Nav";

const Create = () => {
    const [state, setState] = useState({
        name: '',
        quantity: 0,
        price: 0
    })

    // desctructure value from state
    const {name, quantity, price} = state

    const handleChange = (n) => (event) =>{
        // console.log(state);
        setState({...state, [n]: event.target.value})
    }


    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})

        axios.post(`${process.env.REACT_APP_API}/inventory`, {name, quantity, price})
        .then(response => {
            console.log(response);
            // empty state
            setState({...state, name:'', quantity:0, price:0})

            // show success alert
            alert(`Inventory ${response.data.name} is created`)

        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data.error)
        })
    }


    return (
        <div className="container pb-5">
            <Nav />
            <h1>
                CREATE INVENTORY
            </h1>
            <br />
            {/* {JSON.stringify(state)} */}
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
                        Create Inventory Item
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default Create;