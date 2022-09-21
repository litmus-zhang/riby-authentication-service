const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const PasswordResetMailSender = async (name, email) =>
{
    try
    {
        const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "no-reply@riby.me",
                Name: "Riby"
              },
              To: [
                {
                  Email: email,
                  Name: name
                }
              ],
              Subject: "Password Reset Request",
              TextPart: "You have requested to reset your password",
                  HTMLPart: `<h3>Dear ${name}, there was a request to reset your password</h3><br /><a href="http://localhost:3000/reset-password">
              <button>Click here to reset your password</button></a>`,
            }
          ]
        })
    const result = await request;
    console.log(result.body);
} catch (error) {
    console.log(error.statusCode)
}
}

const AgentEmailSender = async (name, email, password) =>
{
    try
    {
        
        const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "no-reply@riby.me",
                Name: "Riby"
              },
              To: [
                {
                  Email: email,
                  Name: name
                }
              ],
              Subject: "Password Reset Request",
              TextPart: "You have requested to reset your password",
                  HTMLPart: `<h4>Dear ${name}, Welcome to Riby Support</h4>
                  <br />
                  <p>
                  Here are your login details:
                    <br />
                    Email: ${email}
                    <br />
                    Password: ${password}
                  Thank you for joining our team. We are excited to have you on board. We are looking forward to working with you.</p>
                  <a href="http://localhost:3000/reset-password">
              <button>Click here to login </button></a>`,
            }
          ]
        })
    const result = await request;
    console.log(result.body);
} catch (error) {
    console.log(error.statusCode)
}
}



module.exports = PasswordResetMailSender, AgentEmailSender;