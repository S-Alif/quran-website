import axios from "axios"
import { toast } from "sonner"


export const dataFetcher = async (api) => {
  try {
    let result = await axios.get(api)

    if (result.data?.status !== "OK") {
      toast.error("Could not fetch data")
      return null
    }

    return result.data?.data

  } catch (error) {
    toast.error("Something went wrong")
    return null
  }
}