import { circle } from "../utility/shapes.js";
import { randomBetween, randomProperty } from "../utility/gamemath.js";
import { tasman } from "../utility/colors.js";


export class Eye {

    constructor(game, x ,y , radius){
        this.parent = game;

        this.x = x;
        this.y = y;
        this.size = radius;

        //random between one property and a random property.
        this.color = 'white';

        this.existance = 0;
        
        this.lastX = this.x;
        this.lastY = this.y;

        this.irisMaxDistance = 15;
        this.irisX = 0;
        this.irisY = 0;

    }


    update = (delta) => {
        this.lastX = this.x;
        this.lastY = this.y;
        
        //distances that make up the opposite and adjacent edged.
        let distanceX = this.x - this.parent.mouseX;
        let distanceY = this.y - this.parent.mouseY;

        //get hypotonues of angle from center of eye to mouse.
        let hyp = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        //console.log('hyp', hyp);

        //theta is the angle between my center point and the mouse position
        //(theta is in radians) //to get degrees, * 180 / Math.PI
        let theta = Math.atan2(distanceY, distanceX);// * 180 / Math.PI;
        //console.log('theta?', theta);

        //to get the new position relative to the center
        let oppostite = this.irisMaxDistance * Math.sin(theta);
        let adjacent = this.irisMaxDistance * Math.cos(theta);
        //console.log('oppostite:', oppostite);
        //console.log('adjacent:', adjacent);

        //new position exact coords rather than relative.
        this.irisX = this.x + -adjacent;
        this.irisY = this.y + -oppostite;

        //if mouseis within my eye just set iris position to that.
        if(distanceX < this.irisMaxDistance && distanceX > -this.irisMaxDistance){
            this.irisX = this.parent.mouseX;
        }
        if(distanceY < this.irisMaxDistance && distanceY > -this.irisMaxDistance){
            this.irisY = this.parent.mouseY;
        }
    };

    draw = (interpolationPercentage) => {
        // Interpolate with the last position to reduce stuttering.
        let x = this.lastX + (this.x - this.lastX) * interpolationPercentage;
        let y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
              
        
        circle(x, y, this.size, this.color);
        circle(this.irisX, this.irisY, 3, 'black');
        
        canvas.getContext('2d').globalAlpha = 1;
    };

    destory = () => {
        this.parent.eyes = this.parent.eyes.filter(item => item !== this)
    }
}