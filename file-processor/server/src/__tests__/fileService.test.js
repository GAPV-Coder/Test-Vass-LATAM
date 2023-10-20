const FileService = require('../services');

describe('Tests for FileService class', () => {
    describe('readFile', () => {
        it('should read the content of a file', async () => {
            const filePath = './src/files/file1.txt';
            const fileContent = await FileService.readFile(filePath);
            expect(fileContent).toBeDefined();
            expect(typeof fileContent).toBe('string');
        });

        it('should reject with an error if the file does not exist', async () => {
            const filePath = './src/files/file4.txt';
            await expect(FileService.readFile(filePath)).rejects.toThrow();
        });
    });

    describe('countWords', () => {
        it('should count the number of words in a string', () => {
            const text = 'This is a test.';
            const wordCount = FileService.countWords(text);
            expect(wordCount).toBe(4);
        });
    });

    describe('findMostRepeatedWord', () => {
        it('should find the most repeated word in a string', () => {
            const text = 'apple banana apple cherry banana cherry banana';
            const { mostRepeatedWord, numRepetition } = FileService.findMostRepeatedWord(text);
            expect(mostRepeatedWord).toBe('banana');
            expect(numRepetition).toBe(3);
        });
    });
});