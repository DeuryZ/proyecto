/*let myForm=document.querySelector("form");
let myTabla=document.querySelector("#myData");
addEventListener("DOMContentLoaded", async()=>{
    let res=await(await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTabla.insertAdjacentHTML("beforeend",`
        <tr>
            <td>${res[i].id}</td>
            <td>${res[i].valor}</td>
            <td>${res[i].caja}</td>
        </tr>
        `);
    }
})
myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.target));
    const {valor}=data;
    data.valor=Number(valor);
    let config={
        method:"POST",
        Headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    };
    let res=await(await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla",config)).json();
    console.log(res);
})*/

let myForm = document.querySelector("form");
let myTabla = document.querySelector("#myData");
let editar = document.se
addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${res[i].id}</td>
            <td>${res[i].valor}</td>
            <td>${res[i].caja}</td>
        </tr>
        `);
    }
})

myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { valor } = data;
    data.valor = Number(valor);
    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla", config)).json();
    console.log(res);
})

