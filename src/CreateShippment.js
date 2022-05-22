import React, {useState} from "react";
import axios from 'axios'
import Nav from "./Nav";

const CreateShippment = () =>{
    const initialState = {
        fromAddress: '',
        toAddress: '',
        labelId: '',
        items: []
    }

    const [state, setState] = useState(initialState)

    const {fromAddress, toAddress, labelId, items} = state

    const handleChange = (n) => event => {
        setState({...state, [n]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/shippment/create`, {fromAddress, toAddress, labelId, items})
            .then(response => {
                // console.log(response.data);
                setState({...setState, labelId: '', fromAddress: '', toAddress: '', items: []})
                alert(`Shippment has been created the label ID is ${response.data.labelId}`)
            })


    }


    return (
        <div className="container pb-5">
            <Nav />
            <h1>
                CREATE A SHIPPMENT
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">From Address</label>
                    <input onChange={handleChange('fromAddress')} value={fromAddress} type="text" className="form-control" placeholder="Enter the from address" required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">To Address</label>
                    <input onChange={handleChange('toAddress')} value={toAddress} type="text" className="form-control" placeholder="Enter the to address" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Label ID</label>
                    <input onChange={handleChange('labelId')} value={labelId} type="text" className="form-control" placeholder="Enter the shippment label ID" required/>
                </div>
                <div>
                    <button className="btn btn-primary">
                        Create Shippment
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateShippment