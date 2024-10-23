const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  // Checks if input file exists #T05
  if (!fs.existsSync(indata)) {
    return -1;
  }

  const data = fs.readFileSync(indata, 'utf-8');
  const lines = data.split(/\n/);

  // avoid repeatdely appending by clearing output file first
  if (fs.existsSync(outdata)) {
    fs.unlinkSync(outdata);
  }

  let count = 0;

  const correctLines = lines.slice(1); // remove first line 'header' to correct count

  const reviewLines = correctLines.map(line => {
    const elements = line.split(delimiter); // split by delimiter
    if (elements.length < 2) return ''; // skipping invalid lines 

    const review = elements[0].trim().slice(0, 20); // trim to first 20 characters
    const sentiment = elements[1].trim()

    const newData = `${sentiment}${delimiter}${review}\n`

    fs.appendFileSync(outdata, newData) // writing to output file
    count++ // record count
  });
  return count; // no. records #T02
  }

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}

parseFile("./datafile.csv", "./outputfile.csv")

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