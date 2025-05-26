<script>
async function loadVendors() {
  const pc = document.getElementById("postalCode").value.trim();
  const list = document.getElementById("productList");
  list.innerHTML = "Loading...";
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyqyG_4j5u9e2fWnhUiosvOarp3cRhpmG_yCjfPjdoay0Wh3ZeWK0BIHpqme2Q_6IJd2A/exec?type=products");
    const data = await res.json();
    const filtered = pc ? data.filter(v => v.PostalCode == pc) : data;
    list.innerHTML = filtered.map(p =>
      `<div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
        <h3>${p.ProductName}</h3>
        <p>${p.Location}</p>
        <p>Postal Code: ${p.PostalCode}</p>
        <a href="${p.Website}" target="_blank">Website</a>
      </div>`).join("") || "No products found.";
  } catch (e) {
    console.error(e);
    list.innerHTML = "Error loading vendors.";
  }
}
</script>
