// Remember that adding properties to exports adds them to the interface of the module.
// 익스포츠에 추가된 인자는 모듈 인터페이스에 추가된다.
exports.reverse = function(string) {
    return Array.from(string).reverse().join("");
}