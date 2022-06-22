import React from "react";
import logo from "../resources/images/logo.png";
import { NavLink } from "react-router-dom";
function Layout(){
    return(
        <>
            <div className="row">
                <div className="col-xl-12 p-0 m-0">
                    <div className="header d-flex justify-content-between border-bottom border-warning bg-white">
                        <div className="logo d-flex align-items-center">
                            <img src={logo} className="p-2 ms-3" width="210" height="70"/>
                            <div className="vr vr-class mt-2"></div>
                            <h3 className="p-3 text-secondary">PROJECT MANAGEMENT</h3>
                        </div>
                        <div className="user d-flex align-items-center me-4">
                            <p className="mt-3 me-1">Brooklyn Simmons</p>
                            <img className="rounded-circle" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500" width="45" height="45" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="d-flex flex-row-reverse align-items-center py-3 bg-white">
                        <a className="text-decoration-none me-5 text-secondary"  href="">LOGOUT</a>
                        <NavLink to="/AddProject" exact className="text-decoration-none  me-3 text-secondary p-2" activeClassName="activelink">ADD PROJECT</NavLink>
                        <NavLink to="/" activeClassName = "activelink"  className="text-decoration-none text-secondary me-3 p-2">HOME</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;