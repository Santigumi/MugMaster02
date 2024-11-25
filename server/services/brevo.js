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

const updateCouponSelection = async (nombreProducto) => {
  try {
      // Llama a la función RPC para incrementar la cantidad
      const { data, error } = await supabase
          .rpc('incrementar_cantidad', { cupon_producto: nombreProducto }); // Asegúrate de que el nombre del parámetro coincida

      if (error) throw error;

      console.log(`Producto ${nombreProducto} actualizado. Nuevas selecciones:`, data);
  } catch (error) {
      console.error('Error actualizando la selección del cupón:', error);
  }
};

const sendEmailToLastParticipants = async (nombreProducto) => {
  console.log("=== Starting Email Service ===");
  try {
    console.log("Fetching data from Supabase...");
    const { data, error } = await supabase
      .from('usuarios')
      .select('email1, email2, name1, name2, createdtAt')
      .order('createdtAt', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    
    console.log('Participant data:', data);
    const emails = [data.email1, data.email2].filter(Boolean);
    const names = [data.name1, data.name2].filter(Boolean);

    console.log('Filtered emails:', emails);
    let sendSmtpEmail = new brevo.SendSmtpEmail();    
  
    switch (nombreProducto) {
      case 'Hot-tea':
        sendSmtpEmail.templateId = 10;
        break;
      case 'Snacks':
        sendSmtpEmail.templateId = 9;
        break;
      case 'Cakepops':
        sendSmtpEmail.templateId = 8;
        break;
      case 'Breakfast':
        sendSmtpEmail.templateId = 7;
        break;
      case 'Coffee':
        sendSmtpEmail.templateId = 6;
        break;
      case 'cold-drinks':
        sendSmtpEmail.templateId = 5;
        break;
      default:
        throw new Error('Cupón no válido.');
    }
    
    console.log(data.name1);
    
    sendSmtpEmail.dynamicTemplateData = {
      "name1": data.name1,
      "name2": data.name2
    };

    sendSmtpEmail.sender = {
      name: "MugMaster Game",
      email: process.env.SENDER_EMAIL
    };
    
    sendSmtpEmail.to = emails.map(email => ({
      email: email
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

module.exports = { sendEmailToLastParticipants, updateCouponSelection};

// Add this at the bottom of the file, before module.exports
console.log("Brevo service loaded");

// Immediately invoke the function to test
// sendEmailToLastParticipants()
//   .then(() => console.log("Email process completed"))
//   .catch((err) => console.log("Error:", err));
