const twitterUtils = require("./src/Utils/TwitterUtils")

twitterUtils
    .postQuestions()
    .then(() => console.log("Questions posted!"))