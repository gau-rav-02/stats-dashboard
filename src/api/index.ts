import axios from "axios";

export const getActivityData = async () => {
    const baseURL = "https://raw.githubusercontent.com/gau-rav-02/devDynamicsJson/main/sample-data.json";
    console.log("hi");
    return axios.get(baseURL);
}

