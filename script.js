let cart = [];

// Додавання товарів у кошик
document.querySelectorAll(".item button").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    cart.push({ name, price });
    updateCartCount();
    alert(`🍔 Додано: ${name} (${price} грн)`);
  });
});

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

// Кошик
const modal = document.getElementById("cartModal");
document.getElementById("cartBtn").addEventListener("click", () => {
  showCart();
  modal.style.display = "block";
});

document.getElementById("closeCart").addEventListener("click", () => {
  modal.style.display = "none";
});

function showCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  if (cart.length === 0) {
    list.innerHTML = "<p>Кошик порожній</p>";
  } else {
    cart.forEach((item, i) => {
      const div = document.createElement("div");
      div.textContent = `${i + 1}. ${item.name} — ${item.price} грн`;
      list.appendChild(div);
    });
  }
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById("totalPrice").textContent = `Загальна сума: ${total} грн`;
}

// Оформлення замовлення
document.getElementById("checkoutBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("❗ Заповніть усі поля для доставки!");
    return;
  }

  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  alert(`✅ Дякуємо, ${name}!\nВаше замовлення на суму ${total} грн прийнято.\nДоставка: вул. Руська, 299.\nМи зв’яжемось із вами за номером ${phone}.`);

  // Очистити кошик
  cart = [];
  updateCartCount();
  showCart();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
});
