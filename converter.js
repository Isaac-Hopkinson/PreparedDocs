const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define the directory containing the Markdown files
const markdownDirectory = '../retool-docs/docs';

// Read all the Markdown files in the directory
const markdownFiles = fs.readdirSync(markdownDirectory).filter(filename => path.extname(filename) === '.md');
console.log(markdownFiles)
// Define an array to hold the training data
let trainingData = [];

// Loop through each Markdown file and convert it to training data
markdownFiles.forEach(filename => {
  // Read the Markdown file
  const fileContents = fs.readFileSync(path.join(markdownDirectory, filename), 'utf-8');

  // Parse the Markdown file into an array of tokens
  const tokens = marked.lexer(fileContents);

  // Filter the tokens to include only headings and paragraphs
  const headingsAndParagraphs = tokens.filter(token => ['heading', 'paragraph'].includes(token.type));

  // Map the headings and paragraphs to JSON objects with prompt and completion fields
  const fileTrainingData = headingsAndParagraphs.map((token, index) => {
    const isHeading = token.type === 'heading';
    const prompt = isHeading ? token.text : headingsAndParagraphs[index - 1].text;
    const completion = isHeading ? '' : token.text;
    return { prompt, completion };
  });

  // Add the file's training data to the overall training data array
  trainingData = [...trainingData, ...fileTrainingData];
});

// Write the training data to a JSONL file
fs.writeFileSync('trainingData.jsonl', trainingData.map(JSON.stringify).join('\n'));

//after generating the trainingData we need to prepare the data with:
// openai tools fine_tunes.prepare_data -f trainingData.jsonl