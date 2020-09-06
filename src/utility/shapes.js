export function triangle(start, first, second, fillStyle) {
    let context = canvas.getContext('2d');

    // the triangle
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(first.x, first.y);
    context.lineTo(second.x, second.y);
    context.closePath();

    context.fillStyle = fillStyle;
    context.fill();
};


export function rectangle(x, y, w, h, fillStyle) {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.rect(x, y, w, h);

    context.fillStyle = fillStyle;
    context.fill();
};

export function quad(start, second, third, last, fillStyle) {
    let context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(second.x, second.y);
    context.lineTo(third.x, third.y);
    context.lineTo(last.x, last.y);
    context.closePath();

    context.fillStyle = fillStyle;
    context.fill();
};


export function circle(x, y, r, fillStyle) {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    
    context.fillStyle = fillStyle;
    context.fill();
};


export function oval(x, y, width, height, fillStyle){
    let context = canvas.getContext('2d');
    context.save(); // save state
    context.beginPath();

    context.translate(x-width, y-height);
    context.scale(width, height);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore(); // restore to original state
    
    context.fillStyle = fillStyle;
    context.fill();
}