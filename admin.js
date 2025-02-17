const firebaseConfig = {
    apiKey: "AIzaSyB46Q51KpJCbCZeaeFDdS7FKTWc1HKN5bI",
    authDomain: "studentdetailsclassix.firebaseapp.com",
    databaseURL: "https://studentdetailsclassix-default-rtdb.firebaseio.com",
    projectId: "studentdetailsclassix",
    storageBucket: "studentdetailsclassix.appspot.com",
    messagingSenderId: "557336749433",
    appId: "1:557336749433:web:ff47f5705b086702827ba8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  if(localStorage.getItem('Verify') == undefined){
    window.location = 'index.html';
  }

  let sortOrder = [];

function sortTable(columnIndex){
    console.log('working')
const table = document.getElementById('myTable');
const tbody = table.querySelector('tbody');
const rows = Array.from(tbody.querySelector('tr'));

sortOrder[columnIndex] = (sortOrder[columnIndex] === 'asc') ? 'desc' : 'asc';

for(let i = 0; i < table.rows[0].cells.length; i++){
    const arrow = document.getElementById('arrow1');
    arrow,className = (i === columnIndex) ? sortOrder[columnIndex] : 'inactive';
}

rows.sort((a , b) => {
const aValue = a.children[columnIndex].textContent.trim();
const bValue = b.children[columnIndex].textContent.trim();

return sortOrder[columnIndex] === 'asc' ? aValue.localCompare(bValue, undefined, {numeric: true, sensitivity: 'base'})
: bValue.localCompare(aValue, undefined, {numeric: true, sensitivity: 'base'});
});

tbody.innerHTML = '';

rows.forEach(row => tbody.appendChild(row));

}
function getData() { firebase.database().ref("Details/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    var firebase_message_id = childKey;
    var message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

var Aadhar_Number = message_data['Aadhar_Number'];
var BirthDate = message_data['BirthDate'];
var Cast = message_data['Cast'];
var Email = message_data['Email'];
var Father_Name = message_data['Father_Name'];
var Gender = message_data['Gender'];
var HouseColour = message_data['HouseColour'];
var Language = message_data['Language'];
var Mother_Name = message_data['Mother_Name'];
var Name = message_data['Name'];
var Roll_Number = message_data['Roll_Number'];
var Single = message_data['Single'];

  row = '<tr><td>'+Roll_Number+'</td><td>'+Name+'</td><td>'+Cast+'</td><td>'+BirthDate+'</td><td>'+Gender+'</td><td>'+Mother_Name+'</td><td>'+Father_Name+'</td><td>'+Email+'</td><td>'+Aadhar_Number+'</td><td>'+Single+'</td><td>'+Language+'</td><td>'+HouseColour+'</td></tr>';
  document.getElementById('output').innerHTML += row;


  sortTable(0);
//End code
 } });  }); }
 getData();
 const search = document.querySelector('.input-group input'),
 table_rows = document.querySelectorAll('tbody tr'),
 table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
 table_rows.forEach((row, i) => {
     let table_data = row.textContent.toLowerCase(),
         search_data = search.value.toLowerCase();

     row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
     row.style.setProperty('--delay', i / 25 + 's');
 })

 document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
     visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
 });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
 let sort_asc = true;
 head.onclick = () => {
     table_headings.forEach(head => head.classList.remove('active'));
     head.classList.add('active');

     document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
     table_rows.forEach(row => {
         row.querySelectorAll('td')[i].classList.add('active');
     })

     head.classList.toggle('asc', sort_asc);
     sort_asc = head.classList.contains('asc') ? false : true;

     sortTable(i, sort_asc);
 }
})


function sortTable(column, sort_asc) {
 [...table_rows].sort((a, b) => {
     let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
         second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

     return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
 })
     .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');


const toPDF = function (customers_table) {
 const html_code = `
 <!DOCTYPE html>
 <link rel="stylesheet" type="text/css" href="style.css">
 <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

 const new_window = window.open();
  new_window.document.write(html_code);

 setTimeout(() => {
     new_window.print();
     new_window.close();
 }, 400);
}

pdf_btn.onclick = () => {
 toPDF(customers_table);
}

// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
 let table_data = [],
     t_head = [],

     t_headings = table.querySelectorAll('th'),
     t_rows = table.querySelectorAll('tbody tr');

 for (let t_heading of t_headings) {
     let actual_head = t_heading.textContent.trim().split(' ');

     t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
 }

 t_rows.forEach(row => {
     const row_object = {},
         t_cells = row.querySelectorAll('td');

     t_cells.forEach((t_cell, cell_index) => {
         const img = t_cell.querySelector('img');
         if (img) {
             row_object['customer image'] = decodeURIComponent(img.src);
         }
         row_object[t_head[cell_index]] = t_cell.textContent.trim();
     })
     table_data.push(row_object);
 })

 return JSON.stringify(table_data, null, 4);
}



// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
 // Code For SIMPLE TABLE
 // const t_rows = table.querySelectorAll('tr');
 // return [...t_rows].map(row => {
 //     const cells = row.querySelectorAll('th, td');
 //     return [...cells].map(cell => cell.textContent.trim()).join(',');
 // }).join('\n');

 const t_heads = table.querySelectorAll('th'),
     tbody_rows = table.querySelectorAll('tbody tr');

 const headings = [...t_heads].map(head => {
     let actual_head = head.textContent.trim().split(' ');
     return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
 }).join(',') + ',' + 'image name';

 const table_data = [...tbody_rows].map(row => {
     const cells = row.querySelectorAll('td'),
         img = decodeURIComponent(row.querySelector('img').src),
         data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

     return data_without_img + ',' + img;
 }).join('\n');

 return headings + '\n' + table_data;
}


// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {
 // Code For SIMPLE TABLE
 // const t_rows = table.querySelectorAll('tr');
 // return [...t_rows].map(row => {
 //     const cells = row.querySelectorAll('th, td');
 //     return [...cells].map(cell => cell.textContent.trim()).join('\t');
 // }).join('\n');

 const t_heads = table.querySelectorAll('th'),
     tbody_rows = table.querySelectorAll('tbody tr');

 const headings = [...t_heads].map(head => {
     let actual_head = head.textContent.trim().split(' ');
     return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
 }).join('\t') + '\t' + 'image name';

 const table_data = [...tbody_rows].map(row => {
     const cells = row.querySelectorAll('td'),
         img = decodeURIComponent(row.querySelector('img').src),
         data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

     return data_without_img + '\t' + img;
 }).join('\n');

 return headings + '\n' + table_data;
}

excel_btn.onclick = () => {
 const excel = toExcel(customers_table);
 downloadFile(excel, 'excel');
}

const downloadFile = function (data, fileType, fileName = '') {
 const a = document.createElement('a');
 a.download = fileName;
 const mime_types = {
     'json': 'application/json',
     'csv': 'text/csv',
     'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
 }
 a.href = `
     data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
 `;
 document.body.appendChild(a);
 a.click();
 a.remove();
}
function fliter1(){

    let filter1 = document.getElementById('searchname').value.toUpperCase();
    let myTable = document.getElementById('myTable');
    let tr = myTable.getElementsByTagName('tr');
    for(var i=0; i<tr.length; i++){
        let td = tr[i].getElementsByTagName('td')[1];
        console.log(filter1)
        if(filter1 == ''){
            tr[i].style.display = "";
        }else{
            if (td){
                let textvalue = td.textContent || td.innerHTML;
                
                if(textvalue.toUpperCase().indexOf(filter1) > -1){
                    tr[i].style.display = "";
    
                }else{
                   
                    tr[i].style.display = "none";
                   
                }
    
            }
        }


        
    }
    
}
