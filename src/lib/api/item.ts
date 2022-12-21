import Cookies from "js-cookie"
import client from "./client"

export const getSummaryItemsOfMonth = (year: number, month: number) => {
  return client.get(`/items?year=${year}&month=${month}&summary=1`, { 
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}