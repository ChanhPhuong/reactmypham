import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalConfirm from './ModalConfirm';
import ModalEditUser from './ModalEditUser';
import { fetchAllUser } from '../service/UserService';
import _, { debounce, times } from "lodash";
import './TableUser.scss';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';



const TableUsers = (props) => {

    const [ListUsers, serListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSorBy] = useState("asc");
    const [sorField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (user) => {
        serListUsers([user, ...ListUsers]);
    }
    const handleEditUserFromModel = (user) => {
        let clonelistUsers = _.cloneDeep(ListUsers);
        let index = ListUsers.findIndex(item => item.id === user.id)
        clonelistUsers[index].first_name = user.first_name;
        serListUsers(clonelistUsers);
    }

    useEffect((props) => {
        getUser(1);
    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        console.log('check userr', res)
        if (res && res.data) {
            setTotalUsers(res.total);
            serListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    }
    console.log(ListUsers)
    const handlePageClick = (event) => {
        getUser(+event.selected + 1);

    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }
    const handelDeleteUserFromModal = (user) => {
        let clonelistUsers = _.cloneDeep(ListUsers);
        clonelistUsers = clonelistUsers.filter(item => item.id !== user.id);

        serListUsers(clonelistUsers);
    }
    const handelSor = (sortBy, sorField) => {
        setSorBy(sortBy);
        setSortField(sorField);

        let clonelistUsers = _.cloneDeep(ListUsers);
        clonelistUsers = _.orderBy(clonelistUsers, [sorField], [sortBy]);
        serListUsers(clonelistUsers);
    }
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log('>>>> check run search term.....', term)
        if (term) {

            let clonelistUsers = _.cloneDeep(ListUsers);
            clonelistUsers = clonelistUsers.filter(item => item.email.includes(term))
            serListUsers(clonelistUsers);
        } else {
            getUser(1);
        }
    }, 500)


    const getUserExport = (event, done) => {
        let result = [];
        if (ListUsers && ListUsers.length > 0) {
            result.push(["Id", "Email", "First Name", "Last Name"]);
            ListUsers.map((item, index) => {

                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }
    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept csv file....")
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function (result) {
                    let rawCSV = result.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email"
                                || rawCSV[0][1] !== "first_name"
                                || rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header on CSV file!")
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[0]
                                        obj.last_name = item[0]
                                        result.push(obj);

                                    }
                                })
                                serListUsers(result)

                            }
                        } else {
                            toast.error("Wrong format data on CSV file!")
                        }
                    } else {
                        toast.error("Not found data on CSV file!")
                        console.log("Finished:", result.data)
                    }

                }
            })
        }



    }
    return (
        <>
            <div className='my-3 add-new'>
                <span> <h3>List User:</h3></span>
                <div className='group-btns'>
                    <label htmlFor='text' className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i>
                        Import
                    </label>
                    <input id='text' type='file' hidden
                        onChange={(event) => handleImportCSV(event)}
                    />

                    <CSVLink
                        filename={"user.csv"}
                        className="btn btn-primary"
                        target="_blank"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        <i className="fa-solid fa-download"></i> Export
                    </CSVLink>

                    {/* <CSVDownload data={csvData} target="_blank" /> */}


                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa-solid fa-circle-plus"></i> Add new
                    </button>
                </div>

            </div>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Seach user by email....'
                    // value={keyword}
                    onChange={(event => handleSearch(event))}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th >
                            <div className='sort-header'>

                                <span>ID</span>
                                <span>

                                    <i
                                        class="fa-solid fa-arrow-down-long"
                                        onClick={() => handelSor("desc", "id")}
                                    >
                                    </i>
                                    <i
                                        class="fa-solid fa-arrow-up-long"
                                        onClick={() => handelSor("asc", "id")}
                                    >

                                    </i>
                                </span>
                            </div>
                        </th>
                        <th >Email</th>
                        <th >
                            <div className='sort-header'>
                                <span> First Name</span>
                                <span>

                                    <i
                                        class="fa-solid fa-arrow-down-long"
                                        onClick={() => handelSor("desc", "first_name")}
                                    >
                                    </i>
                                    <i
                                        class="fa-solid fa-arrow-up-long"
                                        onClick={() => handelSor("asc", "first_name")}
                                    >

                                    </i>
                                </span>
                            </div>

                        </th>
                        <th >Last Name</th>
                        <th >Action</th>

                    </tr>
                </thead>
                <tbody>
                    {ListUsers && ListUsers.length > 0 &&
                        ListUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>
                                            Edit
                                        </button>

                                        <button className='btn btn-danger ' onClick={() => handleDeleteUser(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable} />
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModel={handleEditUserFromModel} />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handelDeleteUserFromModal={handelDeleteUserFromModal}
            />
        </>)
}

export default TableUsers;