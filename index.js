import express from 'express'
import nodemailer from 'nodemailer'


const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');

app.use(express.static('.'))


const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'david.ouellette12@gmail.com',
            pass: 'qyrwgmeyhagbugrg'
        }
    })


app.get('/', (req, res) => {
    res.render("pages/index")
})

app.get("/contact", (req, res) => {
    res.render("pages/contact")
})

app.post("/contact", (req, res) => {
    if (req.body) {
        transporter.sendMail({
            from: '"' + req.body.name + '"' + '<' + req.body.email + '>',
            to: "amanda.e.fox@outlook.com",
            subject: req.body.name + " wants to get in contact with you",
            text: req.body.message + " " + req.body.email,
        }, (err, info) => {
            if (err) console.log(err)
            else console.log(info)
        })
        res.render("pages/contact", {msg: "Thank you for reaching out! I'll be in contact soon."})
    }
})

app.get("/about", (req, res) => {
    res.render("pages/about")
})
app.get("/work", (req, res) => {
    res.render("pages/work")
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})