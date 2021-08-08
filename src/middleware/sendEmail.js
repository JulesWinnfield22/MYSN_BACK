const credentials = require('../../.credentials.json')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(credentials.sendgrid.API_KEY);

module.exports = (user, token) => {
console.log(token)
	const message = {
		from: 'abelteame22@gmail.com',
		to: user.email,
		subject: 'Thank you for registering!',
		html: `
			<h1>Hello, ${user.username}!</h1>
			<h1>Thank you for regestering to our social media(it does'nt have a name yet)! but we are exited to have you.</h1>
			<p style='margin-top: 10px'>so in order to complete your registeration enter the following code</p>
			<p style='text-align: center; margin: 10px 0; font-size: 25px;'>${token}</p>
		`
	}

	sgMail.send(message)
		.then(res => console.log('Email sent: ', res))
		.catch(err => {
			console.err('error', err)
		})
}