import axios from "axios";

// axios.get('data.json').then(resp =>{
//     console.log(resp.data)
// })
// .catch(err => {
//     console.log("请求失败")
// })

const myaxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// myaxios
//   .get("data.json")
//   .then((resp) => {
//     console.log(resp.data);
//   })
//   .catch((err) => {
//     console.log("请求失败" + err);
//   });

export default myaxios;
