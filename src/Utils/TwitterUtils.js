const puppeteer = require("puppeteer")
require("dotenv").config()
const Twit = require("twit")
const T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACESS_TOKEN,
    access_token_secret:  process.env.ACESS_TOKEN_SECRET
})

async function postQuestions() {
    const questions = await getQuestions()

    T.post("statuses/update", { status: `New questions!\n\nQuestion 1: ${questions.question1}\nQuestion 2: ${questions.question2}` })
}

async function getQuestions() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto("https://either.io");
    const questions = await page.evaluate(() => {
        const question1 = document.getElementsByClassName("option-text")[0].textContent
        const question2 = document.getElementsByClassName("option-text")[1].textContent

        return {
            question1: question1,
            question2: question2
        }
    })

    await browser.close();

    return questions
}

module.exports = {
    postQuestions: postQuestions
}