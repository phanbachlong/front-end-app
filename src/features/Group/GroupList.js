import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { delGroup, editGroup } from "../../redux/slices/groupSlice";
import { Button, Modal } from "react-bootstrap";

const GroupList = ({ group }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [groupId, setGroupID] = useState(0)
    const [groupName, setGroupName] = useState('')
    const [groupTotalMember, setGroupTotalMember] = useState(0);

    const handleDelGroup = useCallback((id) => {
        dispatch(delGroup([id]));
    }, [dispatch]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleNameChange = (e) => {
        setGroupName(e.target.value);
    }

    const handleEditGroup = (id, name, totalMembers) => {
        setGroupID(id);
        setGroupName(name);
        setGroupTotalMember(totalMembers)
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const rs = await dispatch(editGroup({ id: groupId, name: groupName, totalMember: groupTotalMember }));
            if (editGroup.fulfilled.match(rs)) {
                setShow(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (

        <tr key={group.id}>
            <td>{group.name}</td>
            <td>{group.totalMember === null ? 0 : group.totalMember}</td>
            <td className="table-icon">
                <Button onClick={() => {
                    handleShow();
                    handleEditGroup(group.id, group.name, group.totalMember)
                }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelGroup(group.id)} >Del</Button>
            </td>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitEdit}>
                        <div className="form-items">
                            <input type="text" className="form-control" style={{ display: "none" }} value={groupId}></input>
                            <input type="text" className="form-control" style={{ display: "none" }} value={groupTotalMember}></input>
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control" value={groupName} onChange={handleNameChange}></input>
                        </div>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="success" type="submit">Edit</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </tr>


    )
}

export default React.memo(GroupList, (prevProps, nextProps) => {
    return prevProps.group.id === nextProps.group.id &&
        prevProps.group.name === nextProps.group.name &&
        prevProps.group.totalMember === nextProps.group.totalMember;
});