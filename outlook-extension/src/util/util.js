
import axios from "axios";

export const scanText = (inputText) => {
    return axios.post(
        "http://localhost:81/scan",{ input: inputText },
        { headers: { "Content-Type": "application/json" } }
    );
};