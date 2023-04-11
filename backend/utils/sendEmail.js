import 'dotenv/config';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import transporter from '../helpers/emailTransport.js';
import { systemLogs } from './Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
    try {
        const sourceDir = fs.readFileSync(
            path.join(__dirname, template),
            'utf-8'
        );

        const compilesTemplate = handlebars.compile(sourceDir);

        const emailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subject,
            html: compilesTemplate(payload),
        };
        await transporter.sendMail(emailOptions);
    } catch (error) {
        systemLogs.error`Email not send: ${error}`;
    }
};

export default sendEmail;
