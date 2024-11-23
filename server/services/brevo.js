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

const sendEmailToLastParticipants = async () => {
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
    sendSmtpEmail.templateId = 2;
    
    console.log(data.name1);
    
    sendSmtpEmail.params = {
      name1: data.name1 || "Cliente",
      name2: data.name2 || "Cliente"
    }

    sendSmtpEmail.sender = {
      name: "MugMaster Game",
      email: process.env.SENDER_EMAIL
    };
    
    sendSmtpEmail.to = emails.map((email, index) => ({
      email: email,
      name: names[index] || "Usuario"
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
