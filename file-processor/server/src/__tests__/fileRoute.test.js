const request = require('supertest');
const express = require('express');

const router = require('../routes');
const FileService = require('../services');

jest.mock('../services');

const app = express();
app.use('/api/v1', router);

describe('Test for routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return file contents and info for multiple files', async () => {
        const fileContents = [
            'Error handling: If any AsyncHook callbacks throw, the application will print the stack trace and exit. The exit path does follow that of an uncaught exception, but all uncaughtException listeners are removed, thus forcing the process to exit. The exit callbacks will still be called unless the application is run with --abort-on-uncaught-exception, in which case a stack trace will be printed and the application exits, leaving a core file. The reason for this error handling behavior is that these callbacks are running at potentially volatile points in an objects lifetime, for example during class construction and destruction. Because of this, it is deemed necessary to bring down the process quickly in order to prevent an unintentional abort in the future. This is subject to change in the future if a comprehensive analysis is performed to ensure an exception can follow the normal control flow without unintentional side effects.',
            'Class: http.Agent: An Agent is responsible for managing connection persistence and reuse for HTTP clients. It maintains a queue of pending requests for a given host and port, reusing a single socket connection for each until the queue is empty, at which time the socket is either destroyed or put into a pool where it is kept to be used again for requests to the same host and port. Whether it is destroyed or pooled depends on the keepAlive option. Pooled connections have TCP Keep-Alive enabled for them, but servers may still close idle connections, in which case they will be removed from the pool and a new connection will be made when a new HTTP request is made for that host and port. Servers may also refuse to allow multiple requests over the same connection, in which case the connection will have to be remade for every request and cannot be pooled. The Agent will still make the requests to that server, but each one will occur over a new connection. When a connection is closed by the client or the server, it is removed from the pool. Any unused sockets in the pool will be unrefed so as not to keep the Node.js process running when there are no outstanding requests. (see socket.unref()). It is good practice, to destroy() an Agent instance when it is no longer in use, because unused sockets consume OS resources. Sockets are removed from an agent when the socket emits either a close event or an agentRemove event. When intending to keep one HTTP request open for a long time without keeping it in the agent, something like the following may be done',
        ];

        FileService.readFile.mockResolvedValueOnce(fileContents[0]);
        FileService.readFile.mockResolvedValueOnce(fileContents[1]);

        const response = await request(app)
            .get('/api/v1/read-multiple-files')
            .query({ filePaths: ['src/files/file1.txt', 'src/files/file2.txt'] });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: [
                {
                    filePath: 'src/files/file1.txt',
                    wordCount: 194,
                    mostRepeatedWord: 'to',
                    numRepetition: 7,
                },
                {
                    filePath: 'src/files/file2.txt',
                    wordCount: 313,
                    mostRepeatedWord: 'is',
                    numRepetition: 5,
                },
            ],
        });
    });

    it('should handle missing filePaths', async () => {
        const response = await request(app).get('/api/v1/read-multiple-files');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 'error',
            error: 'Please provide a file path',
        });
    });
});
