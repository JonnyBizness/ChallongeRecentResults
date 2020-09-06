import { Eye } from "./objects/Eye.js"
import { randomBetween } from "./utility/gamemath.js";

export class Game {

    constructor(){
        let self = this;//needed to set event listners in constructor.
        this.mouseX = 0;
        this.mouseY = 0;        
       
        let lefteye = new Eye(this, (canvas.width * 0.5)-30, canvas.height * 0.5, randomBetween(10,20));
        let righteye = new Eye(this, (canvas.width * 0.5)+30, canvas.height * 0.5, randomBetween(10,20));
        this.eyes = [lefteye, righteye];

        canvas.addEventListener('mousemove', function(evt) {
            self.getMousePos(canvas.getBoundingClientRect(), evt);
        }, false);
    }

    getMousePos = (rect, evt) => {
        this.mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        this.mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    }

    update = (delta) => {
        this.eyes.forEach(eye => {
            eye.update(delta);
        });

    };

    draw = (interpolationPercentage) => {
        //clear all
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        //console.log(this);

        this.eyes.forEach(eye => {
            eye.draw(interpolationPercentage);
        });
    };
}