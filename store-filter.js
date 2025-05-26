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

// let vData=[],pcList=[];
// async function loadData(){
//   const r=await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
//   vData=await r.json();
//   pcList=[...new Set(vData.map(x=>x.PostalCode))];
// }
// function setupAutocomplete(){
//   const inp=document.getElementById("postalCode"),list=document.getElementById("autocomplete");
//   inp.addEventListener("input",()=>{
//     const val=inp.value.trim().toLowerCase();
//     list.innerHTML=val?pcList.filter(p=>p.toLowerCase().startsWith(val)).map(p=>`<div class="auto-item">${p}</div>`).join(""):"";
//   });
//   list.addEventListener("click",e=>{
//     if(e.target.classList.contains("auto-item")){
//       inp.value=e.target.textContent;
//       list.innerHTML="";
//       loadVendors();
//     }
//   });
// }
// function loadVendors(){
//   const pc=document.getElementById("postalCode").value.trim(),list=document.getElementById("vendorList");
//   list.innerHTML="Loading...";
//   const f=pc?vData.filter(x=>x.PostalCode==pc):vData;
//   list.innerHTML=f.map(v=>`<div style="border:1px solid#ccc;padding:10px;margin:10px 0"><h3>${v.VendorName}</h3><p>${v.Location}</p><p>Postal Code: ${v.PostalCode}</p><a href="${v.Website}" target="_blank">Website</a></div>`).join("")||"No vendors found.";
// }
// document.addEventListener("DOMContentLoaded",async()=>{
//   await loadData();
//   setupAutocomplete();
// });

// ---  hello


let vData = [], pcList = [], locList = [];

async function loadData(){
  const r = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
  vData = await r.json();

  pcList = [...new Set(vData.map(x => x.PostalCode).filter(Boolean))];
  locList = [...new Set(vData.map(x => x.Location).filter(Boolean))];
}

function setupAutocomplete(inputId, listId, dataList){
  const inp = document.getElementById(inputId);
  const list = document.getElementById(listId);

  inp.addEventListener("input", () => {
    const val = inp.value.trim().toLowerCase();
    if(!val){
      list.innerHTML = "";
      return;
    }
    const filtered = dataList.filter(item => item.toLowerCase().startsWith(val));
    list.innerHTML = filtered.map(item => `<div class="auto-item" style="padding:5px;cursor:pointer;border-bottom:1px solid #ccc;">${item}</div>`).join("");
  });

  list.addEventListener("click", e => {
    if(e.target.classList.contains("auto-item")){
      inp.value = e.target.textContent;
      list.innerHTML = "";
      loadVendors();
    }
  });

  // Hide autocomplete on clicking outside
  document.addEventListener("click", e => {
    if(!inp.contains(e.target) && !list.contains(e.target)){
      list.innerHTML = "";
    }
  });
}

function loadVendors(){
  const pc = document.getElementById("postalCode").value.trim();
  const loc = document.getElementById("location").value.trim();
  const list = document.getElementById("vendorList");

  if(!pc && !loc){
    list.innerHTML = "Please enter Postal Code or Location to search.";
    return;
  }

  list.innerHTML = "Loading...";

  const filtered = vData.filter(v => {
    const matchPC = pc ? v.PostalCode.toLowerCase() === pc.toLowerCase() : false;
    const matchLoc = loc ? v.Location.toLowerCase() === loc.toLowerCase() : false;
    return matchPC || matchLoc;
  });

  if(filtered.length === 0){
    list.innerHTML = "No vendors found.";
    return;
  }

  list.innerHTML = filtered.map(v => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <h3>${v.VendorName}</h3>
      <p><strong>Location:</strong> ${v.Location}</p>
      <p><strong>Postal Code:</strong> ${v.PostalCode}</p>
      <a href="${v.Website}" target="_blank">Website</a>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  setupAutocomplete("postalCode", "autocompletePostal", pcList);
  setupAutocomplete("location", "autocompleteLocation", locList);

  document.getElementById("searchBtn").addEventListener("click", loadVendors);
});


// let vData = [], pcList = [];

// async function loadData(){
//   const r = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
//   vData = await r.json();

//   pcList = [...new Set(vData.map(x => x.PostalCode).filter(p => p && p.trim() !== ""))];
// }

// function setupAutocomplete(){
//   const inp = document.getElementById("postalCode");
//   const list = document.getElementById("autocompletePostal");

//   inp.addEventListener("input", () => {
//     const val = inp.value.trim().toLowerCase();
//     if(!val){
//       list.innerHTML = "";
//       return;
//     }
//     const filtered = pcList.filter(item => item.toLowerCase().startsWith(val));
//     list.innerHTML = filtered.map(item => 
//       `<div class="auto-item" style="padding:5px;cursor:pointer;border-bottom:1px solid #ccc;">${item}</div>`
//     ).join("");
//   });

//   list.addEventListener("click", e => {
//     if(e.target.classList.contains("auto-item")){
//       inp.value = e.target.textContent;
//       list.innerHTML = "";
//       loadVendors();
//     }
//   });

