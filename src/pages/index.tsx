import { Routes, Route } from "react-router-dom"
import Ballance from "./Ballance"
import Budgets from "./Budgets"
import Items from "./Items"

const Pages = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Ballance />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </div> 
  )
}

export default Pages