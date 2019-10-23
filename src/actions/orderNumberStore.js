var orderNumberList = [];

function checkElementsPresent() {
    if (orderNumberStore.length === 0) {
        throw new Error('orderNumberStore is empty');
    }
}

var orderNumberStore = {

    reset: function reset() {
        orderNumberList = [];
    },

    add: function add(orderNumber) {
        orderNumberList.push(orderNumber.toString());
    },

    getLatest: function getLatest() {
        checkElementsPresent();
        return orderNumberList[orderNumberList.length - 1]
    },

    getFromEnd: function getFromEnd(positionFromEnd) {
        checkElementsPresent();
        return orderNumberList[orderNumberList.length - (positionFromEnd + 1)];
    },

    getFromStart: function getFromStart(positionFromStart) {
        checkElementsPresent();
        return orderNumberList[positionFromStart];
    },

    getAll: function getAll() {
        return orderNumberList;
    }
};

module.exports = orderNumberStore;