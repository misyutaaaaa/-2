// 初期のガチャ回数
let gachaCount = 1;

// 調味料データと対応する動画・画像
const spices = {
    normal: ["塩", "ごま油", "すき焼きのたれ", "めんつゆ", "牛丼のタレ", "焼き肉のタレ", "醤油"],
    rare: ["ケチャップ", "ご当地ソース", "マヨネーズ", "メイプルシロップ"],
    special: ["クエン酸", "レモン汁", "酢", "バニラエッセンス"]
};

const mediaFiles = {
    "塩": { video: "video/塩.mp4", image: "P/1.png" },
    "ごま油": { video: "video/ごま油.mp4", image: "P/2.png" },
    "めんつゆ": { video: "video/めんつゆ.mp4", image: "P/3.png" },
    "すき焼きのたれ": { video: "video/すき焼きのたれ.mp4", image: "P/4.png" },
    "牛丼のタレ": { video: "video/牛丼のタレ.mp4", image: "P/5.png" },
    "焼き肉のタレ": { video: "video/焼き肉のたれ.mp4", image: "P/6.png" },
    "醤油": { video: "video/醤油.mp4", image: "P/7.png" },
    "ケチャップ": { video: "video/ケチャップ.mp4", image: "P/8.png" },
    "ご当地ソース": { video: "video/ご当地ソース.mp4", image: "P/9.png" },
    "マヨネーズ": { video: "video/マヨマヨ.mp4", image: "P/10.png" },
    "メイプルシロップ": { video: "メイプルシロップ.mp4", image: "P/11.png" },
    "クエン酸": { video: "video/クエン酸.mp4", image: "P/12.png" },
    "レモン汁": { video: "video/レモン汁.mp4", image: "P/13.png" },
    "酢": { video: "video/酢.mp4", image: "P/14.png" },
    "バニラエッセンス": { video: "video/バニラエッセンス.mp4", image: "P/15.png" },
    // 他の調味料も同様に追加
};

// 累計カウント
const spiceCount = {};
for (const rank in spices) {
    spices[rank].forEach(spice => {
        spiceCount[spice] = 0;
    });
}

// ガチャ回数の調整
function adjustGachaCount(change) {
    gachaCount = Math.max(1, gachaCount + change);
    document.getElementById("gachaCount").textContent = gachaCount;
}

// ガチャを引く
function rollGacha() {
    document.getElementById("result").style.display = "none";
    document.getElementById("videoContainer").style.display = "none";
    
    if (gachaCount === 1) {
        // 1連ガチャ: 動画を再生
        const { spice } = getRandomSpiceWithRarity();
        spiceCount[spice]++;
        const videoSrc = mediaFiles[spice].video;

        const video = document.getElementById("resultVideo");
        video.src = videoSrc;
        document.getElementById("videoContainer").style.display = "block";

        video.onended = () => {
            updateCountDisplay();
        };
    } else {
        // 3連、5連、10連ガチャ: 画像を表示
        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ""; // 前回の結果をクリア

        for (let i = 0; i < gachaCount; i++) {
            const { spice } = getRandomSpiceWithRarity();
            spiceCount[spice]++;
            const imgSrc = mediaFiles[spice].image;

            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = spice;
            img.classList.add("result-image");

            imageContainer.appendChild(img);
        }
        document.getElementById("result").style.display = "block";
        updateCountDisplay();
    }
}

// ランダムに調味料を取得
function getRandomSpiceWithRarity() {
    const randomNum = Math.random();
    let selectedRank;

    if (randomNum < 0.6) {
        selectedRank = "normal";
    } else if (randomNum < 0.9) {
        selectedRank = "rare";
    } else {
        selectedRank = "special";
    }

    const spicesInRank = spices[selectedRank];
    const spice = spicesInRank[Math.floor(Math.random() * spicesInRank.length)];
    return { spice, rarity: selectedRank };
}

// 累計カウント表示を更新
function updateCountDisplay() {
    let countText = "<h2>累計カウント</h2><ul>";
    for (let spice in spiceCount) {
        countText += `<li>${spice}: ${spiceCount[spice]}回</li>`;
    }
    countText += "</ul>";
    document.getElementById("count").innerHTML = countText;
}
