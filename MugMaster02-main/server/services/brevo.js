const brevo = require("@getbrevo/brevo");
const { createClient } = require('@supabase/supabase-js');
require("dotenv/config");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmailToLastParticipants = async () => {
  console.log("=== Starting Email Service ===");
  try {
    console.log("Fetching data from Supabase...");
    const { data, error } = await supabase
      .from('usuarios')
      .select('email1, email2, createdtAt')
      .order('createdtAt', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    
    console.log('Participant data:', data);
    const emails = [data.email1, data.email2].filter(Boolean);
    console.log('Filtered emails:', emails);

    let sendSmtpEmail = new brevo.SendSmtpEmail();
    console.log('Creating email template...');
    
    sendSmtpEmail.subject = "MugMaster Game Results";
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h1>MugMaster Game Results</h1>
          <p>Thank you for participating in the game!</p>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = {
      name: "MugMaster Game",
      email: process.env.SENDER_EMAIL
    };
    
    sendSmtpEmail.to = emails.map(email => ({
      email: email,
      name: "usuarios"
    }));

    console.log('Sending emails...');
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Emails sent successfully to:', emails);
    return response;

  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};
module.exports = { sendEmailToLastParticipants };

// Add this at the bottom of the file, before module.exports
console.log("Brevo service loaded");

// Immediately invoke the function to test
sendEmailToLastParticipants()
  .then(() => console.log("Email process completed"))
  .catch((err) => console.log("Error:", err));
