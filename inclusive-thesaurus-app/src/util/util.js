import axios from "axios";

export const checkTerms = (inputText) => {
    return axios.post(
        "http://20.84.176.56:81/scan",{ input: inputText },
        { headers: { "Content-Type": "application/json" } }
    );
};
