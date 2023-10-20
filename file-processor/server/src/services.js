const fs = require('fs');

class FileService {
    static async readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            });
        });
    };

    static countWords(fileContent) {
        const words = fileContent.split(/\s+/);
        return words.length;
    };

    static findMostRepeatedWord(fileContent) {
        const words = fileContent.split(/\s+/);
        const wordCount = {};
        let maxCount = 0;
        let mostRepeatedWord = null;

        for (const word of words) {
            const cleanWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

            if (cleanWord) {
                wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
                if (wordCount[cleanWord] > maxCount) {
                    maxCount = wordCount[cleanWord];
                    mostRepeatedWord = cleanWord;
                }
            }
        }

        return { mostRepeatedWord, numRepetition: maxCount };
    }
};

module.exports = FileService;