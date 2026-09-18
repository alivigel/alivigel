const checkoutUrl = 'https://pagseguropix.org/c/alivigel';
const unitPrice = 27.99;
const checkoutButton = document.querySelector('[data-checkout]');
const increaseButton = document.querySelector('[data-checkout-increase]');
const decreaseButton = document.querySelector('[data-checkout-decrease]');
const quantityOutput = document.querySelector('[data-checkout-quantity]');
const totalOutput = document.querySelector('[data-checkout-total]');
const summaryOutput = document.querySelector('[data-checkout-summary]');
const customerDetails = document.querySelector('.customer-details');
const customerForm = document.querySelector('[data-customer-form]');
const cepInput = document.querySelector('#cep');
const cepStatus = document.querySelector('[data-cep-status]');
const streetInput = document.querySelector('#street');
const neighborhoodInput = document.querySelector('#neighborhood');
const cityInput = document.querySelector('#city');
const stateInput = document.querySelector('#state');

const quantity = 1;

function formatPrice(value) {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function updateCheckout() {
	if (!quantityOutput || !totalOutput || !summaryOutput) return;
	quantityOutput.value = quantity;
	totalOutput.textContent = formatPrice(unitPrice * quantity);
	summaryOutput.textContent = `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} · ${formatPrice(unitPrice)} cada`;
	if (decreaseButton) decreaseButton.disabled = true;
	if (increaseButton) increaseButton.disabled = true;
}

checkoutButton?.addEventListener('click', () => {
	if (!customerDetails) {
		window.location.assign(checkoutUrl);
		return;
	}
	customerDetails.hidden = false;
	customerDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
	setTimeout(() => customerForm?.querySelector('input')?.focus(), 450);
});

customerForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!customerForm.reportValidity()) return;
	window.location.assign(checkoutUrl);
});

cepInput?.addEventListener('input', async () => {
	const cep = cepInput.value.replace(/\D/g, '').slice(0, 8);
	cepInput.value = cep.replace(/(\d{5})(\d)/, '$1-$2');
	if (cep.length !== 8) {
		if (cepStatus) cepStatus.textContent = '';
		return;
	}
	if (cepStatus) cepStatus.textContent = 'Buscando endereço...';
	try {
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		if (!response.ok) throw new Error('CEP indisponível');
		const address = await response.json();
		if (address.erro) throw new Error('CEP não encontrado');
		if (streetInput) streetInput.value = address.logradouro || '';
		if (neighborhoodInput) neighborhoodInput.value = address.bairro || '';
		if (cityInput) cityInput.value = address.localidade || '';
		if (stateInput) stateInput.value = address.uf || '';
		if (cepStatus) cepStatus.textContent = 'Endereço preenchido automaticamente.';
	} catch {
		if (cepStatus) cepStatus.textContent = 'Não foi possível localizar o CEP. Preencha manualmente.';
	}
});

const reveals = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
	reveals.forEach((element) => element.classList.add('is-visible'));
} else {
	const observer = new IntersectionObserver((entries, currentObserver) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			currentObserver.unobserve(entry.target);
		});
	}, { threshold: 0.15 });
	reveals.forEach((element) => observer.observe(element));
}

const heroImage = document.querySelector('.image-hero img');
heroImage?.addEventListener('error', () => {
	heroImage.closest('.image-hero')?.classList.add('image-unavailable');
});

updateCheckout();
