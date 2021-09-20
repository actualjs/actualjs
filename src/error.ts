import fs = require('fs');

export default (filename: string, details: string, line: number, startPos: number, endPos: number) => {
  let result = '';
  const data = fs.readFileSync(filename).toString().split('\n');
  let lineStr = '<No line>';
  let tempLine = line;
  let lineIdx = 0;

  while (tempLine--) {
    lineStr = data[lineIdx++];
  }

  lineIdx = 0;

  result += `error: ${details}\n -> file '${filename}', line ${line}\n\n${lineStr}\n`;

  while (startPos--) {
    result += ' ';
    lineIdx++;
  }

  while (endPos--) {
    result += '^';
    lineIdx++;
  }

  while (lineIdx === lineStr.length) {
    result += ' ';
    lineIdx++;
  }

  return result.replace(/\t/g, '');
};
