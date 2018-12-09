"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeMap = {
    Car: {
        brand: [
            "Ford",
            "Porsche",
            "Audi",
            "Volvo",
            "Toyota",
            "Fiat",
            "BMW",
            "Mercedes-Benz"
        ]
    },
    Laptop: {
        brand: ["Lenovo", "Dell", "HP", "Acer", "Asus", "Apple", "Razer", "Samsung"]
    }
};
var gender = ["male", "female"];
var ticker = ["AAPL", "MSFT", "GE", "GOOG", "CNET", "JPM", "NYT"];
var fieldMap = {
    gender: {
        match: ["gender", "sex"],
        values: gender
    },
    ticker: {
        match: ["ticker", "symbol", "stock"],
        values: ticker
    }
};
exports.examples = {
    typeMap: typeMap,
    fieldMap: fieldMap
};
