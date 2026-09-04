const checkoutUrl = 'https://pagseguropix.org/c/alivigel';
const checkoutButton = document.querySelector('[data-checkout]');

checkoutButton.addEventListener('click', () => {
	window.location.assign(checkoutUrl);
});

const heroImage = document.querySelector('.image-hero img');

if (heroImage) {
	heroImage.addEventListener('error', () => {
		heroImage.closest('.image-hero').classList.add('image-unavailable');
	});
}
