const checkoutUrl = 'https://pagseguropix.org/c/alivigel';
const checkoutButton = document.querySelector('[data-checkout]');
const customerDetails = document.querySelector('.customer-details');
const customerForm = document.querySelector('[data-customer-form]');
const stateMenu = document.querySelector('.state-menu');
const stateInput = document.querySelector('[data-state-input]');

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

const heroImage = document.querySelector('.image-hero img');

if (heroImage) {
	heroImage.addEventListener('error', () => {
		heroImage.closest('.image-hero').classList.add('image-unavailable');
	});
}
