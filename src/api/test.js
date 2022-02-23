import myaxios from "@/utils/myaxios";

// myaxios.get('data.json')
// .then(resp => {
//     console.log(resp.data)
// })
// .catch(err => {
//     console.log("请求失败"+ err)
// })

// myaxios({method:'get',
// url:'data.json'}).then(resp => {
//     console.log(resp.data)
// })

const BASE_URL = [process.env.VUE_APP_BASE_URL];

export default {
  getList() {
    const promise1 = myaxios({
      method: "get",
      url: BASE_URL + "/data.json",
    });
    return promise1;
  },
};
