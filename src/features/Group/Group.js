import React, { useEffect, useState } from "react";
import '../../css/Group.css'
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, createGroup } from "../../redux/slices/groupSlice";
import GroupList from "./GroupList";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormUtil from "../../utils/FormUtil";
import Validation from "./ValidationCreateGroup";
import Message from "../../utils/MessageUtil";


const Group = () => {
    const dispatch = useDispatch();
    const { groups, loading, error, totalPages, maxTotalMemberFromGroup } = useSelector((state) => state.group);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [minTotalMember, setMinTotalMember] = useState(0);
    const [maxTotalMember, setMaxTotalMember] = useState(maxTotalMemberFromGroup);
    const [search, setSearch] = useState('');
    const [mess, setMess] = useState('');

    //modal
    const [show, setShow] = useState(false)

    const handleModalShow = () => {
        setShow(true);
    }

    const handleModalClose = () => {
        setShow(false);
    }

    useEffect(() => {
        dispatch(getAllGroups({ page, size, minTotalMember, maxTotalMember, search }));
    }, [page, size, minTotalMember, maxTotalMember, search, dispatch])

    if (error) return <div>Error: {error}</div>

    const handlePagingBtn = (e) => {
        setPage(Number(e.target.value));
    }

    const handleSizeTbl = (e) => {
        setSize(Number(e.target.value));
    }

    const handleSortMinTbl = (e) => {
        setMinTotalMember(Number(e.target.value));
    }

    const handleSortMaxTbl = (e) => {
        setMaxTotalMember(Number(e.target.value));
    }

    const handelSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleResetTable = () => {
        setPage(1);
        setSize(10); // hoặc giá trị mặc định bạn muốn
        setMinTotalMember(0);
        setMaxTotalMember(0);
        setSearch('');
    };

    const handleCreateGroupSubmit = async (value, { setSubmitting, resetForm }) => {
        try {
            const rs = await dispatch(createGroup(value));
            if (createGroup.fulfilled.match(rs)) {
                dispatch(getAllGroups({ page, size, minTotalMember, maxTotalMember, search }))
                setMess("Create group successfully");
                resetForm();
            }
            setSubmitting(false);
        } catch (error) {
            setMess("Failed!!!")
        }
    }


    return (
        <div className="group-container">
            <div className="group-title">Group Management</div>
            <div className="group-table">
                <div className="form-items">
                    <label className="size-option-label">Size: </label>
                    <select className="size-option-select" value={size} onChange={handleSizeTbl}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                    </select>
                </div>

                <div className="form-items sort-items">
                    <label className="sort-option-label">Min: </label>
                    <select className="sort-option-select" onChange={handleSortMinTbl}>
                        <option value='0'>All</option>
                        {Array.from({ length: maxTotalMemberFromGroup }).map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="form-items sort-items">
                    <label className="sort-option-label">Max: </label>
                    <select className="sort-option-select" onChange={handleSortMaxTbl}>
                        <option value='0'>All</option>
                        {Array.from({ length: maxTotalMemberFromGroup }).map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="search-and-new-items-bar">
                    <div className="form-items search-item">
                        <label className="search-label">Search: </label>
                        <input className="search-input" type="text" value={search} onChange={handelSearchChange} placeholder="Enter name to search" />
                    </div>

                    <div className="new-group">
                        <Button className="create-group-btn" onClick={handleModalShow}>+ New</Button>
                    </div>
                </div>
                <Table className="group-table-detail" striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th colSpan='2'>Total Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan='2' className="">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            groups.map((group) => (
                                <GroupList key={group.id} group={group} />
                            ))
                        )}
                    </tbody>
                </Table>
                <div className="table-footer">
                    <div className="reset-tbl">
                        <button className="reset-tbl-btn" onClick={handleResetTable}>Reset Table</button>
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li className="page-items" key={index}>
                                <button
                                    type="button"
                                    disabled={loading}
                                    key={index}
                                    className={`page-btn ${page === index + 1 ? 'active' : ''}`}
                                    value={index + 1}
                                    onClick={handlePagingBtn}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
                className="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormUtil initialValues={{ name: '' }} onSubmit={handleCreateGroupSubmit} validation={Validation} serverError={error} showServerError={!!error} btnName={loading ? "Confirm..." : "Confirm"}></FormUtil>
                </Modal.Body>
                <Message mess={mess}></Message>
            </Modal>
        </div>


    )

}

export default Group;
