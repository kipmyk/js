const fs = require('fs');
const readline = require('readline');

// Define a Book class
class Book {
    constructor(title, chapters) {
        this.title = title;
        this.chapters = chapters;
    }
}

// Define a Chapter class
class Chapter {
    constructor(number, verses) {
        this.number = number;
        this.verses = verses;
    }
}

// Define a Verse class
class Verse {
    constructor(number, text) {
        this.number = number;
        this.text = text;
    }
}

// Function to read and parse the Bible data from the KJV file
function readBibleFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');

    let currentBook;
    let currentChapter;
    const bible = [];

    lines.forEach(line => {
        const parts = line.split('|');

        if (parts.length >= 4) {
            const book = parts[0].trim();
            const chapter = parseInt(parts[1]);
            const verse = parseInt(parts[2]);
            const text = parts.slice(3).join('|').trim();

            if (!currentBook || currentBook.title.toLowerCase() !== book.toLowerCase()) {
                currentBook = new Book(book, []);
                bible.push(currentBook);
            }

            currentChapter = currentBook.chapters.find(c => c.number === chapter);

            if (!currentChapter) {
                currentBook.chapters.push(new Chapter(chapter, [new Verse(verse, text)]));
            } else {
                currentChapter.verses.push(new Verse(verse, text));
            }
        }
    });

    return bible;
}

// Function to display a specific verse or range of verses
function displayVerseRange(bible, bookTitle, chapterNumber, startVerse, endVerse) {
    const book = bible.find(b => b.title.toLowerCase() === bookTitle.toLowerCase());

    if (book) {
        const chapter = book.chapters.find(c => c.number === chapterNumber);

        if (chapter) {
            // Display the specified range of verses or the entire chapter if no range is specified
            const start = startVerse || 1;
            const end = endVerse || chapter.verses.length;

            // Display the verse range
            console.log(`${book.title} ${chapter.number}:${start}${end === start ? '' : `-${end}`}`);

            // Display each verse beneath the range without redundant information
            for (let i = start; i <= end; i++) {
                const verse = chapter.verses.find(v => v.number === i);

                if (verse) {
                    // Remove tilde (~) from the end of the verse text
                    const cleanedText = verse.text.replace(/~$/, '');
                    console.log(cleanedText);
                } else {
                    console.log(`Verse ${i} not found.`);
                }
            }
        } else {
            console.log('Chapter not found.');
        }
    } else {
        console.log('Book not found.');
    }
}

// Read the Bible data from the KJV file
const filePath = 'kjvdat.txt';
const bibleData = readBibleFromFile(filePath);

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user for input
rl.question('Enter the book, chapter, and verse range (e.g., Gen 1:1-3 for range or Gen 1:1 for single verse): ', (input) => {
    const inputParts = input.split(' ');

    // Check if the input has the correct format
    if (inputParts.length >= 2) {
        const bookTitle = inputParts[0];
        const chapterVerse = inputParts[1];

        // Check if a verse range is specified
        if (chapterVerse.includes(':') && chapterVerse.includes('-')) {
            const [chapter, verseRange] = chapterVerse.split(':').map(part => part.trim());
            const [startVerse, endVerse] = verseRange.split('-').map(num => parseInt(num));

            // Display the specified range of verses
            displayVerseRange(bibleData, bookTitle, parseInt(chapter), startVerse, endVerse);
        } else {
            // Display the single specified verse
            const [chapter, verse] = chapterVerse.split(':').map(part => part.trim());
            displayVerseRange(bibleData, bookTitle, parseInt(chapter), parseInt(verse), parseInt(verse));
        }
    } else {
        console.log('Invalid input format. Please enter in the format "Book Chapter:Verse" or "Book Chapter:StartVerse-EndVerse".');
    }

    // Close the readline interface
    rl.close();
});