//   document.addEventListener("click", e => {
//     if(!inp.contains(e.target) && !list.contains(e.target)){
//       list.innerHTML = "";
//     }
//   });
// }

// function loadVendors(){
//   const pc = document.getElementById("postalCode").value.trim().toLowerCase();
//   const list = document.getElementById("vendorList");

//   if(!pc){
//     list.innerHTML = "Please enter a Postal Code to search.";
//     return;
//   }

//   list.innerHTML = "Loading...";

//   const filtered = vData.filter(v => v.PostalCode.toLowerCase().includes(pc));

//   if(filtered.length === 0){
//     list.innerHTML = "No vendors found.";
//     return;
//   }

//   list.innerHTML = filtered.map(v => `
//     <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
//       <h3>${v.VendorName}</h3>
//       <p><strong>Location:</strong> ${v.Location}</p>
//       <p><strong>Postal Code:</strong> ${v.PostalCode}</p>
//       <a href="${v.Website}" target="_blank" rel="noopener">Website</a>
//     </div>`).join("");
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadData();
//   setupAutocomplete();
//   document.getElementById("searchBtn").addEventListener("click", loadVendors);
// });

// function loadVendors(){
//   const pc = document.getElementById("postalCode").value.trim().toLowerCase();
//   const loc = document.getElementById("location").value.trim().toLowerCase();
//   const list = document.getElementById("vendorList");

//   if(!pc && !loc){
//     list.innerHTML = "Please enter Postal Code or Location to search.";
//     return;
//   }

//   list.innerHTML = "Loading...";

//   const filtered = vData.filter(v => {
//     const pcMatch = pc ? v.PostalCode.toLowerCase().includes(pc) : false;
//     const locMatch = loc ? v.Location.toLowerCase().includes(loc) : false;
//     return pcMatch || locMatch;
//   });

//   if(filtered.length === 0){
//     list.innerHTML = "No vendors found.";
//     return;
//   }

//   list.innerHTML = filtered.map(v => `
//     <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
//       <h3>${v.VendorName}</h3>
//       <p><strong>Location:</strong> ${v.Location}</p>
//       <p><strong>Postal Code:</strong> ${v.PostalCode}</p>
//       <a href="${v.Website}" target="_blank" rel="noopener">Website</a>
//     </div>`).join("");
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadData();
//   setupAutocomplete("postalCode", "autocompletePostal", pcList);
//   setupAutocomplete("location", "autocompleteLocation", locList);

//   document.getElementById("searchBtn").addEventListener("click", loadVendors);
// });


// -------------------------------------------------- 

// for products



let pData = [], pcProd = [];

async function loadProductData(){
  const r = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=products");
  pData = await r.json();
  pcProd = [...new Set(pData.map(x => x.PostalCode).filter(Boolean))];
}

function setupProductAutocomplete(){
  const inp = document.getElementById("productPostal");
  const list = document.getElementById("productAutocomplete");

  function showFilteredList(val = "") {
    const filtered = pcProd.filter(p => p.toLowerCase().startsWith(val.toLowerCase()));
    if (filtered.length === 0) {
      list.innerHTML = "<div style='padding:5px;'>No matches</div>";
    } else {
      list.innerHTML = filtered.map(p => `<div class="auto-prod" style="padding:5px; cursor:pointer; border-bottom:1px solid #eee;">${p}</div>`).join("");
    }
    list.style.display = "block";
  }

  inp.addEventListener("focus", () => {
    showFilteredList();
  });

  inp.addEventListener("input", () => {
    const val = inp.value.trim();
    showFilteredList(val);
  });

  list.addEventListener("click", e => {
    if (e.target.classList.contains("auto-prod")) {
      inp.value = e.target.textContent;
      list.style.display = "none";
      loadProducts();
    }
  });

  document.addEventListener("click", e => {
    if (!inp.contains(e.target) && !list.contains(e.target)) {
      list.style.display = "none";
    }
  });
}

function loadProducts(){
  const pc = document.getElementById("productPostal").value.trim();
  const list = document.getElementById("productList");
  list.innerHTML = "Loading...";

  const filtered = pc ? pData.filter(x => x.PostalCode === pc) : pData;


list.innerHTML = filtered.length ? `
  <div style="
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
  ">
    ${filtered.map(p => `
      <div>
        <a href="${p.Website}" target="_blank">
         <div style="border: 1px solid #e2e8f0; padding: 4px; border-radius:12px">
           <img src="${p.ImageURL}" alt="${p.ProductName}" style="width: 100%; height: 180px; object-fit: cover; border-radius:8px" />
           <div style="padding:8px">
             <h5 style="font-size:14px; font-wight: medium">${p.ProductName}</h5>
             <p style="font-size:12px">${p.Category}</p>
             <p style="font-size:12px">Vendor: ${p.Vendor}</p>
             <p style="font-size:12px">Postal Code: ${p.PostalCode}</p>
           </div>
         </div>
        </a>
      </div>
    `).join("")}
  </div>
` : "Sorry, but it looks like we aren't selling in your area.";

}

document.addEventListener("DOMContentLoaded", async () => {
  await loadProductData();
  setupProductAutocomplete();
});





