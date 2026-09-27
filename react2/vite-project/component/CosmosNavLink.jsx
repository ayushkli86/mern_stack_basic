import React from 'react'
import { NavLink } from 'react-router-dom';
import './CosmosNavLink.css'; // Add this line to link the CSS

function CosmosNavLink() {
    return (
        <div className="nav-container"> {/* Added a class for targeting */}
            <NavLink to="/product">Product</NavLink>
            <NavLink to="/product/create">Create Product</NavLink>
            <NavLink to="/user">user</NavLink>
            <NavLink to="/user/create">create User</NavLink>
            <NavLink to="/school">School</NavLink>
            <NavLink to="/school/create">Create School</NavLink>
        </div>
    );
}

export default CosmosNavLink;


























// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import './CosmosNavLink.css';

// function CosmosNavLink() {
//     return (

//         <div className='navbar-links'>
//             <NavLink to="/product">Product</NavLink>
//             <NavLink to="/product/create">Create Product</NavLink>
//             <NavLink to="/user">user</NavLink>
//             <NavLink to="/user/create">create User</NavLink>
//             <NavLink to="/school">School</NavLink>
//             <NavLink to="/school/create">Create School</NavLink>
//         </div>
//     );
// }

// export default CosmosNavLink;



// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './CosmosNavLink.css'; // Importing the external CSS

// function CosmosNavLink() {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//                 <NavLink to="/">Cosmos</NavLink>
//             </div>
            
//             {/* Hamburger menu button for mobile devices */}
//             <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
//                 <span className={`bar ${isOpen ? 'open' : ''}`}></span>
//                 <span className={`bar ${isOpen ? 'open' : ''}`}></span>
//                 <span className={`bar ${isOpen ? 'open' : ''}`}></span>
//             </button>

//             {/* Navigation Links */}
//             <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
//                 <NavLink to="/product" onClick={() => setIsOpen(false)}>Product</NavLink>
//                 <NavLink to="/product/create" onClick={() => setIsOpen(false)}>Create Product</NavLink>
//                 <NavLink to="/user" onClick={() => setIsOpen(false)}>User</NavLink>
//                 <NavLink to="/user/create" onClick={() => setIsOpen(false)}>Create User</NavLink>
//                 <NavLink to="/school" onClick={() => setIsOpen(false)}>School</NavLink>
//                 <NavLink to="/school/create" onClick={() => setIsOpen(false)}>Create School</NavLink>
//             </div>
//         </nav>
//     );
// }

// export default CosmosNavLink;

