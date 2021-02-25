const twitterUtils = require("./src/Utils/TwitterUtils")

setInterval(() => {
    twitterUtils
        .postQuestions()
        .then(() => console.log("Questions posted!"))
}, 43200000) // 12 hours