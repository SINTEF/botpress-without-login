const anonymousCredentials = 'anonymous@example.net';

// Set an input.value, but for React outside React
function setReactInput(input, value) {
	Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
		.set.call(input, value);
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

const rootNode = document.getElementById('root');

// Everytime React does something to the DOM tree, we run the following callback
const observer = new MutationObserver((mutations) => {
	// Remove the right user menu if it exists, we do not need it
	const userMenu = document.querySelector('header.bp-header .bp3-navbar-group.bp3-align-right');
	if (userMenu) {
		// We do a check because this is triggered a lot and it's unecessary to update the style everytime
		if (userMenu.style.display !== 'none') {
			userMenu.style.display = 'none';	
		}
		return;
	}

	// Login automatically using the anonymous credentials if we detect a login screen
	const emailLogin = document.getElementById('email-login');
	const passwordLogin = document.getElementById('password-login');
	if (emailLogin && passwordLogin && emailLogin.value === '' && passwordLogin.value === '') {
		// Do not do anything if we detect an error in the login screen
		const invalidCredentialsError = document.querySelector('.login_box .bp3-callout .bp3-icon-error');
		if (invalidCredentialsError) {
			return;
		}
		// Disable the login inputs to prevent the user from entering wrong credentials
		// For example if the user press a key while the application is loading
		emailLogin.disabled = true;
		passwordLogin.disabled = true;
		setReactInput(emailLogin, anonymousCredentials);
		setReactInput(passwordLogin, anonymousCredentials);
		const signInButton = document.getElementById('btn-signin');
		signInButton.click();
		signInButton.disabled = true;
		return;
	}

	// If we have a register screen it's time to register the anonymous user
	const emailRegister = document.getElementById('email-register');
	const passwordRegister = document.getElementById('password-register');
	const confirmPassword = document.getElementById('confirmPassword'); 
	if (emailRegister && passwordRegister && confirmPassword &&
		emailRegister.value === '' && passwordRegister.value === '' && confirmPassword.value === '') {
  	emailRegister.disabled = true;
		passwordRegister.disabled = true;
		confirmPassword.disabled = true;
		setReactInput(emailRegister, anonymousCredentials);
		setReactInput(passwordRegister, anonymousCredentials);
		setReactInput(confirmPassword, anonymousCredentials);

		const registerButton = document.getElementById('btn-register');
		if (!registerButton) {
			alert('Could not find register button, please register an account manually');
			return;
		}
		registerButton.click();
		registerButton.disabled = true;
		return;
	}
});

observer.observe(rootNode, {
	childList: true,
	subtree: true,
});
