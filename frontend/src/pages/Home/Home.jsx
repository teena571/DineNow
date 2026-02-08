import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'


const Home = () => {

    const [category,setCategory] = useState("All");
    const [searchParams] = useSearchParams();
    const tableFromURL = searchParams.get("table");
    const tableNo = tableFromURL || localStorage.getItem("tableNo");

  return (
    <div>
      {tableNo && (
        <div className="reservation-banner">
          🪑 Table {tableNo} Reserved. What would you like to order?
        </div>
      )}
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
