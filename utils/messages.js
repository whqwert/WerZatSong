const { cyan, gray, greenBright, redBright, yellow } = require('chalk')

const Message = {
    EMPTY: gray,
    ERROR: redBright,
    INFO: cyan,
    SUCCESS: greenBright,
    WARNING: yellow
}

function empty(message){
    console.log(Message.EMPTY(`[EMPTY]: ${message}`))
}

function exit(message){
    console.error(Message.ERROR(`[ERROR]: ${message}`))
    process.exit(1)
}

function info(message){
    console.log(Message.INFO(`[INFO]: ${message}`))
}

function success(message){
    console.log(Message.SUCCESS(`[SUCCESS]: ${message}`))
}

function warning(message){
    console.log(Message.WARNING(`[WARNING]: ${message}`))
}

module.exports = { empty, exit, info, success, warning }
