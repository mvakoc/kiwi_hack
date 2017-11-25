import AppDispatcher from "../dispatchers/appDispatcher";
import BotConstants from "../constants/botConstants";

export var nextBotState = function (results) {
    AppDispatcher.dispatch({
        actionType: BotConstants.NEXT_STATE,
        payload: results
    })
}

export var prevBotState = function (results) {
    AppDispatcher.dispatch({
        actionType: BotConstants.PREV_STATE,
    })
}

export var resetBotState = function (results) {
    AppDispatcher.dispatch({
        actionType: BotConstants.RESET_BOT,
    })
}