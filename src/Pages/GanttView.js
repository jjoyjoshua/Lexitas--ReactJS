import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
function GanttView(){
    let navigate = useNavigate();

    const {p_id} = useParams();
    const [getTask, setGetTask] = useState([]);
    const [getPro, setGetPro] = useState([]);
    const[pData, setPData] = useState([]);
    const[demo, setDemo] = useState([]);
    const getData = (e) =>{
        axios.get("https://62959f8e810c00c1cb644854.mockapi.io/projects")
        .then((response)=>{
           setPData(response.data);
           console.log("pData updated")
           console.log(pData)
        })
    }

    const getTData = () =>{
        axios.get(`https://62959f8e810c00c1cb644854.mockapi.io/tasks?p_id=${p_id}`)
          .then((response)=>{
              setGetTask(response.data);
                setDemo(response.data);
              console.log(getTask);
          });
    }
    useEffect(()=>{
        getTData();
        getData();
    },[])

    useEffect(()=>{
        axios.get(`https://62959f8e810c00c1cb644854.mockapi.io/projects?p_id=${p_id}`)
        .then((res)=>{
            setGetPro(res.data)
        });
    },[]);
    
    const setData = (data)=> {
        console.log(data);
        let {id,task_name, startdate,enddate,status,priority,description,task_owner} = data;
        localStorage.setItem('ID',id)
        localStorage.setItem('Task Name',task_name);
        localStorage.setItem('Start Date', startdate);
        localStorage.setItem('End Date', enddate);
        localStorage.setItem('Status', status);
        localStorage.setItem('Task Owner', task_owner);
        localStorage.setItem('Priority', priority);
        localStorage.setItem('Description', description);
    }

    const DeleteTask = (id)=>{
        console.log(id);
        axios.delete(`https://62959f8e810c00c1cb644854.mockapi.io/tasks/${id}`)
        .then((response)=>{
            console.log('deletion successful');
            getTData();
        })
    }

    
    const filterStatus = (stat) =>{
        const arr = []
        demo.map((info)=>{
          if (info.status === stat){
            arr.push(info)
            setGetTask(arr)
          }
          if(stat === "all"){
            getTData()
          }
          
    }) 
    }

 const traverse = (id) => {
     navigate(`/GanttView/${id}`);
     window.location.reload();
 }
    return(
    <>
        <div className="row">
        <div className="col-xl-12"><Layout/></div>
        <div className="col-xl-12 p-0 m-0">
            <div className="row bg-white mx-5 my-3 p-3">
                <div className="col-xl-12 header d-flex justify-content-between align-items-center mb-3">
                    <h5>Project</h5>
                    <div>
                       <NavLink to="/"> <a className="btn btn-secondary rounded-0"><i className="fa-solid fa-arrow-left text-white me-2 "></i>Back</a></NavLink>
                       <NavLink to={`/AddProject/AddTask/${p_id}`}><a className="ms-3 btn-color text-white btn btn-secondary rounded-0 border-0"><i className="bi bi-plus fa-lg"></i>TASK</a></NavLink>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-6 d-flex flex-column" >
                            <label for="" className="form-label">Project Name</label>    
                            <select className="form-select  rounded-0" aria-label="Default select example" onChange ={(e)=>{traverse(e.target.value,e)}}>
                            {pData.map((info)=>{                         
                                return(
                                   <option value={info.p_id}>{info.p_name}</option>                         
                                )                              
                            })}
                              </select>       
                        </div>
                        <div className="col-xl-3 d-flex flex-column" >
                            <label for="" className="form-label">Status</label>  
                            <select className="form-select  rounded-0" aria-label="Default select example" onChange={(e)=>{filterStatus(e.target.value);}}>
                                <option value="all" selected>All</option>
                                <option value="active">Active</option>
                                <option value="delayed">Delayed</option>
                                <option value="not started">Not Started</option>
                                <option value="completed">Completed</option>
                              </select>       
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
        <div className="col-xl-12 p-0 m-0">
        {getPro.map((info)=>{
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
                <div className="d-flex flex-row justify-content-between mx-5 bg-white gantt-controls ">
                        <div className=" d-flex flex-column mt-3 ms-4 fs-6">
                            <p className="p-0 m-0 text-secondary">Project Name</p>
                            <p className="fw-bold">{info.p_name}</p>
                        </div>
                        <div className="d-flex flex-column mt-3 fs-6 ">
                            <p className="p-0 m-0 text-secondary">Start Date</p>
                            <p className="fw-bold">{dateString}</p>
                        </div>
                        <div className="d-flex flex-column mt-3 fs-6">
                            <p className="p-0 m-0 text-secondary">End Date</p>
                            <p className="fw-bold">{dateString1}</p>
                        </div>
                        <div className="d-flex flex-row mt-3 ms-5">
                            <div className="rounded-pill bg-warning text-white me-2 "><p className="ms-4 ps-2 pt-2">Active</p></div>
                            <div className="rounded-pill bg-danger bg-opacity-50 me-2 text-white"><p className="ms-4 pt-2">Delayed</p></div>
                            <div className="rounded-pill bg-secondary text-white me-2"><p className="ms-3 pt-2 ">Not started</p></div>
                            <div className="rounded-pill bg-success text-white me-2"><p className="ms-3 pt-2">Completed</p></div>
                        </div>
                        <div className="mt-3 mx-4 icons d-flex flex-row justify-content-center">
                            <div className="btn-color mb-5 p-1"><i className="fa-solid fa-chart-bar fa-xl me-3 text-white"></i></div>
                            <div className="mb-5 p-1 border border-warning"><i className="fa-solid fa-table-list fa-xl"></i></div>
                        </div>                 
                    </div>
            )
        })}
                                      
            <div className="col-xl-12">
                <div className="row bg-white mx-5">
                    <div className="col-xl-3">
                        <div className="row mt-5 pt-2">
                            <div className="col-xl-12 invisible">Projects</div>
                            {
                                getTask.map((info)=>{
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
                                        <div className="col-xl-12 mb-2">
                                         <div className={`row ${info.status} rounded-pill w-100 ms-1 p1`}>
                                                <div className="col-xl-1 d-flex align-items-center"><i className="fa-solid fa-ellipsis-vertical text-white fa-xl" id="dropdownMenuButton1" data-bs-toggle="dropdown"></i>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <NavLink to="/EditTask" className="text-decoration-none"><li><a className="dropdown-item" href="#" onClick={()=>{setData(info)}}>Edit</a></li></NavLink>
                                                        <li><a className="dropdown-item" href="#" onClick={() =>{DeleteTask(info.id)}}>Delete</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-xl-11 p-0 m-0">
                                                    <div className="row">
                                                        <div className="col-xl-12 text-white">{info.task_name}</div>
                                                        <div className="col-xl-12 text-white">{dateString} <i className="fa-solid fa-arrows-left-right text-white"></i> {dateString1}  <span className="me-2"></span>{info.task_owner}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }                                            
                        </div>
                    </div>
                    <div className="col-xl-9 gantt-chart pt-2">
                        <div className="row mb-5">
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">JAN'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">FEB'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">MAR'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">APR'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">MAY'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">JUN'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">JUL'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">AUG'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">SEP'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">OCT'22</div>
                            <div className="col-xl-1 fw-bold border-end border-2 border-white">NOV'22</div>
                            <div className="col-xl-1 fw-bold">DEC'22</div>
                        </div>
                        {getTask.map((info)=>{
                            const sd = info.startdate;
                            const ed = info.enddate;
                            var s = new Date(sd).getMonth();
                            var e = new Date(ed).getMonth();
                            const gantt_w = ((e - s) + 1) * 86;
                            const gantt_m = (s)*90;
                            var today = new Date();
                            const sday = new Date(sd)
                            const extraTime = sday.getTime() - today.getTime();
                            const extraDay = Math.trunc(extraTime /(1000 * 3600 * 24)); 
                            return(
                                <div className="row">
                                    <div className={` rounded-pill  mb-2 ${info.status}`} style={{width : `${gantt_w}px`, marginLeft: `${gantt_m}px`}}><p className="text-white mt-2">{extraDay}</p></div>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>   
    </div>
    </>)
}

export default GanttView;
