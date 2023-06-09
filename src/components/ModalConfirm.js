import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from '../service/UserService';
import { Toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handelDeleteUserFromModal } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user success ")
            handleClose();
            handelDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("error delete user")
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
                    <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        This action can't be undone!
                        Do want to delete this User
                        <br />
                        <b>email = {dataUserDelete.email} </b>?



                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalConfirm;