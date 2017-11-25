import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore'
import DashboardConstants from '../constants/dashboardConstants'
import assign from 'object-assign'

var _items = [
    {
        "name": "FH 554",
        "path": "./images/dashboard/FH 554.png",
        "engagement": "20%"
    },
    {
        "name": "Frezhster 6X",
        "path": "./images/dashboard/Frezhster 6X.png",
        "engagement": "30%"
    },
    {
        "name": "HVAC",
        "path": "./images/dashboard/HVAC.png",
        "engagement": "25%"
    },
    {
        "name": "LG BTU 5000",
        "path": "./images/dashboard/LG BTU 5000.png",
        "engagement": "39%"
    }
]

var DashboardStore = assign({}, BaseStore, {
    getItems() {
        return _items;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case DashboardConstants.LIST_ITEMS:
            //TODO
            DashboardStore.emitChange()
            break
        case DashboardConstants.SEE_DETAIL:
            //TODO
            DashboardStore.emitChange()
            break
        default:
        // no op
    }
})

export default DashboardStore