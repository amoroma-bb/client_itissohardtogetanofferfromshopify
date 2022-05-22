import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import Create from './Create'
import SingleInventory from './SingleInventory'
import UpdateInventory from './UpdateInventory'
import Shippments from './Shipments'
import AssignShippment from './AssignShippment'
import CreateShippment from './CreateShippment'

const ClientRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>} />
                <Route path="/create" element={<Create/>} />
                <Route path='/inventory/:slug_param' element={<SingleInventory/>}/>
                <Route path='/inventory/update/:slug_param' element={<UpdateInventory/>} />
                <Route path='/shippment' element={<Shippments/>} />
                <Route path='/shippment/update/:slug_param' element={<AssignShippment />} />
                <Route path='/shippment/create' element={<CreateShippment/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default ClientRoutes