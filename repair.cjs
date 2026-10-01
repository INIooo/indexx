const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

// 0 to 199 (inclusive, so slice(0, 200)) contains the start up to the first misplaced </style>
const part1 = lines.slice(0, 200);
// 203 to 303 (inclusive, so slice(203, 303)) contains the CSS that was injected into the body
const part2 = lines.slice(203, 303);
// 303 to end contains </style>, </head>, <body>, and the rest of the HTML
const part3 = lines.slice(303);

const fixedLines = [...part1, ...part2, ...part3];
fs.writeFileSync('index.html', fixedLines.join('\n'));
console.log('Repaired index.html');
