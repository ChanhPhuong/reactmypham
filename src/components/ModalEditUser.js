import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { postCreateUser, putupdateUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModel } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");



    const handleEditUser = async () => {
        let res = await putupdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModel({
                first_name: name,
                id: dataUserEdit.id

            })
            handleClose();
            toast.success("Update user successd!")
        }
    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit User</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()} >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalEditUser;