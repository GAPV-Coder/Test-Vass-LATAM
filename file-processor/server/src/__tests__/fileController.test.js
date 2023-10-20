const FileService = require('../services');
const FileController = require('../controller');

jest.mock('../services');

describe('Tests for FileController class', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return file contents and info for multiple files', async () => {
        const req = {
            query: {
                filePaths: ['file1.txt', 'file2.txt'],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        FileService.readFile.mockResolvedValue('File content');

        await FileController.readFileContent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: [
                {
                    filePath: 'file1.txt',
                    wordCount: 2,
                    mostRepeatedWord: 'word',
                    numRepetition: 3,
                },
                {
                    filePath: 'file2.txt',
                    wordCount: 3,
                    mostRepeatedWord: 'test',
                    numRepetition: 2,
                },
            ],
        });
    });

    it('should handle missing filePaths', async () => {
        const req = {
            query: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await FileController.readFileContent(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            error: 'Please provide a file path',
        });
    });
});
