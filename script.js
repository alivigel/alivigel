const checkoutUrl = 'https://pagseguropix.org/c/alivigel';
const checkoutButton = document.querySelector('[data-checkout]');
const customerDetails = document.querySelector('.customer-details');
const customerForm = document.querySelector('[data-customer-form]');
const stateMenu = document.querySelector('.state-menu');
const stateInput = document.querySelector('[data-state-input]');
const cepInput = document.querySelector('#cep');
const cityInput = document.querySelector('#city');
const cepStatus = document.querySelector('[data-cep-status]');
let lastSearchedCep = '';
let cepLookupController;

checkoutButton.addEventListener('click', () => {
	customerDetails.hidden = false;
	customerDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
	setTimeout(() => customerForm.querySelector('input').focus(), 450);
});

customerForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!customerForm.reportValidity()) return;
	if (!stateInput.value) {
		stateMenu.open = true;
		stateMenu.querySelector('summary').focus();
		return;
	}
	window.location.assign(checkoutUrl);
});

stateMenu.querySelectorAll('[data-state]').forEach((option) => {
	option.addEventListener('click', () => {
		stateInput.value = option.dataset.state;
		stateMenu.querySelector('summary').textContent = option.textContent;
		stateMenu.open = false;
	});
});

cepInput.addEventListener('input', async () => {
	const cep = cepInput.value.replace(/\D/g, '').slice(0, 8);
	cepInput.value = cep.replace(/(\d{5})(\d)/, '$1-$2');

	if (cep.length !== 8) {
		lastSearchedCep = '';
		cepStatus.textContent = '';
		return;
	}

	if (cep === lastSearchedCep) return;
	lastSearchedCep = cep;
	cepLookupController?.abort();
	cepLookupController = new AbortController();
	cepStatus.textContent = 'Buscando cidade...';

	try {
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: cepLookupController.signal });
		if (!response.ok) throw new Error('CEP indisponível');
		const address = await response.json();
		if (address.erro || !address.localidade) throw new Error('CEP não encontrado');
		cityInput.value = address.localidade;
		const stateOption = stateMenu.querySelector(`[data-state="${address.uf}"]`);
		if (stateOption) {
			stateInput.value = address.uf;
			stateMenu.querySelector('summary').textContent = stateOption.textContent;
		}
		cepStatus.textContent = 'Cidade e estado preenchidos automaticamente.';
	} catch (error) {
		if (error.name === 'AbortError') return;
		cepStatus.textContent = 'Não encontramos a cidade. Preencha-a manualmente.';
	}
});

const heroImage = document.querySelector('.image-hero img');

if (heroImage) {
	heroImage.addEventListener('error', () => {
		heroImage.closest('.image-hero').classList.add('image-unavailable');
	});
}
