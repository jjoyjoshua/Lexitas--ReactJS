import React, {useEffect, useState} from "react";
import Layout from "../Components/Layout";
import {Form} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function EditTask(){
    const[id,setID] = useState("");
    const[task_name, setTaskName] = useState("");
    const[startdate, setStartDate] = useState("");
    const[enddate, setEndDate] = useState("");
    const[status, setStatus] = useState("");
    const[task_owner, setTaskOwner] = useState("");
    const[priority, setPriority] = useState("");
    const[description, setDescription] = useState("");

    useEffect(()=>{
        setID(localStorage.getItem('ID'));
        setTaskName(localStorage.getItem('Task Name'));
        setStartDate(localStorage.getItem('Start Date'));
        setEndDate(localStorage.getItem('End Date'));
        setStatus(localStorage.getItem('Status'));
        setTaskOwner(localStorage.getItem('Task Owner'));
        setPriority(localStorage.getItem('Priority'));
        setDescription(localStorage.getItem('Description'));
    },[])

    // validation states
    const [error, setError] = useState("");

    const updateData = (e) =>{
        e.preventDefault();
        if(task_name.trim()==="" && startdate === ""  && enddate === "" && status === "" && task_owner === "" && priority === "" && description === ""){
            setError("Please fill in all the required fields.")
            return false;
        }
        if(task_name.trim()===""){
            setError("Please fill in the Task Name field.");
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

        if(task_owner===""){
            setError("Please fill in the Task Owner field. ")
            return false;
        }

        if(priority===""){
            setError("Please fill in the Priority field. ")
            return false;
        }
        
        if(description===""){
            setError("Please fill in the Description field. ")
            return false;
        }
        else{
            axios.put(`https://62959f8e810c00c1cb644854.mockapi.io/tasks/${id}`,{
                task_name,
                startdate,
                enddate,
                status,
                task_owner,
                priority,
                description
            },navigate(-1));
            return true;                
            }
    }

    const navigate = useNavigate();
    return(
        <>
            <div className="row">
            <div className="col-xl-12"><Layout/></div>
            <div className="col-xl-12">
            <div className="content bg-white m-5 p-4">
                <div className="header d-flex justify-content-between align-items-center mb-3">
               <h5>Edit Task</h5>
                   <NavLink to="/"> <a className="btn btn-secondary rounded-0"><i className="fa-solid fa-arrow-left text-white me-2"></i>Back</a></NavLink>
                </div>
                <Form>
                    <div className="row p-0">
                        <div className="row p-0 m-0">
                            <div className="col-xl-6">
                                <label for="taskname" className="form-label">Task Name</label>
                                <input type="text" value={task_name} className="form-control rounded-0" id="taskname" aria-describedby="taskname" onChange={(e)=>{setTaskName(e.target.value); console.log(task_name)}}/>
                            </div>
                            <div className="col-xl-2">
                                <label for="taskname" className="form-label">Start Date</label>
                                <div className="input-group date">
                                    <input type="date" value={startdate} className="form-control rounded-0 form-control" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setStartDate(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <label for="taskname" className="form-label">End Date</label>
                                <div className="input-group">
                                    <input type="date" value={enddate} className="form-control rounded-0 form-control" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setEndDate(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="col-xl-2 d-flex flex-column">
                                <label for="taskname" className="form-label">Status</label>
                                <select value={status} className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option value="active">Active</option>
                                    <option value="delayed">Delayed</option>
                                    <option value="not started">Not started</option>
                                    <option value="completed">Completed</option>
                                  </select>
                            </div>
                        </div>
                        <div className="row mt-4 p-0 m-0">
                            <div className="col-xl-3 d-flex flex-column">
                                <label for="" className="form-label">Task Owner</label>                               
                                <select value={task_owner} className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setTaskOwner(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>Jacob</option>
                                    <option>Wade Warren</option>
                                    <option>Guy Hawkins</option>
                                    <option>Jane Copper</option>
                                  </select>                           
                            </div>
                            <div className="col-xl-3 d-flex flex-column" >
                                <label for="" className="form-label">Priority</label>    
                                <select value={priority} className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setPriority(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                  </select>          
                            </div>
                            <div className="col-xl-6">
                                <label for="" className="form-label">Description</label>
                                <textarea value={description} className="form-control rounded-0" placeholder="" id="floatingTextarea" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </div>
                        </div>
                        <div className="row mt-4 p-0 m-0">
                            <div className="col-xl d-flex justify-content-between">
                            {<p className="text-danger fw-bold">{error}</p>} 
                                <button className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0" onClick={updateData}><i className="fa-solid fa-floppy-disk fa-lg text-white me-2"></i>SAVE</button>
                            </div>
                        </div>
                    </div>   
                    </Form>            
                </div>      
        </div> 
        </div>
        </>
    )
}

export default EditTask;