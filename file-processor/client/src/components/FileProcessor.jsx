import React from "react";
import Container from 'react-bootstrap/Container'
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "../hooks/useFetch";

const apiUrl =
		"http://localhost:8080/api/v1/read-multiple-files?filePaths[]=src/files/file1.txt&filePaths[]=src/files/file2.txt&filePaths[]=src/files/file3.txt";
        
const FileProcessor = () => {
	const { data, loading, error } = useFetch(apiUrl);
	console.log("DATA", data);

	return (
		<div>
			<Container>
				<br />
				<br />
				<h1>File Processor</h1>
				<br />
				<h2>
					Process your files and get incredibly fast results. We
					guarantee speed to process your files, thanks to our
					optimized processes to give you an excellent service
				</h2>
				<br />
				{loading && (
					<Spinner
						animation="grow"
						className="text-center"
					/>
				)}
				{error && <p>Error: {error.message}</p>}
				{data && (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>File</th>
								<th>Word Count</th>
								<th>Most Repeated Word</th>
								<th>Repetition Count</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(data) ? (
								data.map((item) => (
									<tr key={item.filePath}>
										<td>{item.filePath}</td>
										<td>{item.wordCount}</td>
										<td>{item.mostRepeatedWord}</td>
										<td>{item.numRepetition}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="4" className="text-center">
										No data available
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				)}
			</Container>
		</div>
	);
};

export default FileProcessor;
