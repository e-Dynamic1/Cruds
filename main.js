let title   = document.getElementById("title");
let price   = document.getElementById("price");
let taxes   = document.getElementById("taxes");
let ads     = document.getElementById("ads");
let discount= document.getElementById("discount");
let total   = document.getElementById("total");
let count   = document.getElementById("count");
let category= document.getElementById("category");
let submit  = document.getElementById("submit");
let mood = 'create';
let tmp ;
//get total
function getTotal() {
    if (price.value != '') {

        let result = (
            +price.value + 
            +taxes.value + 
            +ads.value - 
            +discount.value
        );
      total.style.background = " #040"
        total.innerHTML = result;  
       
    } else {
        total.innerHTML = '';  
         
    }
}

// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [ ];
}

submit.onclick= function () {
    let newoPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // count
  if(mood==='create'){

  
        
   
    if(newoPro.count>1){
        for(let i = 0 ;i < newoPro.count;i++){
            dataPro.push(newoPro);
        }
    }else{
        dataPro.push(newoPro);

    }}else{
        
        dataPro[tmp]=newoPro;
        mood='create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'
    }
      
 
    
    // save localStorage
    localStorage.setItem('product' ,JSON.stringify(dataPro));
    clear();
   showData();
  
}

// clear inputs
function clear ( ){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    total.style.background = '#a00d02'
}
// read 
function showData() {
    getTotal();
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
       table+= `
       <tr>
              <td>${i+1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update"> update</button></td>
              <td><button onclick="deleteData(${i})" id="update"> delete</button></td>
        </tr>
       `
      
       
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delelte All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();
// delete
function deleteData(i) {
    dataPro.splice(i,1)
    localStorage.product =JSON.stringify(dataPro);
    showData();

    
}
function deleteAll() {
   let a = window.confirm('Are you sure you want to delete all products?')
    if (a==true) {
        
        localStorage.clear();
        dataPro.splice(0);
        showData();
    }
    
}

// update 
function updateData(i) {
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value= dataPro[i].category;
    submit.innerHTML= 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//  search
let searchMood = 'title';

function getSearchMood(id) {
    let search=document.getElementById('search');
    if (id=='searchTitle') {
        searchMood='title';
        search.placeholder="Search By Title ...";
    }else{
        searchMood='category';
        search.placeholder="Search By Category ...";
    }
    search.focus();
    search.value="";
    showData();
}
function searchData(value) {
    let table='';
  if (searchMood== 'title') {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.includes(value.toLowerCase())) {
            table+= `
            <tr>
                   <td>${i+1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td><button onclick="updateData(${i})" id="update"> update</button></td>
                   <td><button onclick="deleteData(${i})" id="update"> delete</button></td>
             </tr>
            `;
        }
    }
  }else{
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.includes(value.toLowerCase())) {
            table+= `
            <tr>
                   <td>${i+1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td><button onclick="updateData(${i})" id="update"> update</button></td>
                   <td><button onclick="deleteData(${i})" id="update"> delete</button></td>
             </tr>
            `;
        }
    }
  }
  document.getElementById("tbody").innerHTML = table;  
}
// clean data

