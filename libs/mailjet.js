'use strict';

const { mailjet } = require('../env');
const { connect } = require('node-mailjet');



class EmailService {
    constructor() {
        this.client = connect(mailjet.apiKey, mailjet.secretKey);
    }

    sendEmail(options) {
        const htmlTpl = require(`../views/${options.type}-template`);

        var emailData = {
            'FromEmail': mailjet.email,
            'FromName': mailjet.from,
            'Subject': options.subject,
            'HTML-part': htmlTpl(options),
            'Recipients': [{ 'Email': options.email }]
        }

        return this.client.post('send').request(emailData)
    }
}

module.exports = new EmailService();