// define const
/**
 * @link ref: https://playcode.io/javascript/object-literal
 * */ 
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw:  function(){
        console.log('draw');
    }
};
circle.draw();

// Example 2
const person = {
    name: 'John Doe',
    age: 30,
    address: '123 Main Street',
    greet: function() {
      console.log('Hello, my name is ' + this.name);
    }
  };