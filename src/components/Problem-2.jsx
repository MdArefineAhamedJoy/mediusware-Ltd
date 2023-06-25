import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";


const Problem2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showOnlyEven, setShowOnlyEven] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts(showOnlyEven);
  }, [showOnlyEven, contacts]);

  const fetchContacts = () => {
    fetch("https://contact.mediusware.com/api/contacts/")
      .then(response => response.json())
      .then(data => setContacts(data.results))
      .catch(error => console.log(error));
  };

  const openModal = (modal) => {
    setModalType(modal);
    setModalOpen(true);
    window.history.pushState(null, "", `/${modal.replace(" ", "-").toLowerCase()}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    window.history.pushState(null, "", "/");
  };

  const handleCheckboxChange = () => {
    setShowOnlyEven(!showOnlyEven);
  };

  const filterContacts = (onlyEven) => {
    if (!Array.isArray(contacts)) {
      setFilteredContacts([]);
      return;
    }

    if (onlyEven) {
      const filtered = contacts.filter((contact) => contact.id % 2 === 0);
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const openDetailsModal = (contact) => {
    setModalType("Contact Details");
    setContacts([contact]);
    setModalOpen(true);
  };

  console.log()
//   const x = filteredContacts.map(d => console.log())

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="outline-primary" size="lg" onClick={() => openModal("All Contact")}>
            All Contacts
          </Button>
          <Button variant="outline-warning" size="lg" onClick={() => openModal("US Contact")}>
            US Contacts
          </Button>
        </div>

        <Modal show={modalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {filteredContacts.map((contact) => (
                <li className="d-flex justify-content-between" key={contact.id} onClick={() => openDetailsModal(contact)}>
                  <span className="">Phone : {contact.phone} </span> <span >Country :{contact?.country?.name? contact?.country?.name: " Country Not Show"} </span>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={() => openModal("All Contact")}>
              Modal Button A
            </Button>
            <Button variant="outline-warning" onClick={() => openModal("US Contact")}>
              Modal Button B
            </Button>
            <Button variant="outline-secondary" onClick={closeModal}>
              Modal Button C
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="footer">
          <label>
            <input type="checkbox" checked={showOnlyEven} onChange={handleCheckboxChange} />
            Show Only Even Contacts
          </label>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
