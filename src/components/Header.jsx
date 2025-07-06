import React from 'react'
import { LuListTodo } from "react-icons/lu";

const Header = () => {
  return (
    <>
      <header className="header">
        <h2>
          <LuListTodo className="logo-icon" />&nbsp;
          <span className="logo-text">TaskFlow</span>
        </h2>
      </header>
    </>
  )
}

export default Header