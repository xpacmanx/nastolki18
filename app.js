const TeleBot = require('telebot');
const bot = new TeleBot(process.env.TG_TOKEN);

const list = {
    data: {
        'да': 'пизда',
        'da': 'pizda',
        'net': 'pidora otvet',
        'нет': ['пидора ответ', 'http://memesmix.net/media/created/muem7j.jpg'],
    },
    random(arr) {
        if (typeof (arr) != 'object' || arr.length == 0) return false
        let min = Math.ceil(0)
        let max = Math.floor(arr.length)
        return arr[Math.floor(Math.random() * (max - min)) + min]
    },
    get(query) {
        switch (typeof this.data[query]) {
            case 'undefined':
                return false
                break;
            case 'string':
                return this.data[query]
                break;
            case 'object':
                return this.random(this.data[query])
                break;
            default:
                return false
                break;
        }
    }
}

let count = 0

bot.on('text', function (msg) {
    let query = msg.text.split(' ')
    query = query[query.length - 1].toLowerCase()
    query = query.replace(/[^a-zа-я0-9]+/g, '')
    let message = list.get(query)
    if (message) {
        count++
        if (count % 2) return false
        if (count > 99) count = 0
        bot.sendMessage(msg.from.id, message, { replyToMessage: msg.message_id });
        // msg.reply.text(message)
    }
});

bot.start();