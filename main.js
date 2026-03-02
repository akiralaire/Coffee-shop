// Update quantity
function changeQty(btn, delta) {
  let input = btn.parentElement.querySelector('.qty');
  let value = parseInt(input.value);
  value += delta;
  if (value < 1) value = 1;
  input.value = value;
}

// Add to cart
function addToCart(name, price, btn) {
  let card = btn.parentElement;
  let qty = parseInt(card.querySelector('.qty').value);
  let size = card.querySelector('.size') ? card.querySelector('.size').value : '';
  let sugar = card.querySelector('.sugar') ? card.querySelector('.sugar').value : '';
  let temp = card.querySelector('.temp') ? card.querySelector('.temp').value : '';
  
  let displayName = name;
  if (size) displayName += ` (${size}, ${temp}, ${sugar})`;
  
  let li = document.createElement('li');
  li.innerHTML = `${displayName} x${qty} - ₱${price*qty} <button onclick="removeItem(this,${price*qty})">X</button>`;
  document.getElementById('cartList').appendChild(li);
  
  total += price * qty;
  document.getElementById('total').textContent = total;
}

// Remove item
function removeItem(btn, amount) {
  btn.parentElement.remove();
  total -= amount;
  document.getElementById('total').textContent = total;
}

// Show checkout
function showCheckout() {
  document.getElementById('checkoutBox').classList.remove('hidden');
}

// Place order
function placeOrder() {
  let name = document.getElementById('custName').value;
  if (!name) { alert("Enter your name"); return; }
  document.getElementById('checkoutBox').classList.add('hidden');
  
  let receiptHTML = `<p><b>Name:</b> ${name}</p><ul>`;
  cartItems = document.querySelectorAll('#cartList li');
  cartItems.forEach(li => { receiptHTML += `<li>${li.textContent.replace('X','')}</li>`; });
  receiptHTML += `</ul>`;
  receiptHTML += `<p><b>Total Paid:</b> ₱${total}</p>`;
  receiptHTML += `<p><b>Date:</b> ${new Date().toLocaleString()}</p>`;
  document.getElementById('receiptContent').innerHTML = receiptHTML;
  document.getElementById('receipt').classList.remove('hidden');
}
