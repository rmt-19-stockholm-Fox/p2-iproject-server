const SANDBOX_BASE_URL = `https://api.sandbox.midtrans.com/v2`;
const PRODUCTION_BASE_URL = `https://api.midtrans.com/v2`;

class Config {
  static serverKey = "Mid-server-nJRmjPcBDnnK_26E6NGAhr2Z";
  static isProduction = false;
  static is3ds = false;
  static isSanitaized = false;

  static getBaseUrl() {
    return Config.isProduction ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL;
  }
}

module.exports = {
  Config,
};
