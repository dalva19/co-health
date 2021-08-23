import { useState } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const OffCanvasNav = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        className="icon fa-2x "
        onClick={toggleShow}
      />
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Co-Health</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>Requests</ListGroup.Item>
            <ListGroup.Item>Offers</ListGroup.Item>
            <ListGroup.Item>Settings</ListGroup.Item>
            <ListGroup.Item>LogOut</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasNav;
