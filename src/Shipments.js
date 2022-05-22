import Nav from "./Nav";
import axios from "axios";
import { useState, useEffect } from "react";


const Shippments = () => {
    const [shippments, setShippments] = useState([])

    const fetchShippments = () => {
        axios.get(`${process.env.REACT_APP_API}/shippment`)
            .then(response => {
                setShippments(response.data)
            })
            .catch(err => alert('Err fetching shippments'))
    }

    useEffect(() => {
        fetchShippments()
    }, [])



    return (
        <div className="container pb-5">
            <Nav />
            <h1>
                View All Shippments
            </h1>
            <br />
            {
                shippments.map((shippment, i) => {
                    return (
                        <div className="row" key={shippment._id} style={{ borderBottom: '1px solid silver' }}>
                            <div className="col pt-3 pb-2">
                                <div className="row">
                                    <div className="col-md">
                                        <p>From: {shippment.fromAddress}</p>
                                        <p>To: {shippment.toAddress}</p>
                                        <p>
                                            label ID <span className="badge">{shippment.labelId}</span>
                                            <span className="badge">Published on {new Date(shippment.createdAt).toLocaleString()}</span>
                                        </p>
                                        <div className="contianer">
                                            {JSON.stringify(shippment.items)}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Shippments