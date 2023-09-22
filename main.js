let myForm = document.querySelector("form");
let myTable = document.querySelector("#myData");


addEventListener("DOMContentLoaded", async () => {
    let res= await(await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTable.insertAdjacentHTML("beforeend", `
        <tr>
        <th>${res[i].id}</th>
        <th>${res[i].amount}</th>
        <th>${res[i].type}</th>
        <td><button type="button" class="delete" data-id="${res[i].id}">Delete</button></td>
        <td><button type="button" class="update" data-id="${res[i].id}">Update</button></td>
        </tr>
    `);}
    let myDelete = document.querySelectorAll(".delete");
    myDelete.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            let eliminate = `https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${id}`;
            let config = {
                method: "DELETE"
            };
            let res = await fetch(eliminate, config);
            console.log(res);
            location.reload();
        }) 
    });
    let myReset = document.querySelector("#reset");
    if (myReset) {
        myReset.addEventListener("click", async (e) => {
            const confirmation = confirm("¿Estás seguro de que deseas eliminar todos los elementos?");
            if (confirmation) {
                let config = {
                    method: "DELETE"
                };
                for (let i = 0; i < res.length; i++) {
                    let deleteResponse = await fetch(`https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${res[i].id}`, config);
                    console.log(deleteResponse);
                    console.log(res[i].id)
                }
            }
            location.reload();
        });
    }
    let myUpdate = document.querySelectorAll(".update");
    myUpdate.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            const amount = document.querySelector("#amount").value;
            const type = document.querySelector("input[name='type']:checked").value; 
            let eliminate = `https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${id}`;
            let config = {
                method: "DELETE"
            };
            let res = await fetch(eliminate, config);
            console.log(res);
            let update = `https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${id}`;
            config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, amount, type })
            }
            res = await fetch(update, config);
        })
    })
});

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
    location.reload();
})