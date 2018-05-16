import {eventFactory} from "be-eventbus";

const beEventNames = {
    TABLE_PAGE_CHANGED: "TABLE_PAGE_CHANGED",
    GET_PAGE_SUCCESS: "GET_PAGE_SUCCESS",
    GET_PAGE_FAILED: "GET_PAGE_FAILED",
    ENABLE_PAGINATE: "ENABLE_PAGINATE",
}

const beEvents = Object.assign({
    factory: eventFactory,
},beEventNames)

export {
    beEvents
}

