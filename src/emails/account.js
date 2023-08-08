const sendgridAPIkey = "enter_key_here";
const sgMail = require;

sgMail.setApiKey(sendgridAPIkey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "michael.gacetta@gmail.com",
    subject: "welcome!",
    text: `Welcome to the app, ${name}.  Thanks for signing up!`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "michael.gacetta@gmail.com",
    subject: "goodbye",
    text: `Sorry to see you go, ${name}!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
