let myForm=document.querySelector("form");
let myTabla=document.querySelector("#myData");
addEventListener("DOMContentLoaded", async()=>{
    let res=await(await fetch("https://6509e456f6553137159c35bd.mockapi.io/tabla")).json();
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
    data.valor=(typeof(valor===String)?Number(valor):null);
    let config={
        method:"POST",
        Headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    };
    let res=await(await fetch("https://6509e456f6553137159c35bd.mockapi.io/tabla",config)).json();
    console.log(res);
})