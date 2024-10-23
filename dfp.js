const fs = require('fs');

// function deleteExistingOutputFile() {
//   if (fs.existsSync(outputFile)) {
//     fs.unlinkSync(outputFile);
//   }
// }

function parseFile (indata, outdata, delimiter = ';') {
  // Checks if input file exists #T05
  if (!fs.existsSync(indata)) {
    return -1;
  }
  let count = 0;
  const data = fs.readFileSync(indata, 'utf-8');
  const lines = data.split(/\n/);

  const review = [];
  const sentiment = [];

  const reviewLines = lines.map(line => {
    const elements = line.split(delimiter);
    if (elements.length < 2) return '';

    const review = elements[0].trim().slice(0, 20); // Trim review to 20 characters
    const sentiment = elements[1].trim()

    let newData = `${sentiment};${review}\n`

    fs.appendFileSync(outdata, newData)
    //return `${sentiment}${delimiter}${review}`;
  }).filter(line => line !== ''); // filtering white space

  

   /* if (sentiment === 'positive') {
      positiveElements.push(review);
    } else {
      negativeElements.push(review);
    }
      */
  };


  // Original code
  /*
  for (let i = 0; i < lines.length; i++) {
    const elements = lines[i].split(delimiter);
    const review = elements[0].slice(0,20);
    const sentiment = elements.trim();

    if (sentiment === 'positive') {
      positiveElements.push(review);
    } else {
      negativeElements.push(review);
    }
  }
*/

  



  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}

parseFile("./datafile.csv", "./outputfile.csv")