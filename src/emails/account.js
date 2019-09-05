const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "permanuss99@gmail.com",
        subject: "Welcome to the app.",
        text: `Welcome to the app ${name}. Let me know how you get along with the app.`,
        html: "<h1>Welcome</h1>"
    })
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "permanuss99@gmail.com",
        subject: "We are sorry for the loss",
        text: `Good bye ${name}. Could we have done something to keep you?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}