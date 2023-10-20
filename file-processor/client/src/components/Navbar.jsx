import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function ContainerInsideExample() {
	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="#home">Your-FileProcessor.com</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default ContainerInsideExample;
