function createPerson(firstName, lastName) {
    return {
      firstName: firstName,
      lastName: lastName,
      getFullName() {
        return firstName + ' ' + lastName;
      },
    };
  }
  
  let person1 = createPerson('John', 'Doe');
  let person2 = createPerson('Jane', 'Doe');
  
  console.log(person1.getFullName());
  console.log(person2.getFullName());

      // Factory Function creating person 
      var Person = function (name, age) { 
  
        // creating person object 
        var person = {}; 
  
        // parameters as keys to this object   
        person.name = name; 
        person.age = age; 
  
        // function to greet 
        person.greeting = function () { 
            return ( 
                'Hello I am ' + person.name  
                    + '. I am ' + person.age  
                    + ' years old. '
            ); 
        }; 
        return person; 
    }; 
  
    var person3 = Person('Abhishek', 20); 
    console.log(person1.greeting()); 
  
    var person4 = Person('Raj', 25); 
    console.log(person2.greeting());

    class Person {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        getFullName() {
            return this.firstName + " " + this.lastName;
        }
    }
    
    let p1 = new Person('John', 'Doe');
    let p2 = new Person('Jane', 'Doe');
    
    console.log(p1.getFullName());
    console.log(p2.getFullName());