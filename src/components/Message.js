export function Build(tags, message) {
    const data = {
        "notification":
        {
            "title": "Drica",
            "body": message,
            "click_action": "http://www.softcomtecnologia.com.br/",
            "icon": "https://firebasestorage.googleapis.com/v0/b/smobile-147814.appspot.com/o/comum%2Frecursos%2Ficon_51x51.png?alt=media&token=ae31b093-8524-4190-8f31-36f26f532edf"
        }, "to": tags
    }
    return data;
}
