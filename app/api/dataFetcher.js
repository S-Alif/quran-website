import axios from "axios"


export const dataFetcher = async (api) => {
  console.log(api)
  try {
    let result = await axios.get(api)

    if (result.data?.status !== "OK") {
      return null
    }

    return result.data?.data

  } catch (error) {
    return null
  }
}