new Swiper('.image-box-flex', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1 // Fixed typo here
    },
    768: {
      slidesPerView: 1 // Fixed typo here
    },
    1024: {
      slidesPerView: 2 // Fixed typo here
    },
  }
});
const btn = document.getElementById("down");
btn.addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});

const cta = document.getElementById("cta");
const text = document.getElementById("text");

let showing = false;

cta.addEventListener("click", () => {

  if (showing === false) {
    text.innerText = "This is Nova Tech made by Code with Caleb";
    showing = true;
  } 
  
  else {
    text.innerText = "";
    showing = false;
  }

});
const display =document .querySelector(".display");
document.addEventListener("mousemove",(e)=>
{
    display.style.left =e.clientX +"px";
    display.style.top =e.clientY + "px";
    display.style.opacity="1"
    
});
document.addEventListener("mouseleave", ()=> 
{
    display.style.opacity="0";
})
document.addEventListener("mouseenter", ()=> 
{
    circle.style.opacity="1";
})
const circle =document .querySelector(".circle");
let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;
document.addEventListener("mousemove",(e)=>
{
    mouseX = e.clientX;
    mouseY = e.clientY;
    circle.style.opacity="1"
    
});
document.addEventListener("mouseleave", ()=> 
{
    circle.style.opacity="1";
})
document.addEventListener("mouseenter", ()=> 
{
    display.style.opacity="1";
})
function animate() {
    circleX += (mouseX - circleX) * 0.1;
    circleY += (mouseY - circleY) * 0.1;
    circle.style.left = circleX + "px";
    circle.style.top = circleY + "px";
    requestAnimationFrame(animate);
}
animate();
