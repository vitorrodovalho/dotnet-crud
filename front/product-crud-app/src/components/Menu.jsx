import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import KJUR from 'jsrsasign';

export default function Menu() {
    const token = localStorage.getItem('token');
    let isValid = false;
    if (token) {
        isValid = KJUR.jws.JWS.verifyJWT(
            token,
            'asdv234234^&%&^%&^hjsdfb2%%%',
            {
                alg: ['HS256'],
            }
        );
    }

    if (isValid) {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        ProductCrud
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                activeClassName="active"
                                as={NavLink}
                                to="/products"
                            >
                                Produtos
                            </Nav.Link>
                            <Nav.Link
                                activeClassName="active"
                                as={NavLink}
                                to="/categories"
                            >
                                Categorias
                            </Nav.Link>
                            <Nav.Link
                                activeClassName="active"
                                as={NavLink}
                                to="/suppliers"
                            >
                                Fornecedores
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown
                                align="end"
                                title="Vitor"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="/logout">
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return <></>;
    }
}
