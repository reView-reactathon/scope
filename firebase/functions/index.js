const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/answers/{id}').onWrite((event) => {

  // Load the event data
  const { data, params } = event;

  // Load the data references
  const userEmail = data.child('user').val();
  const questionId = data.child('question').val();
  const answerId = params.id;

  // Load the url
  const videoURL = data.child('video').val();

  // Database
  data.ref.root.once('value').then((snap) => {

    // Load the root
    const creatorEmail = snap.child(`questions/${questionId}/email`).val();
    const questionName = snap.child(`questions/${questionId}/name`).val();

    // Send the email to the question owner
    mailTransport.sendMail({
      from: '"reView Hackathon" <reviewhackathon@gmail.com>',
      to: creatorEmail,
      subject: `Your question ${questionName} has a new submission`,
      text: `Check out the video ${videoURL}`
    });

    // Send the email to the user
    mailTransport.sendMail({
      from: '"reView Hackathon" <reviewhackathon@gmail.com>',
      to: userEmail,
      subject: `Your answer to the question ${questionName} was submitted`,
      text: `Check out the video ${videoURL}`
    });
  });
});