function Circle(radius){
    this.radius = radius;
    this.defaultLocation = {x: 0, y:0};
}

this.draw = function(){
    this.computeOptimumLocation(0.1);

    console.log('draw');
};