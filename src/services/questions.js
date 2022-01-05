import axios from "axios"

const API = 'http://35.85.146.122:5000//v1'

export const postMCQ = async (text) => {
    const res = await axios.post(
        `${API}/get_mcq`,
        {
            input_text: text
        }
    )
    return res
}

export const postShortQuestion = async (text) => {
    const res = await axios.post(
        `${API}/get_short_question`,
        {
            input_text: text
        }
    )
    return res
}

export const postBoolean = async (text) => {
    const res = await axios.post(
        `${API}/get_bool`,
        {
            input_text: text
        }
    )
    return res
}

export const getResponse = async (text) => {
    const res = await axios.post(
        `${API}/get_response`,
        {
            user_input: text
        }
    )
    return res
}