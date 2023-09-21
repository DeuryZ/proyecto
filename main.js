let myForm = document.querySelector("form");
let myTabla = document.querySelector("#myData");
let myDelete = document.querySelector("#delete");
let myUpdate = document.querySelector("#update");
addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${res[i].id}</td>
            <td>${res[i].amount}</td>
            <td>${res[i].type}</td>
            <td><button id="delete">Delete</button></td>
            <td><button id="update">Update</button></td>
        </tr>
        `);
    }
})
myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { amount } = data;
    data.amount = Number(amount);
    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla", config)).json();
    console.log(res);
})

myDelete.addEventListener("click", async (e) => {
    e.preventDefault();
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    let config = {
        method: "DELETE"
    };
    let eliminate ="https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/"+res[0].id
    res = await (await fetch(eliminate, config)).json();
    console.log(res);
})













/*let myForm = document.querySelector("form");
let myTabla = document.querySelector("#myData");
let myDelete = document.querySelector("#delete");
let myUpdate = document.querySelector("#update");
let myReset = document.querySelector("#reset");

addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${res[i].id}</td>
            <td>${res[i].amount}</td>
            <td>${res[i].type}</td>
            <td><button id="delete">Delete</button></td>
            <td><button id="update">Update</button></td>
        </tr>
        `);
    }
})

myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { amount } = data;
    data.amount = Number(amount);
    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla", config)).json();
    console.log(res);
})



myDelete.addEventListener("click", async (e) => {
    let config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    };
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla", config)).json();
    console.log(res);
})*/ 