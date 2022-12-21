import { useEffect, useState } from "react"
import { getSummaryItemsOfMonth } from "../lib/api/item"
import { Chart } from "react-google-charts";

const Ballance = () => {
	const today = new Date()
	const [year, setYear] = useState(today.getFullYear())
	const [month, setMonth] = useState(today.getMonth())
	const [items, setItems] = useState([])

	const handleGetSummaryItemsOfMonth = async () => {
		try {
			const res = await getSummaryItemsOfMonth(year, month+1)
			if (res.status === 200) {
				setItems(res.data)
			}
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		handleGetSummaryItemsOfMonth()
	}, [year, month])

	const options = {
		title: `${year}年${month+1}月 支出`,
    is3D: true
	}

	return(
		<div>
			<h1>Ballance graph</h1>
			<ul>
				<li>
					<a href='/budgets'>Budgets graph</a>
				</li>
				<li>
					<a href='/items'>Items list</a>
				</li>
			</ul>
			<Chart
				chartType="PieChart"
        data={items}
        options={options}
        width="100%"
        height="600px"
			/>
		</div>
	)
}

export default Ballance