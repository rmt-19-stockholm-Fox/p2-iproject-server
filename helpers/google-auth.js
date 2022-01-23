const { OAuth2Client } = require('google-auth-library');

module.exports = {
  async verify(token) {
    const clientId = process.env.GAUTH_CLIEND_ID;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId
    });
  
    return ticket.getPayload();
  }
}
