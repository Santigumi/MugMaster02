const brevo = require("@getbrevo/brevo");
const { createClient } = require('@supabase/supabase-js');
require("dotenv/config");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmailToLastParticipants = async () => {
  try {
    // Get latest record
    const { data, error } = await supabase
      .from('usuarios')
      .select('email1, email2, timestamp')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    
    console.log('Participant data:', data);
    const emails = [data.email1, data.email2].filter(Boolean);

    let sendSmtpEmail = new brevo.SendSmtpEmail();
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

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Emails sent successfully to:', emails);
    return response;

  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = { sendEmailToLastParticipants };