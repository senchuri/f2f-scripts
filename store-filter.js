if (!window.Tabletop) {
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/tabletop@1.6.0/tabletop.min.js";
  script.onload = () => {
    // call your main init function here after Tabletop loads
    init();
  };
  document.head.appendChild(script);
} else {
  init();
}



// farmstofeast store filter script
const sheetID = "1b-ErR6Ij_tr83CvmhvSRGcst8EwfN0pbMDdcyMSiVgg";
let allStores = [];

function renderStores(zip) {
  const resultBox = document.getElementById("storeResults");
  if (!allStores.length) {
    resultBox.innerHTML = "<p>⚠️ Store data not loaded. Please refresh the page.</p>";
    return;
  }
  const filtered = allStores.filter(row => row["Postal Code"] && row["Postal Code"].includes(zip));
  if (filtered.length > 0) {
    resultBox.innerHTML = `
      <h3>🛒 Stores in Postal Code: ${zip}</h3>
      <ul style="padding-left: 20px;">
        ${filtered.map(store => `
          <li style="margin-bottom: 10px;">
            <strong>${store["Store Name"]}</strong><br/>
            <a href="${store["Store URL"]}" target="_blank">Visit Store</a>
          </li>`).join("")}
      </ul>`;
  } else {
    resultBox.innerHTML = `<p>❌ No stores found for <strong>${zip}</strong></p>`;
  }
}

function fetchData() {
  Tabletop.init({
    key: sheetID,
    simpleSheet: true,
    callback: function(data) {
      allStores = data;
      console.log("✅ Store data loaded");
    },
    error: function(err) {
      console.error("❌ Error loading data:", err);
    }
  });
}

function init() {
  fetchData();
  document.getElementById("searchBtn").addEventListener("click", function() {
    const zip = document.getElementById("zipInput").value.trim();
    if (zip.length >= 3) {
      renderStores(zip);
    } else {
      document.getElementById("storeResults").innerHTML = "<p>⚠️ Please enter at least 3 digits.</p>";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
