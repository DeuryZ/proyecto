let myForm = document.querySelector("form");
let myTable = document.querySelector("#myData");
let myResult = document.querySelector(".contResult");
//↑↑ Creation of elements, this represents html documents ↑↑
addEventListener("DOMContentLoaded", async () => {
//↑↑ Listen that the DOM is loaded do the following ↑↑
    let res= await(await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla")).json();
//↑↑ call from the API to get the data and save it in a variable res ↑↑
/*El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro 
de una función async function.  

"[rv] = await expression;" 

expression:
Una Promise o cualquier otro valor por el cual haya que esperar.

Descripción
La expresión await provoca que la ejecución de una función async sea pausada hasta que una 
Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del 
término. Al regreso de la ejecución, el valor de la expresión await es la regresada por una 
promesa terminada.

Si la Promise es rechazada, el valor de la expresión await tendrá el valor de rechazo.

Si el valor de la expresión seguida del operador await no es una promesa, será convertido 
a una resolved Promise.


Fetch
Take all information from the API and them with .json convert all the information to a .json
*/
    for (let i = 0; i < res.length; i++) {
        myTable.insertAdjacentHTML("beforeend", `
        <tr>
        <th>${res[i].id}</th>
        <th>${res[i].amount} COP</th>
        <th>${res[i].type}</th>
        <td><button type="button" class="delete" data-id="${res[i].id}">Delete</button></td>
        <td><button type="button" class="update" data-id="${res[i].id}">Update</button></td>
        </tr>
    `);}
//↑↑ Print the data in the table ↑↑
    let totalPositive=0;
    let totalNegative=0;
    for (let index = 0; index < res.length; index++) {
        if(res[index].type=="in"){
            totalPositive+=res[index].amount;
        }else{
            totalNegative+=res[index].amount;
        }
    }
    myResult.insertAdjacentHTML("beforeend", `<p>Resultado: ${totalPositive-totalNegative} COP</p>`);
//↑↑ Take the amount and calculate the total and them print it ↑↑
    let myDelete = document.querySelectorAll(".delete");
//↑↑ Create a variable to get all the buttons that have the class delete ↑↑
    myDelete.forEach(button => {
//↑↑ to every button that has the class delete create a variable button and do the following↑↑
        button.addEventListener("click", async (e) => {
//↑↑ listen that the button is clicked and do the following ↑↑
            e.preventDefault();
//↑↑ avoid constant refresh ↑↑
            const id = e.target.getAttribute("data-id");
//↑↑ get the id of the button, e is all the proprieties of the button an in it we search for the data-id in attributes↑↑
            let eliminate = `https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${id}`;
//↑↑ Create a variable to get the id in the API ↑↑
            let config = {
                method: "DELETE"
            };
//↑↑ configure the API to method delete ↑↑
            let res = await fetch(eliminate, config);
//↑↑ call the API to delete ↑↑
            location.reload();
//↑↑ refresh the page ↑↑
        }) 
    });

    let myReset = document.querySelector("#reset");
//↑↑ create a variable to get the button with the id reset ↑↑
    if (myReset) {
//↑↑ if the button exists ↑↑
        myReset.addEventListener("click", async (e) => {
//↑↑ when the button is clicked do the following ↑↑
            const confirmation = confirm("¿Estás seguro de que deseas eliminar todos los elementos?");
//↑↑ a confirmation ↑↑
            if (confirmation) {
                let config = {
                    method: "DELETE"
                };
//↑↑ configure to method delete ↑↑
                for (let i = 0; i < res.length; i++) {
                    let deleteResponse = await fetch(`https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${res[i].id}`, config);
                    console.log(deleteResponse);
                    console.log(res[i].id)
                }
//↑↑ delete all the items in the API ↑↑
            }
            location.reload();
        });
    }
    let myUpdate = document.querySelectorAll(".update");
    let myFormSend = document.querySelector(".formSend"); 
//↑↑ Create a variable to get all the buttons that have the class update  and a form to variables to change it↑↑
    if (myUpdate){
        myUpdate.forEach((button)=>{
//↑↑ to every button that has the class update create a variable button and do the following ↑↑
            button.addEventListener("click", async (e) => {
                e.preventDefault();
                document.querySelector(".contUpdate").style.display = "block";
                document.querySelector(".contMain").style.display = "none";
                const id = e.target.getAttribute("data-id");
                let mySend = document.querySelector(".send");
                if (mySend){
                    myFormSend.addEventListener("submit", async (e) => {
                        e.preventDefault();
                        const data = Object.fromEntries(new FormData(e.target));
                        const { amount } = data;
                        data.amount = Number(amount);
                        let config = {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data)
                        };
                        let res = await (await fetch(`https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla/${id}`, config)).json();
                        console.log(res);
                        document.querySelector(".contUpdate").style.display = "none";
                        document.querySelector(".contMain").style.display = "block";
                        location.reload();
                    })
                }
            })
        })
//↑↑ is the same process as the previous creating a item ↑↑
    }
    
});

myForm.addEventListener("submit", async (e) => {
//↑↑ when the form is submitted ↑↑
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
//↑↑ create a variable to get the data from the form ↑↑
    const { amount } = data;
//↑↑ create a variable to get the amount ↑↑
    data.amount = Number(amount);
//↑↑ change the type amount to number ↑↑
    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
//↑↑ configure the API to method post ↑↑
    let res = await (await fetch("https://650ad5b7dfd73d1fab08fcc0.mockapi.io/tabla/tabla", config)).json();
//↑↑ make a fetch to the API ↑↑
    location.reload();
})