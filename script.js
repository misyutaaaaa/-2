const ingredients = [
    { name: "塩", image: "1.png" },
    { name: "ごま油", image: "2.png" },
    { name: "めんつゆ", image: "3.png" },
    { name: "すき焼きのたれ", image: "4.png" },
    { name: "牛丼のタレ", image: "5.png" },
    { name: "焼肉のタレ", image: "6.png" },
    { name: "醤油", image: "7.png" },
    { name: "ケチャップ", image: "8.png" },
    { name: "ご当地ソース", image: "9.png" },
    { name: "マヨネーズ", image: "10.png" },
    { name: "メイプルシロップ", image: "11.png" },
    { name: "クエン酸", image: "12.png" },
    { name: "レモン汁", image: "13.png" },
    { name: "酢", image: "14.png" },
    { name: "バニラエッセンス", image: "15.png" }
];

// ガチャを引く回数に応じて画像を表示する
function drawGacha(times) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // 前の結果をクリア

    for (let i = 0; i < times; i++) {
        const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        const img = document.createElement("img");
        img.src = ingredient.image;
        img.alt = ingredient.name;
        resultsDiv.appendChild(img);
    }
}
