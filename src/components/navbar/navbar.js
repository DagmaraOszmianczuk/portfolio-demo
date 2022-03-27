import React, { useRef } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import "./navbar.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
   const data = useStaticQuery(graphql`
      query HeaderQuery {
         allContentfulGeneral {
            nodes {
               person
            }
         }
      }
   `)

   const drawer = useRef(null)

   const toggleDrawer = () => {
      let currentClass = drawer.current.className
      drawer.current.className = currentClass === "hidden" ? "open" : "hidden"
   }

   return (
      <nav className="navbar">
         <div className="container">
            <h2>{data.allContentfulGeneral.nodes[0].person}</h2>
            <div className="links">
               <button onClick={toggleDrawer}>
                  <FontAwesomeIcon icon={faBars} />
               </button>
               <ul ref={drawer} className="hidden">
                  <li className="current">
                     <Link to="/images">O mnie</Link>
                  </li>
                  <li>
                     <Link to="/images">Portfolio</Link>
                  </li>
                  <li>
                     <Link to="/images">Oferta</Link>
                  </li>
                  <li>
                     <Link to="/images">Kontakt</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Navbar