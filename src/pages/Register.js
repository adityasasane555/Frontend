import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,Link} from 'react-router-dom';
import { registerInitiate,googleSignInInitiate } from '../redux/actions';

import "./Register.css"

const Register = () => {
    const [state,setState] = useState({
        displayName:"",      
        email:"",
        password:"",
        passwordConfrim:""
    });

    const {currentUser} = useSelector((state)=>state.user);
    const history = useHistory();

    useEffect(()=>{
        if(currentUser){
            console.log(currentUser)
            history.push("/");
        }
    },[currentUser,history]);

    const dispatch = useDispatch();
    const handleGoogleSignIn =() =>{
        dispatch(googleSignInInitiate());
    }
    const {email ,password,displayName,passwordConfrim} = state;
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password !== passwordConfrim){
            return;
        }
        dispatch(registerInitiate(email,password,displayName));
        setState({email:"",displayName:"",password:"",passwordConfrim:""});

    }
    const handleChange =(e)=>{
        let {name ,value} = e.target;
        setState({...state,[name]:value});
    }
  return (
    <div>
        <div id="register-form">
            <form className="form-signup" onSubmit ={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal" id='SignUp-Heading-Label' style ={{textAlign:"center"}}>
                    Sign Up
                </h1>
                <input 
                    type = "text"
                    id ="displayName"
                    className = "form-control"
                    placeholder="Full Name"
                    name ="displayName"
                    onChange ={handleChange}
                    value ={displayName}
                    required
                />
                <input 
                    type = "email"
                    id ="userEmail"
                    className = "form-control"
                    placeholder="Email Address"
                    name ="email"
                    onChange ={handleChange}
                    value ={email}
                    required
                />
                <input 
                    type = "password"
                    id ="inputPassword"
                    className = "form-control"
                    placeholder="Password"
                    name ="password"
                    onChange ={handleChange}
                    value ={password}
                    required
                />
                 <input 
                    type = "password"
                    id ="passwordConfrim"
                    className = "form-control"
                    placeholder="Repeat Password"
                    name ="passwordConfrim"
                    onChange ={handleChange}
                    value ={passwordConfrim}
                    required
                />
                <button className ="btn btn-primary btn-block" id='sign-button-login' type="submit">
                    <i className = "fas fa-user-plus"></i> Sign Up
                </button>
                <p style={{textAlign:"center"}}>OR</p>
                <div className="social-login">
                    <button className="btn google-btn social-btn" type = "button" onClick = {handleGoogleSignIn} >
                        <span>
                            <i className="fab fa-google-plus-g" id='google-btn-login'></i>  Google
                        </span>
                    </button>
                </div>
              
                <Link to="/login">
                    <i className="fas fa-angle-left" id='back-register'></i> Back
                </Link>
            </form>
            <br/>
        </div>
    </div>
  )
}

export default Register