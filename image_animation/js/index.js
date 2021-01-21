// const $banner = $('.banner'),
//   $blocks = $('.blocks'); 
// let blocks = ""; 
// console.log($blocks);
// for (var index = 1; index < 400; index++) {
//   blocks += "<div class='blocks'></div>";
//   $blocks.css("animationDelay", `{index * 0.05}s`) ;
// }

// $banner.html(blocks);

const banner = document.getElementsByClassName('banner')[0];
const blocks = document.getElementsByClassName('blocks');

console.log(banner);
for(var i = 1; i < 400; i++) {
  banner.innerHTML += "<div class='blocks'></div>";
  blocks[i].style.animationDelay = `${i * 0.05}s`;
}
