import {BEConfig} from "./config";
import store from "../../store/store";

const apiUrl = {
    getBlockListByHeight: BEConfig.apiBaseUrl + "/block_list",
    getMiscInfo: BEConfig.apiBaseUrl + "/misc",
    getTransactionList: BEConfig.apiBaseUrl + "/transaction/list/page",
    getTransferList: BEConfig.apiBaseUrl + "/transfer/list/page",
    getAddressList: BEConfig.apiBaseUrl + "/address/list/page",
}

function callApi(url, callback, error) {
    $.getJSON(url)
        .done(function (data) {
            if(callback instanceof Function) {
                callback(data)
            }
        })
        .fail(function (data) {
            if(error instanceof Function) {
                error(data)
            }

            console.log("failed: ", data)
        })

    return new Date().getTime()
}

function getAddressList(page, callback, error) {
    return callApi(apiUrl.getAddressList + '/' + page, callback, error)
}

function getTransferList(page, callback, error) {
    return callApi(apiUrl.getTransferList + '/' + page, callback, error)
}

function getTransactionsList(page, callback, error) {
    return callApi(apiUrl.getTransactionList + '/' + page, callback, error)
}

function getBlockListForHeight(height, callback, error) {
    return callApi(apiUrl.getBlockListByHeight + '/' + height, callback, error)
}

function getMiscInfo(placeholder, callback, error) {
    return callApi(apiUrl.getMiscInfo, callback, error)
}

export default {
    getBlockListForHeight,
    getMiscInfo,
    getTransactionsList,
    getTransferList,
    getAddressList,
}