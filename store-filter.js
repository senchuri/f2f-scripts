async function loadVendors() {
  const pc = document.getElementById("postalCode").value.trim();
  const list = document.getElementById("vendorList");
  list.innerHTML = "Loading...";
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=vendors");
    const data = await res.json();
    const filtered = pc ? data.filter(v => v.PostalCode == pc) : data;
    list.innerHTML = filtered.map(v =>
      `<div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
        <h3>${v.VendorName}</h3>
        <p>${v.Location}</p>
        <p>Postal Code: ${v.PostalCode}</p>
        <a href="${v.Website}" target="_blank">Website</a>
      </div>`).join("") || "No vendors found.";
  } catch (e) {
    console.error(e);
    list.innerHTML = "Error loading vendors.";
  }
}
