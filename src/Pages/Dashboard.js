import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Layout from "../Components/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
function Dashboard(){
    const [details,setDetails] = useState([]);
    useEffect(()=>{
        axios.get("https://62959f8e810c00c1cb644854.mockapi.io/projects").then(
        (response) =>{
                setDetails(response.data)
        });
    },[]);

    const [res, setRes] = useState("")
    const searchProject = (e) =>{
        setRes(e.target.value);
        axios.get(`https://62959f8e810c00c1cb644854.mockapi.io/projects?search=${res}`)
        .then((response)=>{
            setDetails(response.data)
        })
    }

    // update data

    const setData = (data) =>{
        console.log(data);
        let {p_id, p_name,startdate, enddate, p_manager, status, p_members, division, description} = data;
        localStorage.setItem('PID', p_id);
        localStorage.setItem('P_Name',p_name);
        localStorage.setItem('Start Date',startdate);
        localStorage.setItem('End Date',enddate);
        localStorage.setItem('Project Manager',p_manager);
        localStorage.setItem('Status',status);
        localStorage.setItem('Project Members',p_members);
        localStorage.setItem('Division',division);
        localStorage.setItem('Description',description);
    }

    const getData=()=>{
        axios.get("https://62959f8e810c00c1cb644854.mockapi.io/projects").then(
        (response) =>{
                setDetails(response.data)
        });
    }

    // delete data

    const onDelete = (id) =>{
        console.log(id);
        axios.delete(`https://62959f8e810c00c1cb644854.mockapi.io/projects/${id}`)
        .then((response)=>{
            getData();
            // deleteTask(id)
        })
    }

    //delete task 

//    const deleteTask = (id) => {
//         axios.delete(`https://62959f8e810c00c1cb644854.mockapi.io/tasks?p_id=${id}`)
//         .then((response)=>{
//             console.log(' task deletion successful');
//         })
//     }
    const [infoId,setInfoId] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        setInfoId(data);
      }
    return(
        <>
            <div className="row">
            <div className="col-xl-12"><Layout/></div>
            <div className="col-xl-12">
                <div class="content bg-white m-5 p-4">
                    <div className="col-xl d-flex justify-content-between py-3">
                        <h4>Projects</h4>
                        <div class="d-flex flex-row justify-content-between">
                            <div className="">
                                <input type="text" className="form-control rounded-0" placeholder="Search project" onChange={searchProject} />
                            </div>
                           <NavLink to="/AddProject"> <a className="ms-3 btn-color text-white btn btn-secondary activelink rounded-0 border-0"><i className="bi bi-plus fa-lg"></i>PROJECT</a></NavLink>
                        </div>
                    </div>
                    <div className="table-responsive">
                    <table className="table table-striped">
                       <thead className="text-dark opacity-75">
                           <tr>
                               <th>PROJECT NAME</th>
                               <th>START DATE</th>
                               <th>END DATE</th>
                               <th>PROJECT MANAGER</th>
                               <th>STATUS</th>
                               <th></th>
                           </tr>
                       </thead>
                       <tbody>
                            {details.map(info=>{
                                const now = new Date(info.startdate);
                                const dateString = now.toLocaleDateString({
                                weekday: "short",
                                year: "numeric",
                                month: "2-digit",
                                day: "numeric"
                                    })
                                    const now1 = new Date(info.enddate);
                                    const dateString1 = now1.toLocaleDateString({
                                    weekday: "short",
                                    year: "numeric",
                                    month: "2-digit",
                                day: "numeric"
                                    })
                               return(
                                   <tr>
                               <td>{info.p_name}</td>
                               <td>{dateString}</td>
                               <td>{dateString1}</td>
                               <td>{info.p_manager}</td>
                               <td><div className={`rounded-pill text-white ${info.status}`}><p className="pt-2 ps-0 text-capitalize d-flex justify-content-center">{info.status}</p></div></td>
                               <td><div className="d-flex justify-content-evenly mt-2"><NavLink to={`/GanttView/${info.p_id}`}><i className="fa-solid fa-chart-bar fa-lg me-1"></i></NavLink><NavLink to="/Update"><i className="fa-solid fa-pen me-2 mt-2 fa-lg"  onClick={() => setData(info)}></i></NavLink><i className="fa-solid fa-trash-can mt-2 fa-lg" onClick={()=>{handleShow(info.p_id)}}></i></div></td>
                           </tr>
                           )  
                            })}
                       </tbody>
                      </table>
                    </div>
                </div>
        </div>
            </div>        
            {/* modal */}
            <Modal  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sure to delete?</Modal.Body>
                        <Modal.Footer>
                        <span onClick={handleClose} >
                            <Button variant="danger" onClick={()=>{onDelete(infoId)}}>
                                Delete
                            </Button>
                        </span>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        </Modal.Footer>
                 </Modal>    
        </>
    )
}

export default Dashboard;

