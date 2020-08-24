module.exports = {
    listValidation
}

function listValidation(list) {
    return Boolean(list.name && list.type_id);
}
