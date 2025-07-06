import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <p>
          <FaRegCopyright />&nbsp; {new Date().getFullYear()} TaskFlow — All rights reserved.
        </p>
      </div>
    </>
  )
}

export default Footer