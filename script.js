

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
