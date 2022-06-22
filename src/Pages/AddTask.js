import React, { useEffect, useState, useRef } from "react";
import Layout from "../Components/Layout";
import {Form} from "react-bootstrap";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function AddTask(){

    const {pro} = useParams();
    const [fetchProject, setFetchProject] = useState([])
    const navigate = useNavigate();
    const clear = useRef();
    useEffect(()=>{
        axios.get(`https://62959f8e810c00c1cb644854.mockapi.io/projects?p_id=${pro}`)
          .then((response)=>{
              setFetchProject(response.data);
          },fetchPID());
    },[])
    
    const fetchPID = () =>{
        setP_ID(pro)
    }
    
    const[p_id, setP_ID] = useState("");
    const[task_name, setTaskName] = useState("");
    const[startdate, setStartDate] = useState("");
    const[enddate, setEndDate] = useState("");
    const[status, setStatus] = useState("");
    const[task_owner, setTaskOwner] = useState("");
    const[priority, setPriority] = useState("");
    const[description, setDescription] = useState("");

     // validation states
     const [error, setError] = useState("");

    const addTask = (e) =>{
        
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
            axios.post(`https://62959f8e810c00c1cb644854.mockapi.io/tasks`, {
                p_id,
                task_name,
                startdate,
                enddate,
                status,
                task_owner,
                priority,
                description
            }); 
            navigate("/");     
            return true;         
            }
    }

    const addTasknSave = (e) =>{
        
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
            axios.post(`https://62959f8e810c00c1cb644854.mockapi.io/tasks`, {
                p_id,
                task_name,
                startdate,
                enddate,
                status,
                task_owner,
                priority,
                description
            }); 
            clear.current.reset();
            return true;         
            }
    }

    return(<>
        <div className="row">
            <div className="col-xl-12"><Layout/></div>
            <div className="col-xl-12">
            <div className="content bg-white m-5 p-4">
                <div className="header d-flex justify-content-between align-items-center mb-3">
               {fetchProject.map((info)=>{
                   return(<h5>Add Task for '<strong>{info.p_name}</strong>'</h5>)
               })}   
                   <NavLink to="/"> <a className="btn btn-secondary rounded-0"><i className="fa-solid fa-arrow-left text-white me-2"></i>Back</a></NavLink>
                </div>
                <Form ref={clear}>
                    <div className="row p-0">
                        <div className="row p-0 m-0">
                            <div className="col-xl-6">
                                <label for="taskname" className="form-label">Task Name</label>
                                <input type="text" className="form-control rounded-0" id="taskname" aria-describedby="taskname" onChange={(e)=>{setTaskName(e.target.value); console.log(task_name)}}/>
                            </div>
                            <div className="col-xl-2">
                                <label for="taskname" className="form-label">Start Date</label>
                                <div className="input-group date">
                                    <input type="date" className="form-control rounded-0 form-control" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setStartDate(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <label for="taskname" className="form-label">End Date</label>
                                <div className="input-group">
                                    <input type="date" className="form-control rounded-0 form-control" placeholder="MM-DD-YYYY" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setEndDate(e.target.value)}}/>
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
                        </div>
                        <div className="row mt-4 p-0 m-0">
                            <div className="col-xl-3 d-flex flex-column">
                                <label for="" className="form-label">Task Owner</label>                               
                                <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setTaskOwner(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>Jacob</option>
                                    <option>Wade Warren</option>
                                    <option>Guy Hawkins</option>
                                    <option>Jane Copper</option>
                                  </select>                           
                            </div>
                            <div className="col-xl-3 d-flex flex-column" >
                                <label for="" className="form-label">Priority</label>    
                                <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{setPriority(e.target.value)}}>
                                    <option value="" selected>Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                  </select>          
                            </div>
                            <div className="col-xl-6">
                                <label for="" className="form-label">Description</label>
                                <textarea className="form-control rounded-0" placeholder="" id="floatingTextarea" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </div>
                        </div>
                        <div className="row mt-4 p-0 m-0">
                            <div className="col-xl d-flex justify-content-between">
                            {<p className="text-danger fw-bold">{error}</p>} 
                            <div>
                            <button className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0" onClick={addTasknSave}><i className="fa-solid fa-plus fa-lg text-white me-2"></i>SAVE & ADD NEW TASK</button>
                            <button className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0" onClick={addTask}><i className="fa-solid fa-floppy-disk fa-lg text-white me-2"></i>SAVE</button>
                            </div>           
                            </div>
                        </div>
                    </div>   
                    </Form>            
                </div>      
        </div> 
        </div>
    </>)
}


export default AddTask;