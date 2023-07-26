class StringCapitalizer {
    capitalizeFirstLetter(inputString) {
      return inputString.toLowerCase().replace(/(?:^|\s)\S/g, function(char) {
        return char.toUpperCase();
      });
    }
  }
  
  // Usage:
  const inputString = prompt("Enter a string:");
  const stringCapitalizer = new StringCapitalizer();
  const convertedString = stringCapitalizer.capitalizeFirstLetter(inputString);
  console.log(convertedString);
  