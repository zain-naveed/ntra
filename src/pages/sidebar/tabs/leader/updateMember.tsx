import React,{useState,useEffect} from 'react';
import { useLocation,useParams } from 'react-router-dom'
import { IonBackButton, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonContent,IonPage,IonLoading, IonSpinner, IonToast } from '@ionic/react';
import Input from '../../../../shared/components/input/input';
import { ProfileDetailService,UpdateProfileService,ResetPasswordService } from "../../../../shared/service/profile"
import { getData } from '../../../../shared/util/appStorage';
function UpdateMember() {
    const [loader,setLoader] = useState(false);
    const [editUser,setEditUser] = useState({})
    const [showLoading, setShowLoading] = useState(true);
    const [userCookie,setUserCookie] = useState("");
    const [showToast1, setShowToast1] = useState(false);
    const [Message, setMessage] = useState("");
    const param = useParams();
    const getProfileUser = (userid :any ,cookie :  any)=>{
        ProfileDetailService((res)=>{
            setEditUser(res)
            setShowLoading(false)
        },`?user_id=${userid}&cookie=${cookie}`)
    }
    useEffect(()=>{
        getData("user",(res)=>{
            if(res){
            setUserCookie(res.cookie)
           getProfileUser(res.user.id,res.cookie)
            }
          })
          getData("register",(res)=>{
            if(res ){
                setUserCookie(res.cookie)
                getProfileUser(res.user_id,res.cookie)
                console.log("register",res)
            }
          })
    },[]) 
    const handleChange = (e:any)=>{
        const name = e.target.name;
        const value = e.target.value
        setEditUser({
            ...editUser,
            [name]:value
        })
    }
    const handleUpdate = ()=>{
        setLoader(true)

        UpdateProfileService((res)=>{
            setLoader(false)
            console.log("update res",res)
        },`?cookie=${userCookie}&first_name=${(editUser as any).firstname}&last_name=${(editUser as any).lastname}&description=${(editUser as any).description}&city=${(editUser as any).city}&addr1=${(editUser as any).address1}&addr2=${(editUser as any).address2}&thestate=${(editUser as any).state}&country=${(editUser as any).country}&cell_phone=${(editUser as any).phone}&zip=${(editUser as any).zip}`)

    } 
    const resetPassword = ()=>{
        setShowLoading(true);
        ResetPasswordService((res)=>{
            setShowLoading(false)
            setMessage("Reset Password Link Send Your Email")
            setShowToast1(true)
        },`?user_login=${(editUser as any).email}`)
    } 
    console.log(editUser)
    return (
        <div>
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

            <IonPage>
          <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
          <IonBackButton defaultHref="home"  />
        </IonButtons>
       
        </IonToolbar>
    </IonHeader>
    <IonContent style={{marginBottom:"10px"}}>
    <div className="join" style={{marginBottom:"15px"}} >
        <label className="text" onClick={resetPassword}>Reset Password</label>
             <Input type="text" name="firstname" value={ (editUser as any).firstname} onChange={handleChange}  inputname={"Frist Name"} />
             <Input type="text" name="lastname" value={ (editUser as any).lastname}  onChange={handleChange}  inputname={"Last Name"} />
            <Input type="text" name="description" value={ (editUser as any).description} onChange={handleChange}    inputname={"Player Bio"} />  
            <Input type="text" name="country" value={ (editUser as any).country} onChange={handleChange}    inputname={"Country/Region"}   />
            <Input type="text" name="state"  value={ (editUser as any).state}  onChange={handleChange}  inputname={"State"}   />
            <Input type="text" name="city" value={ (editUser as any).city} onChange={handleChange}  inputname={"City"}   />
             <Input type="text" name="address1" value={ (editUser as any).address1} onChange={handleChange}   inputname={"Address 1"} />
             <Input type="text" name="address2" value={ (editUser as any).address2} onChange={handleChange}  inputname={"Address 2"} />
             <Input type="text" name="zip" value={ (editUser as any).zip} onChange={handleChange}   inputname={"ZipCode"} />
             <Input type="tel" name="phone" value={ (editUser as any).phone} onChange={handleChange}   inputname={"Home Phone"}  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
             {/* <Input type="tel" value={ (editUser as any).firstname}  placeholder="123-45-1212" inputname={"Cell Phone"}  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
             <Input type="text" value={ (editUser as any).firstname}  placeholder="Coupon Code" inputname={"Coupon Code"} /> */}
                  
           </div>
           
           </IonContent>
           <button  className="join-button" disabled={loader} onClick={handleUpdate} >
               {
                   loader ?   <IonSpinner color="white" name="lines"  />:" Save"
               }
         
               
                </button>


                <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message={Message}
        duration={3000}
      />
           </IonPage>   
        </div>
    );
}

export default UpdateMember;