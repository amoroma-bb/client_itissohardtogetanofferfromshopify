import React from "react";
import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to='/'>View All Inventories</Link>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to='/create'>Create Item</Link>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to='/shippment'>View All Shipment</Link>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to='/shippment/create'>Create A Shippment</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav