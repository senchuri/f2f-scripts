// async function loadVendors() {
//   const pc = document.getElementById("postalCode").value.trim();
//   const list = document.getElementById("vendorList");
//   list.innerHTML = "Loading...";
//   try {
//     const res = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
//     const data = await res.json();
//     const filtered = pc ? data.filter(v => v.PostalCode == pc) : data;
//     list.innerHTML = filtered.map(v =>
//       `<div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
//         <h3>${v.VendorName}</h3>
//         <p>${v.Location}</p>
//         <p>Postal Code: ${v.PostalCode}</p>
//         <a href="${v.Website}" target="_blank">Website</a>
//       </div>`).join("") || "No vendors found.";
//   } catch (e) {
//     console.error(e);
//     list.innerHTML = "Error loading vendors.";
//   }
// }



 // for Vendors 

let vData=[],pcList=[];
async function loadData(){
  const r=await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
  vData=await r.json();
  pcList=[...new Set(vData.map(x=>x.PostalCode))];
}
function setupAutocomplete(){
  const inp=document.getElementById("postalCode"),list=document.getElementById("autocomplete");
  inp.addEventListener("input",()=>{
    const val=inp.value.trim().toLowerCase();
    list.innerHTML=val?pcList.filter(p=>p.toLowerCase().startsWith(val)).map(p=>`<div class="auto-item">${p}</div>`).join(""):"";
  });
  list.addEventListener("click",e=>{
    if(e.target.classList.contains("auto-item")){
      inp.value=e.target.textContent;
      list.innerHTML="";
      loadVendors();
    }
  });
}
function loadVendors(){
  const pc=document.getElementById("postalCode").value.trim(),list=document.getElementById("vendorList");
  list.innerHTML="Loading...";
  const f=pc?vData.filter(x=>x.PostalCode==pc):vData;
  list.innerHTML=f.map(v=>`<div style="border:1px solid#ccc;padding:10px;margin:10px 0"><h3>${v.VendorName}</h3><p>${v.Location}</p><p>Postal Code: ${v.PostalCode}</p><a href="${v.Website}" target="_blank">Website</a></div>`).join("")||"No vendors found.";
}
document.addEventListener("DOMContentLoaded",async()=>{
  await loadData();
  setupAutocomplete();
});


// for products

// let pData=[],pcProd=[];
// async function loadProductData(){
//   const r=await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=products");
//   pData=await r.json();
//   pcProd=[...new Set(pData.map(x=>x.PostalCode))];
// }
// function setupProductAutocomplete(){
//   const inp=document.getElementById("productPostal"),list=document.getElementById("productAutocomplete");
//   inp.addEventListener("input",()=>{
//     const val=inp.value.trim().toLowerCase();
//     list.innerHTML=val?pcProd.filter(p=>p.toLowerCase().startsWith(val)).map(p=>`<div class="auto-prod">${p}</div>`).join(""):"";
//   });
//   list.addEventListener("click",e=>{
//     if(e.target.classList.contains("auto-prod")){
//       inp.value=e.target.textContent;
//       list.innerHTML="";
//       loadProducts();
//     }
//   });
// }
// function loadProducts(){
//   const pc=document.getElementById("productPostal").value.trim(),list=document.getElementById("productList");
//   list.innerHTML="Loading...";
//   const f=pc?pData.filter(x=>x.PostalCode==pc):pData;
//   list.innerHTML=f.map(p=>`<div style="border:1px solid#ccc;padding:10px;margin:10px 0"><h3>${p.ProductName}</h3><p>${p.Category}</p><p>Vendor: ${p.Vendor}</p><p>Postal Code: ${p.PostalCode}</p><a href="${p.Website}" target="_blank">Website</a></div>`).join("")||"No products found.";
// }
// document.addEventListener("DOMContentLoaded",async()=>{
//   await loadProductData();
//   setupProductAutocomplete();
// });

let pData = [], pcProd = [], locList = [], catList = [];

async function loadProductData(){
  const r = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=products");
  pData = await r.json();

  pcProd = [...new Set(pData.map(x => x.PostalCode).filter(Boolean))];
  locList = [...new Set(pData.map(x => x.Location).filter(Boolean))];
  catList = [...new Set(pData.map(x => x.Category).filter(Boolean))];

  setupProductAutocomplete();
}

function populateFilters(){
  const locSel = document.getElementById("locationFilter");
  const catSel = document.getElementById("categoryFilter");

  // Clear previous options except default
  locSel.length = 1;
  catSel.length = 1;

  locList.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = loc;
    locSel.appendChild(opt);
  });

  catList.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = cat;
    catSel.appendChild(opt);
  });
}

function setupProductAutocomplete(){
  const inp = document.getElementById("productPostal");
  const list = document.getElementById("productAutocomplete");

  inp.addEventListener("input", () => {
    const val = inp.value.trim().toLowerCase();
    list.innerHTML = val
      ? pcProd.filter(p => p.toLowerCase().startsWith(val))
          .map(p => `<div class="auto-prod" style="padding:5px;cursor:pointer;border-bottom:1px solid #ccc;">${p}</div>`).join("")
      : "";
  });

  list.addEventListener("click", e => {
    if(e.target.classList.contains("auto-prod")){
      inp.value = e.target.textContent;
      list.innerHTML = "";
    }
  });
}

function loadProducts(){
  const pc = document.getElementById("productPostal").value.trim();
  if(!pc){
    alert("Please enter a postal code.");
    return;
  }
  const locSel = document.getElementById("locationFilter");
  const catSel = document.getElementById("categoryFilter");
  const loc = locSel.value;
  const cat = catSel.value;
  const list = document.getElementById("productList");

  // Show filters only after first search
  const filtersDiv = document.getElementById("filters");
  if(filtersDiv.style.display === "none"){
    populateFilters();
    filtersDiv.style.display = "block";

    // Add change listeners to filters to update results on change
    locSel.onchange = loadProducts;
    catSel.onchange = loadProducts;
  }

  list.innerHTML = "Loading...";

  let filtered = pData.filter(x => x.PostalCode === pc);
  if(loc) filtered = filtered.filter(x => x.Location === loc);
  if(cat) filtered = filtered.filter(x => x.Category === cat);

  if(filtered.length === 0){
    list.innerHTML = "No products found.";
    return;
  }

  list.innerHTML = filtered.map(p => 
    `<div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <h3>${p.ProductName}</h3>
      <p><strong>Category:</strong> ${p.Category}</p>
      <p><strong>Vendor:</strong> ${p.Vendor}</p>
      <p><strong>Location:</strong> ${p.Location}</p>
      <p><strong>Postal Code:</strong> ${p.PostalCode}</p>
      <a href="${p.Website}" target="_blank">Website</a>
    </div>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", loadProductData);
document.getElementById("searchBtn").addEventListener("click", loadProducts);


