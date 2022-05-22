import Nav from "./Nav";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function App() {
  const [inventories, setInventories] = useState([])

  const fetchInventories = () => {
    axios.get(`${process.env.REACT_APP_API}/inventories`)
      .then(response => {
        setInventories(response.data)
      })
      .catch(err => alert('Err fetching inventories'))
  }

  useEffect(() => {
    fetchInventories()
    // console.log(inventories);
  }, [])

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this post?')
    if(answer){
      deletePost(slug)
    }

  }

  const deletePost = (slug) =>{
    axios.delete(`${process.env.REACT_APP_API}/inventory/${slug}`)
      .then(response => {
        alert(response.data.message)
        fetchInventories()
      })
      .catch(error => alert('Error deleting post'))
  }

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      {/* {JSON.stringify(inventories)} */}
      <h1>
        Shopify 2022 Fall developer intern challenge
      </h1>
      <p>
        1. CRUD for inventory item
        2. Create a shippment using two addresses and a label ID
        3. Assign a item to a existing shippment using the unique label ID
        4. The quantity of inventory will modify automically
      </p>

      {
        inventories.map((inventory, i) => {
          return (
            <div className="row" key={inventory._id} style={{ borderBottom: '1px solid silver' }}>
              <div className="col pt-3 pb-2">
                <div className="row">
                  <div className="col-md-10">
                    <Link to={`/inventory/${inventory.slug}`}>
                      <h4>Item Name: {inventory.name}</h4>
                    </Link>

                    <p className="lead">
                      Quantity: {inventory.quantity} |  Unit Price: ${inventory.price}
                    </p>
                    <p>
                      <span className="badge">Published on {new Date(inventory.createdAt).toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Link to={`/inventory/update/${inventory.slug}`} className="btn btn-sm btn-outline-warning">
                      Update
                    </Link>
                    <button onClick={() => deleteConfirm(inventory.slug)} className="btn btn-sm btn-outline-danger ml-1">
                      Delete
                    </button>
                    <Link to={`/shippment/update/${inventory.slug}`} className="btn btn-sm btn-outline-info ml-1">
                      Assign to a shippment
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
