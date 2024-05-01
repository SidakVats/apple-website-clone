import Features from "./components/Features"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Modal from "./components/Modal"
import Navbar from "./components/Navbar"

import React from "react"



function App() {
  // return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

  return (
    <>
      <Navbar/>
      <Hero/>
      <Highlights/>
      <Modal/>
      <Features/>
    </>
  )
}

export default App;
