import { Request, Response } from "express";
import nodemailer from "nodemailer";

import Ticket, { ITicket } from "../../models/ticket";
import User, { IUser } from "../../models/user";

export const Create = async (req: Request, res: Response) => {
    let { email } = req.body;

    //validation to see if exit the user on the database, if not, return a status 404 not found account to recovery
    let userResult: IUser | null = await User.findOne({ email });
    if (!userResult) return res.status(404).json({ message: `Does not exist an account with this email: ${email}, pleace try again.` })

    //creating a test account to send mail
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    



    let ticketNew: ITicket = new Ticket({ user: userResult });

    try {
        let ticketSaved: ITicket = await ticketNew.save();

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"ContactListSystem 👻" <recovery@cls.com>', // sender address
            to: userResult.email, // list of receivers
            subject: "Recovery your account", // Subject line
            text: "Recovery you password - Contact List System", // plain text body
            html: `<b>Hello, to revovery you account pleace click in the bellow link</b><br><a href="http://localhost:300/ticket/${ticketSaved._id}" target="_blank">http://localhost:300/ticket/${ticketSaved._id}</a>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    

        res.status(200).json({ message: "Ticket was added pleace check your email to revice a link to change your password.",url:nodemailer.getTestMessageUrl(info) });
    } catch (error) {
        res.status(500).json({ message: "Error adding user" })
    }
}