const unitPrice = 26.9;
const maxQuantity = 4;
const checkoutUrl = 'https://pagseguropix.org/c/alivigel';
let quantity = 1;
const quantityElement = document.querySelector('[data-checkout-quantity]');
const totalElement = document.querySelector('[data-checkout-total]');
const summaryElement = document.querySelector('[data-checkout-summary]');
const increaseButton = document.querySelector('[data-checkout-increase]');
const decreaseButton = document.querySelector('[data-checkout-decrease]');

function formatPrice(value) {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateCheckout() {
	quantityElement.value = quantity;
	quantityElement.textContent = quantity;
	totalElement.textContent = formatPrice(unitPrice * quantity);
	summaryElement.textContent = `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} · ${formatPrice(unitPrice)} cada`;
	increaseButton.disabled = quantity >= maxQuantity;
	decreaseButton.disabled = quantity <= 1;
}

increaseButton.addEventListener('click', () => {
	quantity = Math.min(maxQuantity, quantity + 1);
	updateCheckout();
});
decreaseButton.addEventListener('click', () => {
	quantity = Math.max(1, quantity - 1);
	updateCheckout();
});
document.querySelector('[data-checkout]').addEventListener('click', () => {
	window.location.assign(checkoutUrl);
});
updateCheckout();
