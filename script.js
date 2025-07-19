const menu = [
  {
    name: "Americano Iced",
    price: 10000,
    qty: 0,
  },
  {
    name: "Koffea Bapack Iced",
    price: 12000,
    qty: 0,
  },
  {
    name: "Koffea Bapack Hot",
    price: 10000,
    qty: 0,
  },
  {
    name: "Koffea Amber Iced",
    price: 13000,
    qty: 0,
  },
  {
    name: "Koffea Island Iced",
    price: 13000,
    qty: 0,
  },
  {
    name: "Koffea Island Hot",
    price: 11000,
    qty: 0,
  },
  {
    name: "Koffea Susu Iced",
    price: 13000,
    qty: 0,
  },
  {
    name: "Koffea Susu Hot",
    price: 11000,
    qty: 0,
  },
  {
    name: "Koffea Gula Doloe Iced",
    price: 13000,
    qty: 0,
  },
  {
    name: "Koffea Gula Doloe Hot",
    price: 11000,
    qty: 0,
  },
  {
    name: "Koffea Mocha Iced",
    price: 13000,
    qty: 0,
  },
  {
    name: "Strawberry Milk Iced",
    price: 11000,
    qty: 0,
  },
  {
    name: "Leaftea Lemon Iced",
    price: 10000,
    qty: 0,
  },
  {
    name: "Lychee Bloom Iced",
    price: 10000,
    qty: 0,
  },
  {
    name: "Chokis and Cream Iced",
    price: 11000,
    qty: 0,
  },
  {
    name: "Green Tea Iced",
    price: 12000,
    qty: 0,
  },
  {
    name: "Thai Tea Iced",
    price: 12000,
    qty: 0,
  },
  {
    name: "Boba ChocoLate Iced",
    price: 12000,
    qty: 0,
  },
  {
    name: "Boba Red Velvede Iced",
    price: 12000,
    qty: 0,
  },
  {
    name: "Boba Gula Doloe Iced ",
    price: 12000,
    qty: 0,
  },
  {
    name: "Boba TaroLatte Iced",
    price: 12000,
    qty: 0,
  },
];

function renderOrders() {
  const container = document.getElementById("orderList");
  container.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  menu.forEach((item, index) => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;

    container.innerHTML += `
      <div class="order-card">
        <div class="info">
          <strong>${item.name}</strong><br>
          Rp. ${item.price.toLocaleString()}
          <div class="qty">
            <button onclick="updateQty(${index}, -1)">-</button>
            ${item.qty}
            <button onclick="updateQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("totalItems").innerText = totalItems;
  document.getElementById("totalPrice").innerText = totalPrice.toLocaleString();
}

function updateQty(index, change) {
  menu[index].qty += change;
  if (menu[index].qty < 0) menu[index].qty = 0;
  renderOrders();
}

function checkout() {
  alert("Pesanan Anda sedang diproses!");
}

function exportToExcel() {
  let table = `
    <table border="1">
      <tr>
        <th>No</th>
        <th>Nama Menu</th>
        <th>Harga</th>
        <th>Jumlah</th>
        <th>Subtotal</th>
      </tr>
  `;

  let no = 1;
  let total = 0;

  menu.forEach((item) => {
    if (item.qty > 0) {
      let subtotal = item.qty * item.price;
      total += subtotal;
      table += `
        <tr>
          <td>${no++}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.qty}</td>
          <td>${subtotal}</td>
        </tr>
      `;
    }
  });

  table += `
      <tr>
        <td colspan="4"><strong>Total</strong></td>
        <td><strong>${total}</strong></td>
      </tr>
    </table>
  `;

  const blob = new Blob(["\ufeff" + table], {
    type: "application/vnd.ms-excel",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pesanan_koffeeartea.xls";
  a.click();
}

renderOrders();
