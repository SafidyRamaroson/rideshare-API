const getFormatDate = (formatDatetime) => {
    return formatDatetime.split("T")[0].replaceAll("-","/").split("/").reverse().join("/");
}

module.exports = getFormatDate;