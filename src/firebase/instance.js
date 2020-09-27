import axios from "axios";

export default axios.create({
    baseURL: "https://crud-operations-17667.firebaseio.com/"
})