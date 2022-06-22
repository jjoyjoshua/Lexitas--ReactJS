import React, {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import Layout from "../Components/Layout";
import {Form} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { GiCancel } from "react-icons/gi";
function AddProject(){
    
    const options = [
        { value: 'Jacon Jones', label: 'Jacob Jones' },
        { value: 'Jenny Wilson', label: 'Jenny Wilson' },
        { value: 'Devon Lane', label: 'Devon Lane' },
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Jane Doe', label: 'Jane Doe' }
      ]

      const[p_name, setPName] = useState("");
      const[startdate, setStartDate] = useState("");
      const[enddate, setEndDate] = useState("");
      const[p_manager, setPManager] = useState("");
      const[status, setStatus] = useState("");
      const[p_members, setPMembers] = useState([]);
      const[division, setDivision] = useState("");
      const[description, setDescription] = useState("");

      // validation states
      const [error, setError] = useState("");
       
      //modal states
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = (data) => {
            setShow(true);
      }
    //   posting data to the API
      const postData = (e) =>
      {
          e.preventDefault();
                if(p_name.trim()==="" && startdate === ""  && enddate === "" && p_manager === "" && status === "" && p_members === "" && division === "" && description === ""){
                    setError("Please fill in all the required fields.")
                    return false;
                }
                if(p_name.trim()===""){
                    setError("Please fill in the Project Name field.");
                    return false;
                }
                if(startdate===""){
                    setError("Please fill in the Start Date field. ")
                    return false;
                }
                if(enddate===""){
                    setError("Please fill in the End Date field. ")
                    return false;
                }
                if(status===""){
                    setError("Please fill in the Status field. ")
                    return false;
                }

                if(division===""){
                    setError("Please fill in the Division field. ")
                    return false;
                }

                if(p_manager.length === 0){
                    setError("Please fill in the Project Manager field. ")
                    return false;
                }
               
                if(p_members===""){
                    setError("Please fill in the Project Members field. ")
                    return false;
                }
                
                if(description===""){
                    setError("Please fill in the Description field. ")
                    return false;
                }
                else{
                        axios.post(`https://62959f8e810c00c1cb644854.mockapi.io/projects`, {
                            p_name,
                            startdate,
                            enddate,
                            p_manager,
                            status,
                            p_members,
                            division,
                            description
                        }); 
                        handleShow();
                        return true;                  
                    }
        }         

    // handle onChange event of the dropdown
    const handleChange = (e) => {
        setPMembers(Array.isArray(e) ? e.map(x => x.value) : []);
    console.log(p_members)
  }

    // enable/disable the add task btn
    const [enable, setEnable] = useState(true);
    
    return( 
        <>
            <div className="row">
                <div className="col-xl-12"><Layout/></div>
                <div className="col-xl-12">
                <div className="content bg-white m-5 p-4">
                    <div className="header d-flex justify-content-between align-items-center mb-3">
                        <h5>Add Project</h5>
                       <NavLink to="/"><a className="btn btn-secondary rounded-0"><i className="fa-solid fa-arrow-left text-white me-2 "></i>Back</a></NavLink> 
                    </div>
                    <Form>
                    <div className="row">
                        <div className="row p-0 m-0">
                            <div className="col-xl-12">
                                <label for="taskname" className="form-label">Project Name</label>
                                <input autoComplete="off" type="text" className="form-control  rounded-0" id="taskname" aria-describedby="taskname" onChange={(e)=>{setPName(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row p-0 m-0 mt-3">
                             <div className="col-xl-2">
                                <label for="taskname" className="form-label">Start Date</label>
                                <div className="input-group" id="datepicker">
                                <input type="date" className="form-control form-control  rounded-0" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setStartDate(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <label for="taskname" className="form-label">End Date</label>
                                <div className="input-group">
                                    <input type="date" className="form-control form-control  rounded-0" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setEndDate(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="col-xl-2 d-flex flex-column">
                                <label for="taskname" className="form-label">Status</label>
                                <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option value="active">Active</option>
                                    <option value="delayed">Delayed</option>
                                    <option value="not started">Not started</option>
                                    <option value="completed">Completed</option>
                                  </select>
                            </div>
                            <div className="col-xl-3 d-flex flex-column">
                                <label for="" className="form-label">Division</label>                               
                                <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setDivision(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>HR</option>
                                    <option>IT</option>
                                    <option>Marketing</option>
                                    <option>Business Analyst</option>
                                  </select>                            
                            </div>
                            <div className="col-xl-3 d-flex flex-column" >
                                <label for="" className="form-label">Project Manager</label>    
                                <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setPManager(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>Jacob</option>
                                    <option>Wade Warren</option>
                                    <option>Guy Hawkins</option>
                                    <option>Jane Copper</option>
                                  </select>       
                            </div>
                        </div>  
                        <div className="row p-0 m-0 mt-3 ">          
                            <div className="col-xl-6 d-flex flex-column" >
                                <label for="" className="form-label">Project Members</label>    
                                  <Select options={options} isMulti={true} isClearable={true} onChange={handleChange} value={options.filter(obj => p_members.includes(obj.value))} />
                            </div>
                            <div className="col-xl-6">
                                <label for="" className="form-label">Description</label>
                                <textarea className="form-control  rounded-0" placeholder="" id="floatingTextarea" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </div>
                        </div>
                        <div className="row mt-4 p-0 m-0">
                            <div className="col-xl d-flex justify-content-between">
                            {<p className="text-danger fw-bold">{error}</p>} 
                               {/* <button className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0" disabled={enable}><NavLink to="/AddProject/AddTask" className="text-decoration-none text-white"><i className="fa-solid fa-plus fa-lg text-white me-2"></i>TASK</NavLink></button>  */}
                                <button className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0" onClick={postData}><i className="fa-solid fa-floppy-disk fa-lg text-white me-2"></i>SAVE</button>
                            </div>
                        </div>
                    </div> 
                    </Form>                              
                </div>
                </div>
            </div>
            {/* modal */}
            <Modal  backdrop="static" show={show} onHide={handleClose} className="rounded-0">
                    <Modal.Body className="d-flex flex-row justify-content-between modal-bdy rounded-0"><h5>Project Succesfully added</h5>
                    <NavLink to="/"><GiCancel size={20} color="green"/></NavLink></Modal.Body>
            </Modal>
        </>
    )
}

export default AddProject;