import React from "react";
import IconLabelButton from "./IconLabelButton";
import { faHeartPulse, faViruses, faNotesMedical, faSyringe, faRectangleList, faMessage, faCalendarCheck, faPrescriptionBottleMedical, faUserDoctor, faGraduationCap, faFolderOpen, faCakeCandles, faEnvelope, faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons';
//__Contents__:
// Picture (round, set default icon)
// User Birthday
// User Email
// --line break--
// Vitals 
// Allergies
// Problems
// Immunizations
// Results
// Messages 
// Appointments
// Medications
// Referrals
// Education
// Documents

function PatientPortal() {
    const user = {
        firstName:"John", 
        lastName:"Doe", 
        birthday:"01/01/2000", 
        email:"jdoe@gmail.com", 
        address:"1234 Main St, City, State, 12345", 
        gender:'female',
        photo: ""
    }
    const defaultPhoto = <FontAwesomeIcon icon={faCircleUser} />

    return(
    // jsx here
    <div className='flexGrid'>
        {/* USER PROFILE PIC - ROUND. INSERT DEFAULT PIC */}
        <img 
            src={user.photo || defaultPhoto}
            alt = {'${user.firstName} ${user.lastName}'}
            className="user-profile-pic"
        />
        <br/>
        <h1>{user.firstName} {user.lastName}, {user.gender}</h1>
        <br/>
        <h3><FontAwesomeIcon icon={faCakeCandles} className="icon-spacing" /> {user.birthday}</h3>
        <br/>
        <h3><FontAwesomeIcon icon={faEnvelope} className="icon-spacing" /> {user.email}</h3>
        <br/>
        <h3><FontAwesomeIcon icon={faHouse} className="icon-spacing" /> {user.address}</h3>
        <br/>
        {/* LIGHT COLORED LINE TO DIVIDE TOP FROM BUTTONS BELOW */}
        <hr className="divider-line" />
    <div className="button-container">
        <IconLabelButton icon={faHeartPulse} label="Vitals" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faViruses} label="Allergies" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faNotesMedical} label="Problems" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faSyringe} label="Immunizations" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faRectangleList} label="Results" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faMessage} label="Messages" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faCalendarCheck} label="Appointments" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faPrescriptionBottleMedical} label="Medications" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faUserDoctor} label="Referrals" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faGraduationCap} label="Education" onClick={() => { /* Handle click */ }} />
        <IconLabelButton icon={faFolderOpen} label="Documents" onClick={() => { /* Handle click */ }} />
    </div>
    </div>
    )
}
    export default PatientPortal