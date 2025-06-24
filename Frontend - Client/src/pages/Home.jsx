import React from 'react'
import { Navbar, Header,SpecialityBar,TopDoctors,Banner} from '../components'

function Home() {
  return (
    <div>
      <Header />
      <SpecialityBar/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
