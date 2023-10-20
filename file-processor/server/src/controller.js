const FileService = require('./services');

class FileController {
    static async readFileContent(req, res) {
        try {
            const { filePaths } = req.query;
            if (!filePaths || !Array.isArray(filePaths)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'Please provide a file path'
                });
            }

            const filePromises = filePaths.map(filePath => FileService.readFile(filePath));
            const fileContents = await Promise.all(filePromises);
            
            const results = fileContents.map((fileContent, index) => {
                const wordCount = FileService.countWords(fileContent);
                const { mostRepeatedWord, numRepetition } = FileService.findMostRepeatedWord(fileContent);

                return {
                    filePath: filePaths[index],
                    wordCount,
                    mostRepeatedWord,
                    numRepetition,
                }
            });

            return res.status(200).json({
                status: 'success',
                data: results
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.message
            });
        } 
    }
}

module.exports = FileController;