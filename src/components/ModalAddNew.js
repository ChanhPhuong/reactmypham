import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSaveUser = async () => {

        let res = await postCreateUser(name, job)

        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success("A User is created succefirst_name: name, id: res.idss;d!")
            props.handleUpdateTable({ first_name: name, id: res.id });
        } else {
            toast.error("An Error...")

        }
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div class="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />

                        </div>
                        <div class="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text" className="form-control" value={job} onChange={(event) => setJob(event.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalAddNew;