import React, {useState} from 'react';
import {Col, Container, Row, Button, Modal} from "react-bootstrap";
import {assignMove} from "../../lib/helpers";

function MoveList({
                      selectedPokemon,
                      party,
                      setParty
                  }) {
    const [show, setShow] = useState(false);
    const [moveIndex, setMoveIndex] = useState();

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = (i) => {
        setShow(true);
        setMoveIndex(i)
    }

    return (
        <Col md={3}
             className="d-inline-block pb-3"
             style={{
                 position: "relative",
                 borderBottomLeftRadius: "2%",
                 borderBottomRightRadius: "2%",
                 border: "5px solid #463d41",
                 borderTop: "none",
                 boxShadow: "inset -3px -3px 0px 3px rgba(0, 0, 0, 0.1)",
                 backgroundColor: "#f35f56",
                 height: "90%",
                 zIndex: 2,
             }}>
            <Container className="px-0"
                       style={{
                           position: "absolute",
                           top: "10%",
                           left: "5%",
                           height: "80%",
                           width: "90%",
                           border: "5px solid #463d41",
                           borderRadius: "10px",
                           backgroundColor: "#697478",
                           fontFamily: "Pokemon",
                       }}>
                {/* Move set*/}
                {(
                    party[selectedPokemon] &&
                    party[selectedPokemon].moveSet &&
                    party[selectedPokemon].moveSet.length
                    > 0) ? party[selectedPokemon].moveSet.map((move, i) => (
                    <Row className="mx-0"
                         key={"pokemon" + (selectedPokemon + 1) + "move" + (i + 1)}
                         style={{
                             height: "25%",
                             width: "100%",
                             borderRadius: "10px",
                             backgroundColor: "#e1e9e9",
                             border: "3px solid #697478",
                         }}>
                        <Col>
                            <Row className="align-items-end"
                                 style={{
                                     height: "50%",
                                     borderBottom: "2px solid #c9d1d2"
                                 }}>
                                {/* Type Logo*/}
                                <Col md={3}
                                     className="d-flex p-0 justify-content-center align-items-center"
                                     style={{height: "100%"}}>
                                    {Object.keys(move).length > 0 ?
                                        <img
                                            src={require(`../../assets/typeLogos/${move.type.name}.png`).default}
                                            style={{width: "90%"}}
                                            alt={move.type.name}
                                        /> : ""}
                                </Col>
                                {/* Move Name */}
                                <Col md={7} className="my-auto px-1" style={{fontSize: "2vh"}}>
                                    {Object.keys(move).length > 0 ? move.names.map(moveName => (
                                        (moveName.language.name === "en") ? moveName.name : null
                                    )) : ""}
                                </Col>
                                {/* Move Selector*/}
                                <Col md={2} style={{height: "100%"}}>

                                    <button
                                        className="mt-2"
                                        style={{
                                        backgroundColor: "lightgray",
                                        border: "3px solid gray",
                                        borderRadius: "5px",
                                    }}
                                            onClick={() => handleShow(i)}>
                                        ^
                                    </button>
                                </Col>
                            </Row>
                            <Row style={{
                                height: "100%",
                            }}>
                                {/* Move Position*/}
                                <Col md={3}>
                                    <Row className="mt-1 justify-content-around"
                                         style={{height: "50%"}}>
                                        {party[selectedPokemon].moveSet.map((move, pos) => (
                                            pos === i ?
                                                <Col md={5}
                                                     key={"pos" + pos}
                                                     className="px-0">
                                                    <Container style={{
                                                        height: "80%",
                                                        borderRadius: "5px",
                                                        border: "3px solid #3f403b",
                                                        backgroundColor: "#c7574d"
                                                    }}>
                                                    </Container>
                                                </Col>
                                                : <Col md={5}
                                                       key={"pos" + pos}
                                                       className="px-0">
                                                    <Container style={{
                                                        height: "80%",
                                                        borderRadius: "5px",
                                                        border: "3px solid #3f403b",
                                                        backgroundColor: "#c3d4de",
                                                    }}>
                                                    </Container>
                                                </Col>
                                        ))}
                                    </Row>
                                </Col>
                                {Object.keys(move).length > 0 ?
                                    <>
                                        {/* PP */}
                                        <Col md={4} className="text-center my-2" style={{fontSize: "3vh"}}>
                                            PP
                                        </Col>
                                        {/* PP Number */}
                                        <Col md={5} className="px-0 my-2" style={{fontSize: "3vh"}}>
                                            {move.pp}/{move.pp}
                                        </Col>
                                    </>
                                    : null}
                            </Row>
                        </Col>
                    </Row>
                )) : null}
            </Container>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Move List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {party[selectedPokemon] && party[selectedPokemon].moveList ? party[selectedPokemon].moveList.map((move, j) => (
                            <button className={`mx-1 my-1 ${move.type.name}1`}
                                    key={j + ":" + move.name}
                                    style={{
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                        borderRadius: "5px",
                                    }}
                                    onClick={(e) => {
                                        assignMove(move, moveIndex, party, setParty, selectedPokemon)
                                        handleClose()
                                    }}
                            >
                                {party[selectedPokemon].moveList ? move.names.map(moveName => (
                                    (moveName.language.name === "en") ? moveName.name : null
                                )) : null}
                            </button>
                        )) : null}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default MoveList;