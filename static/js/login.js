alertify.set('notifier', 'position', 'top-center');

if (localStorage.getItem('token')) {
	if (localStorage.getItem('logedOut') === true) {
		window.location.href = '/';
	}
}

function loginAndSignupResponseHandler(response) {
	localStorage.setItem('token', response.token);
	localStorage.setItem('username', response.username);
	localStorage.setItem('logedOut', false);
	window.location.href = '/';
}

function loginAndSignupErrorHandler(err) {
	alertify.error(err.responseJSON.message);
}

function loginHandler(e) {
	e.preventDefault();
	let username = $('#user').val();
	let password = $('#password').val();

	$.ajax({
		type: 'POST',
		url: '/api/login',
		data: { username, password },
		success: loginAndSignupResponseHandler,
		error: loginAndSignupErrorHandler,
	});
}

function signupHandler(e) {
	e.preventDefault();
	let username = $('#user').val();
	let password = $('#password').val();

	$.ajax({
		type: 'POST',
		url: '/api/signup',
		data: { username, password },
		success: loginAndSignupResponseHandler,
		error: loginAndSignupErrorHandler,
	});
}

$(function () {
	$('#login').click(loginHandler);
	$('#signup').click(signupHandler);
});
