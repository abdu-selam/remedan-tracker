const SibApiV3Sdk = require("sib-api-v3-sdk");

const ENV = require("../utils/env");

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = ENV.EMAIL_KEY;

const transporter = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = transporter;
