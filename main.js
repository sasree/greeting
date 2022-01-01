// Happy New Year!!!
//
// Basically I just combined three great ideas :)
// Canvas Snow, Fireworks.gif
//
// This awesome Canvas Snow was created along with Paul Lewis:
// https://www.youtube.com/watch?v=VW8qoyYzWGg&t
//
class Snowflake {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.radius = 0;
      this.alpha = 0;
  
      this.reset();
    }
  
    reset() {
      this.x = this.randBetween(0, window.innerWidth);
      this.y = this.randBetween(0, -window.innerHeight);
      this.vx = this.randBetween(-3, 3);
      this.vy = this.randBetween(2, 5);
      this.radius = this.randBetween(1, 4);
      this.alpha = this.randBetween(0.1, 0.9);
    }
  
    randBetween(min, max) {
      return min + Math.random() * (max - min);
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.y + this.radius > window.innerHeight) {
        this.reset();
      }
    }
  }
  
  class Snow {
    constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
  
      window.addEventListener("resize", () => this.onResize());
      this.onResize();
      this.updateBound = this.update.bind(this);
      requestAnimationFrame(this.updateBound);
  
      this.createSnowflakes();
    }
  
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  
    createSnowflakes() {
      const flakes = window.innerWidth / 4;
  
      this.snowflakes = [];
  
      for (let s = 0; s < flakes; s++) {
        this.snowflakes.push(new Snowflake());
      }
    }
  
    update() {
      this.ctx.clearRect(0, 0, this.width, this.height);
  
      for (let flake of this.snowflakes) {
        flake.update();
  
        this.ctx.save();
        this.ctx.fillStyle = "#FFF";
        this.ctx.beginPath();
        this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.globalAlpha = flake.alpha;
        this.ctx.fill();
        this.ctx.restore();
      }
      requestAnimationFrame(this.updateBound);
    }
  }
//   new Snow();
//  const snowBtn = document.getElementById("snow")
//     const fireBtn = document.getElementById("fireworks")
const switchBtn = document.getElementById("switch-btn");
//     snowBtn.addEventListener('click', (e) => {
//       if(document.getElementsByTagName("canvas").length !=1) {
//         new Snow();
//         document.body.style.backgroundImage =""
//       }
//   })
//     fireBtn.addEventListener('click', (e) => {
//       const v = document.getElementsByTagName("canvas")[0]
//       document.body.removeChild(v)
//       document.body.style.backgroundImage = "url(http://image.s6.exacttarget.com/lib/fe9112727d67047576/m/1/uber_MADD_Fireworks-Mobile_v3-15fps-compressor.gif)"
//   })

const feedBack = document.getElementById("labelBackground")
feedBack.addEventListener("click",()=>{
    window.location.href = "index.html"
})

new Snow();

switchBtn.addEventListener("change", (e) => {
    e.target.checked ? toggleTheme("christmas") : toggleTheme("snow");
  });
  
  function toggleTheme(newTheme) {
    switch (newTheme) {
      case "snow":
        if(document.getElementsByTagName("canvas").length !==1) {
                    new Snow();
                    document.body.style.backgroundImage =""
        }
        break;
      case "christmas":
        const v = document.getElementsByTagName("canvas")[0]
      document.body.removeChild(v)
      document.body.style.backgroundImage = "url(http://image.s6.exacttarget.com/lib/fe9112727d67047576/m/1/uber_MADD_Fireworks-Mobile_v3-15fps-compressor.gif)"

        break;
    }
  }
  