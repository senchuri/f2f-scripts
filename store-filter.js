// For vendors

let vData = [], pcList = [];

async function loadVendorData(){
  const r = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
  vData = await r.json();
  pcList = [...new Set(vData.map(x => x.PostalCode).filter(Boolean))];
}

function setupVendorAutocomplete(){
  const inp = document.getElementById("vendorPostal");
  const list = document.getElementById("vendorAutocomplete");

  function showFilteredList(val = "") {
    const filtered = pcList.filter(p => p.toLowerCase().startsWith(val.toLowerCase()));
    if (filtered.length === 0) {
      list.innerHTML = "<div style='padding:5px;'>No matches</div>";
    } else {
      list.innerHTML = filtered.map(p => `<div class="auto-vendor" style="padding:5px; cursor:pointer; border-bottom:1px solid #eee;">${p}</div>`).join("");
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
    if (e.target.classList.contains("auto-vendor")) {
      inp.value = e.target.textContent;
      list.style.display = "none";
      loadVendors();
    }
  });

  document.addEventListener("click", e => {
    if (!inp.contains(e.target) && !list.contains(e.target)) {
      list.style.display = "none";
    }
  });
}

function loadVendors(){
  const pc = document.getElementById("vendorPostal").value.trim();
  const list = document.getElementById("vendorList");
  list.innerHTML = "Loading...";

  const filtered = pc ? vData.filter(x => x.PostalCode === pc) : vData;

  list.innerHTML = filtered.length ? `
    <div style="
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px">
    ${filtered.map(p => `
      <div>
        <a href="${p.StoreURL}" target="_blank">
         <div style="border: 1px solid #e2e8f0; padding: 4px; border-radius:12px">
           <img src="${p.ImageURL}" alt="${p.VendorName}" style="width: 100%; height: 180px; object-fit: cover; border-radius:8px" />
           <div style="padding:8px">
             <h5 style="font-size:14px; font-wight: medium">${p.VendorName}</h5>
             <p style="font-size:12px">${p.Location}</p>
             <p style="font-size:12px">Total Products: ${p.TotalProducts}</p>
             <p style="font-size:12px">Postal Code: ${p.PostalCode}</p>
           </div>
         </div>
        </a>
      </div>
    `).join("")}
  </div>
  ` : "Sorry, no vendors found in this area.";
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadVendorData();
  setupVendorAutocomplete();
});


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
    gap: 20px">
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




// ==================== Modal Popup ==================

 document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = modal.querySelector(".close-btn");

  // Check if modal was already shown
  if (!localStorage.getItem("modalShown")) {
    setTimeout(() => {
      modal.style.display = "flex";
    }, 5000); // 5 seconds delay
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    localStorage.setItem("modalShown", "true"); // Remember that modal was shown
  });

  // Optional: close modal if user clicks outside the content box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      localStorage.setItem("modalShown", "true");
    }
  });
});




