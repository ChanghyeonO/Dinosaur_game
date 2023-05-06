let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img1 = new Image();
img1.src = 'bear.png';

let dino = {
    x: 100,
    y: 200,
    width: 200,
    height: 200,
    draw() {
        ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // 판정박스 확인시 사용
        ctx.drawImage(img1, this.x, this.y);
    }
}

let img2 = new Image();
img2.src = 'hamster.png';


class Cactus {
    constructor() {
        this.x = 2000;
        this.y = 400;
        this.width = 200;
        this.height = 200;
    }
    draw() {
        ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // 판정박스 확인시 사용
        ctx.drawImage(img2, this.x, this.y);
    }
}

let timer = 0;
let severalCactus = [];
let jumping = false;
let jumpTimer = 0;
let animation;

function frameRun() {
    animation = requestAnimationFrame(frameRun);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 800 === 0) {
        let cactus = new Cactus;
        severalCactus.push(cactus);
        cactus.draw()
    }
    //60프레임마다 장애물 생성해서 array에 집어넣음

    severalCactus.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1)
        }

        crash(dino, a);

        a.draw();
        a.x--;
    })
    //array에 있던 거 다 draw();


    if (jumping == true) {
        dino.y--;
        jumpTimer++;
    }

    if (jumping == false) {
        if (dino.y < 400) {
            dino.y++;
        }
    }

    if (jumpTimer > 200) {
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

frameRun();


//crashCheck 충돌확인

function crash(dino, cactus) {
    let checkX = cactus.x - (dino.x + dino.width);
    let cehckY = cactus.y - (dino.y + dino.height);

    if (checkX < 0 && cehckY < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}


document.addEventListener('keydown', function (e) {
    if (e.code === "Space") {
        jumping = true;
    }
})