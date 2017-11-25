import AppDispatcher from "../dispatchers/appDispatcher";
import DashboardConstants from "../constants/dashboardConstants";

export var listCampaigns = function (results) {
    AppDispatcher.dispatch({
        actionType: DashboardConstants.LIST_ITEMS,
    })
}

export var seeDetail = function (results) {
    AppDispatcher.dispatch({
        actionType: DashboardConstants.SEE_DETAIL,
    })
}