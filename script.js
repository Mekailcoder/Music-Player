let playArr = [
  {
    songName: "Dhun Song",
    url: "./music/Dhun Saiyaara - Saiyaara 128 Kbps.mp3",
    img: "./image/Dhun.jpg",
    singerName: "Arijit singh",
  },
  {
    songName: "Soory Song",
    url: "./music/Sorry.mp3",
    img: "./image/justine_Bieber.jfif",
    singerName: "justin Bieber",
  },
  {
    songName: "Tum Hi Hoo song",
    url: "./music/tum_hi_hoo(mp3.pm).mp3",
    img: "./image/Arijit-Sings.jpg",
    singerName: "Arijit Singh",
  },
  {
    songName: "What Do You Mean",
    url: "./music/What_Do_You_Mean(mp3.pm).mp3",
    img: "./image/justine_Bieber.jfif",
    singerName: "justin Bieber",
  },
  {
    songName: "Saiyaara Titel Song",
    url: "./music/Saiyaara(mp3.pm).mp3",
    img: "./image/saiyaara.jfif",
    singerName: "Fahime",
  },
  {
    songName: "That That song",
    url: "./music/PSY - 'That That (prod. & feat. SUGA of BTS)' MV.mp3",
    img: "./image/psy.jpg",
    singerName: "PSY & Suga",
  },
];

let card_conatiner = document.querySelector(".card_container");
let listData = document.querySelector(".musicList");
let playImg = document.querySelector("#ply_img");
let play = document.querySelector("#play");
let icon = play.querySelector("i");
let backward = document.querySelector("#backward");
let forward = document.querySelector("#forward");
let box_img = document.querySelector(".box_img");
let title = document.querySelector(".song-title");
let singer = document.querySelector(".singer-name");

let audio = new Audio();
let songs = 0;
// this is function of topChar list
function topMusicfunc() {
  let deta = "";

  playArr.forEach((elem, idx) => {
    deta += `   <div class="card" id=${idx}>
      <img src="${elem.img}" alt="" />
      <h4>${elem.songName}</h4>
      <p>${elem.singerName}</p>
    </div>`;
  });
  card_conatiner.innerHTML = deta;
}
topMusicfunc();
// this is function of lis of songs
function listFunc() {
  let data2 = "";

  playArr.forEach((elem, idx) => {
    data2 += `  <div class="list" data-index="${idx}">
            <div class="img-div">
              <h3>${idx + 1}</h3>
              <img src="${elem.img}" alt="" />
            </div>
            <h4 id=${idx}>${elem.songName}</h4>
            <p>${elem.singerName}</p>
            <p>3:20</p>
          </div>`;
  });

  audio.src = playArr[songs].url;
  playImg.src = playArr[songs].img;
  title.innerText = playArr[songs].songName;
  singer.innerText = playArr[songs].singerName;

  listData.innerHTML = data2;
}
listFunc();
//  this code for play according to the list click 
listData.addEventListener("click", (dets) => {
  let listItem = dets.target.closest(".list");
  let index = Number(listItem.dataset.index);
  songs = index;
  listFunc();
  box_img.style.animation = "spin 6s linear infinite";
  play.innerHTML = '<i class="paly_btn_icon middle ri-pause-mini-line"></i>';
  audio.play();
  console.log(playArr[index].img);
});

// this is bar of play music
const progress = document.querySelector(".progress");

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;

    progress.style.width = `${progressPercent}%`;
  }
});
// this code is continue play music
audio.addEventListener("ended", () => {
  songs = (songs + 1) % playArr.length;

  listFunc();
  audio.play();

  box_img.style.animation = "spin 6s linear infinite";
  play.innerHTML = '<i class="paly_btn_icon middle ri-pause-mini-line"></i>';
});
//  this code for play button
play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    box_img.style.animation = "spin 6s linear infinite";
    play.innerHTML = '<i class="paly_btn_icon middle ri-pause-mini-line"></i>';
  } else {
    audio.pause();
    play.innerHTML = '<i class="paly_btn_icon middle ri-play-fill"></i>';
    box_img.style.animationPlayState = "paused";
  }
});

//  this code for forward button
forward.addEventListener("click", () => {
  if (songs < playArr.length - 1) {
    songs++;
    listFunc();
    audio.play();
    forward.style.opacity = 1;
  } else {
    forward.style.opacity = 0.4;
  }
});
//  this code for backword button
backward.addEventListener("click", () => {
  if (songs > 0) {
    songs--;
    listFunc();
    audio.play();
    backward.style.opacity = 1;
  } else {
    backward.style.opacity = 0.4;
  }
});
