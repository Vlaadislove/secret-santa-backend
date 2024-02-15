import nodemailer from "nodemailer"
import dotenv from 'dotenv'
import { ICreate, IPair } from "./randomize-service"
dotenv.config()

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,

            pass: process.env.SMTP_PASSWORD,
        }
    })

export function sandEmailRandomize(create:ICreate, pairs: IPair[],link:string) {
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: `${create.email}`,
        subject: 'Результаты быстрой жеребьевки на Тайного Санту',
        text: '',
        html: 
            `
            <div>
            <h1 style='text-align: center' id="welcome">Тайный санта</h1>
            <p>Привет, ${create.name} </p>
            <p>Результаты быстрой жеребьевки готовы. Чтобы увидеть Тайныйх Сант, перейдите на сайт и нажмите на кнопку 'Узнать Тайного Санту' напротив имени участника</p>
            <a href=${process.env.CLIENT_URL}/randomize/${link}>Тут все участники</a>
            </div>
            `
    })

    for (let i = 0; i < pairs.length; i++) {
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: `${pairs[i].gifter.email}`,
            subject: 'Подопечный для Тайного Санты',
            text: '',
            html: 
                `
                <div>
                <h1 style='text-align: center' id="welcome">Тайный санта</h1>
                <p>Привет, ${pairs[i].gifter.name}</p>
                <p>Пользователь <span style='font-weight: bold;'>${create.name}</span> (${create.email}) пригласил тебя участвовать в игре Тайный Санта
                через сайт <a style='  color:red;text-decoration: none;font-weight:400' href="#!">https://santa-secret.ru</a><br/> Твой подопечный: <span style='font-weight: bold;'>${pairs[i].recipient.name} (${pairs[i].recipient.email})</span> </p>
                </div>
                `
        })
    }

}
