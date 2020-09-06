export const rectanglesCollided = (rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}


export const rectanglesCollidedX = (rect1, rect2) => {
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x)
}

export const rectanglesCollidedY = (rect1, rect2) => {
    return (rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y)
}

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

export const variation = (x) => {
    return parseFloat((Math.random() * x).toFixed(1));
} 