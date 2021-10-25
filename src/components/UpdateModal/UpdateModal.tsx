import { BorderedButton, FilledButton } from 'elements/Button'
import React, { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'

const UpdateModal:FC = (props:any) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>{`Woohoo, you're reading this text in a modal!`}</Modal.Body>
            <Modal.Footer>
                <BorderedButton onClick={handleClose}>
                    Close
                </BorderedButton>
                <FilledButton onClick={handleClose}>
                    Save Changes
                </FilledButton>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateModal
