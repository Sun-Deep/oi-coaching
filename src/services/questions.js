import axios from "axios"

const API = 'http://35.85.146.122:5000//v1'

export const postBoolean = async (text) => {
    const res = await axios.post(
        `${API}/get_mcq`,
        {
            input_text: text
        }
    )
    console.log(res.data)
}