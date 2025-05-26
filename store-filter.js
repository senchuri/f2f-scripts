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

let pData=[],pcProd=[];
async function loadProductData(){
  const r=await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=products");
  pData=await r.json();
  pcProd=[...new Set(pData.map(x=>x.PostalCode))];
}
function setupProductAutocomplete(){
  const inp=document.getElementById("productPostal"),list=document.getElementById("productAutocomplete");
  inp.addEventListener("input",()=>{
    const val=inp.value.trim().toLowerCase();
    list.innerHTML=val?pcProd.filter(p=>p.toLowerCase().startsWith(val)).map(p=>`<div class="auto-prod">${p}</div>`).join(""):"";
  });
  list.addEventListener("click",e=>{
    if(e.target.classList.contains("auto-prod")){
      inp.value=e.target.textContent;
      list.innerHTML="";
      loadProducts();
    }
  });
}
function loadProducts(){
  const pc=document.getElementById("productPostal").value.trim(),list=document.getElementById("productList");
  list.innerHTML="Loading...";
  const f=pc?pData.filter(x=>x.PostalCode==pc):pData;
  list.innerHTML=f.map(p=>`<div style="border:1px solid#ccc;padding:10px;margin:10px 0"><h3>${p.ProductName}</h3><p>${p.Category}</p><p>Vendor: ${p.Vendor}</p><p>Postal Code: ${p.PostalCode}</p><a href="${p.Website}" target="_blank">Website</a></div>`).join("")||"No products found.";
}
document.addEventListener("DOMContentLoaded",async()=>{
  await loadProductData();
  setupProductAutocomplete();
});

