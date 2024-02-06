import React,{useState,useEffect} from 'react';
import Input from '../../../shared/components/input/input';
import SelectInput from '../../../shared/components/input/selectinput';
import mentionsStyles from './login.module.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, isPlatform, IonButton ,useIonToast, IonText, IonLoading} from '@ionic/react'
import "./join.css";
import { Formik } from "formik";
import * as Yup from "yup";
import {NonceService} from '../../../shared/service/nonce'
import {RegisterService} from '../../../shared/service/register'
import { IonSpinner, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom'
function Join() {
    const history = useHistory();
    // const [startDate, setStartDate] = useState(new Date());
    // const [username,setUserName] = useState("");
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    const [loader,setLoader] = useState(false)
    const [nonce,setNonce] = useState("")
    const [Message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const [showToast1, setShowToast1] = useState(false);
    let obj = {
        username:"",
        email:"",
        password:""
    }
    const getNonce = ()=>{
NonceService((res)=>{
    setNonce(res.nonce);
})
    }
useEffect(()=>{
getNonce()
},[])
useEffect(()=>{
    var wn = (document.getElementById('ifrm') as any).contentWindow;
    // window.parent.postMessage("Hello","*");
    var eventMethod : any = (window as any).addEventListener ? "addEventListener" : "attachEvent";
var eventer : any = window[eventMethod];
var messageEvent: any = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
window.addEventListener("message",function(e:any) {
    console.log("parent received message!",e.data)

    // alert('parent received message!:  '+e.data)
  
},false);
})


 return (<>
 {
            showLoading && <IonLoading
            cssClass='my-custom-class'
            spinner="lines"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
            duration={5000}
          />
          }
    <div style={{height:"100vh",width:"100vw"}}>
        <iframe onLoad={()=>{
                setShowLoading(false)
            }} id="ifrm" style={{height:"inherit",width:"inherit",border:"none"}} src={"https://staging-ntra.kinsta.cloud/nhc/app-membership/"}></iframe>
    </div>
        {/* <Formik
          initialValues={obj}
          onSubmit={async (values) => {
            setLoader(true)
                RegisterService((res)=>{
                    setLoader(false)
                    if(res && res.isSuccess){
                        history.push("/home")
                    }else{
                        setMessage(res?.error)
                        setShowToast1(true)
                    }
                    
                    console.log(res)
                    // setMessage(res?.message)
                    // setShowToast1(true)
                },`?username=${values.username}&email=${values.email}&user_pass=${values.password}&nonce=${nonce}`)
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required().label("username"),
            email: Yup.string().required().label("email"),
            password: Yup.mixed().required().label("password")
          })}
        >
        {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            } = props;
                return <div>
                 
                
          
        <div className={mentionsStyles.login_content}>
        

        <Input type="text" value={values.username} onChange={handleChange("username")} placeholder="Johndoe1" inputname={"Username"} />
                 {
                     touched.username && errors.username ? <span style={{color:"red"}}> {errors.username }</span>:"" 
                 }
             <Input type="text" onChange={handleChange("email")}  placeholder="Johndoe@mail.com" inputname={"Email"} />
                 {
                     touched.email && errors.email ? <span style={{color:"red"}}> {errors.email} </span>:"" 
                 }
             <Input type="password" onChange={handleChange("password")}  placeholder="......." inputname={"Password"} />
           
                 {
                     touched.password && errors.password ?  <span style={{color:"red"}}>{ errors.password }</span>:"" 
                 }

        
            
            
        </div>
        <div className="join colr" >
       <h5 className="join-text">Personal Information</h5>
    
           <Input type="date"     placeholder="Johndoe1" inputname={"Date of Birth"} />
                 <SelectInput  inputname={"Country/Region"} >
                     <option>zain</option>
                     </SelectInput>
                     <SelectInput  inputname={"State"} >
                     <option>zain</option>
                     </SelectInput>
             <Input type="text"  placeholder="Roseville" inputname={"City"} />
             <Input type="text"  placeholder="497 Evergreen Rd" inputname={"Address 1"} />
             <Input type="text"  placeholder="Apt. 47" inputname={"Address 2"} />
             <Input type="text"  placeholder="40100" inputname={"ZipCode"} />
             <Input type="tel"  placeholder="123-45-678" inputname={"Home Phone"}  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
             <Input type="tel"  placeholder="123-45-1212" inputname={"Cell Phone"}  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
            
             <Input type="text"  placeholder="Coupon Code" inputname={"Coupon Code"} />
               
           </div>
           <button className="join-button" disabled={loader} onClick={()=>handleSubmit()}>
               {
                   loader ?   <IonSpinner color="white" name="lines"  />:" Create Account"
               }
         
               
                </button>
           </div>
        }}
           </Formik> */}

           <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message={Message}
        duration={3000}
      />
        </>
    );
}

export default Join;