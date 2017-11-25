import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore'
import BotConstants from '../constants/botConstants'
import assign from 'object-assign'


var _currentStateIndex = 0
var _isInRepeatState = false;

const _states = [
    {
        text: ""
    },
    {
        text: "Good afternoon Adele, I have some travel tips for you! Are you interested?"
    },
    {
        text: "What about traveling to Portugal? Check out these pics from Instagram!",
        offers: [
            {
                name: "@klara_fai",
                path: "./images/por3.jpg"
            },
            { 
                name: "@klara_fai",
                path: "./images/por2.jpg"
            },
            {
                name: "@klara_fai",
                path: "./images/por1.jpg"
            },
        ]
    },
    {
        text: "Tomorrow it will be 20 degrees in Porto during the day and the wind will reach 15 kilometers per hour."
    },
    {
        text: "Sure, what about Rome? It will be 20 degrees there tomorrow, the wind will reach only 3 kilometers per hour. Check out this picture from your friend eating ice cream there.",
        offers: [
            {
                name: "@klara_fai",
                path: "./images/Rome3.png"
            },
        ]
    
    },
    {
        text: "Check other pictures of Rome from Instagram!",
        offers: [
            {
                name: "@klara_fai",
                path: "./images/Rome1.png"
            },
            {
                name: "@klara_fai",
                path: "./images/Rome2.png"
            },
            {
                name: "@klara_fai",
                path: "./images/Rome4.jpg"
            },
        ]
    },
    {
        text: "You have two options. You can fly today from Prague for 2500 Czech koruna or tomorrow morning from Vienna for 1400 Czech koruna including RegioJet ticket. The flight back to Prague is on Sunday at 9pm."
    },
    {
        text: "No problem. Checking Face ID, I can see it’s you. Are you sure you want to purchase the tickets? "
    },
    {
        text: "Here are your tickets. I wish you nice travels. If you needed more information, let me know, I am always here for you.",
        offers: [
            {
                name: "@klara_fai",
                path: "./images/board1.jpg"
            },
            {
                name: "@klara_fai",
                path: "./images/board2.jpg"
            },
            {
                name: "@klara_fai",
                path: "./images/regioJet.png"
            }
        ]
    },
    {
        text: "Why did the librarian get kicked off the plane? Because it was overbooked."
    }


    
]

var BotStore = assign({}, BaseStore, {
    getState() {
        if (_isInRepeatState) {
            _isInRepeatState = false;
            return {
                "text": "Sorry, but I don't understand."
            }
        }
        return _states[_currentStateIndex];
    },
    setStateIndex(index) {
        _currentStateIndex = index
    },
    getStateIndex() {
        return _currentStateIndex
    },
    findNewState(text) {
        var newIndex = _currentStateIndex;

        if (!text) {
            newIndex++;
            return newIndex;
        }

        text = text.toLowerCase().replace(/\./g, ' ').split(' ');
        console.log(text);

        switch (_currentStateIndex) {
            case 0:
                newIndex++;
                break
            case 1:
                if (text.some(x => ["yes", "course", "sure", "yeah", "absolutely", "love", "interested", "totally"].indexOf(x) >= 0)) {
                    newIndex++;
                    console.log("I understand");
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 2:
            if (text.some(x => ["weather", "cool", "good", "yes"].indexOf(x) >= 0)) {
                    newIndex++;
                    console.log("I understand");
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 3:
                if (text.some(x => ["windy", "much", "too"].indexOf(x) >= 0)) {
                    newIndex++;
                    console.log("I understand");
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 4:
                if (text.some(x => ["more", "pictures", "show", "see", "there", "love"].indexOf(x) >= 0)) {
                    newIndex++;
                    console.log("I understand");
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 5:
                if (text.some(x => ["much", "tickets", "ticket", "flight", "get", "love"].indexOf(x) >= 0)) {
                    newIndex++;
                    console.log("I understand");
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 6:
                if (text.some(x => ["Vienna", "book", "ticket", "regio", "jet", "flight", "cool"].indexOf(x) >= 0)) {
                    newIndex++;
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 7:
                if (text.some(x => ["yes", "absolutely", "sure", "go", "ahead", "cool"].indexOf(x) >= 0)) {
                    newIndex++;
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 8:
                if (text.some(x => ["joke", "fun", "story", "funny"].indexOf(x) >= 0)) {
                    newIndex++;
                }
                else {
                    _isInRepeatState = true;
                    console.log("I don't understand");
                }
                break
            case 9:
                break
        }

        if (newIndex >= _states.length) {
            newIndex = _states.length - 1;
        }
        return newIndex
    }
});

AppDispatcher.register(function (action) {
    let newIndex
    switch (action.actionType) {
        case BotConstants.NEXT_STATE:
            newIndex = BotStore.findNewState(action.payload)
            BotStore.setStateIndex(newIndex)
            setTimeout(() => BotStore.emitChange(), Math.floor(Math.random() * 400) + 300)
            break
        case BotConstants.PREV_STATE:
            newIndex = _currentStateIndex - 1;
            if (newIndex < 0) newIndex = 0;
            BotStore.setStateIndex(newIndex)
            BotStore.emitChange()
            break
        case BotConstants.RESET_BOT:
            BotStore.setStateIndex(0)
            BotStore.emitChange()
            break
        default:
        // no op
    }
})

export default BotStore