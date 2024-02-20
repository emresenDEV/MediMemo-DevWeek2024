import React from "react";

//__Contents__:
// Picture (round, set default icon)
// User Birthday
// User Email
// --line break--
// Vitals 
// Allergies < FUNCTIONAL
// Problems
// Immunizations
// Results
// Messages < FUNCTIONAL
// Appointments < FUNCTIONAL
// Medications < FUNCTIONAL 
// Referrals
// Education
// Documents < FUNCTIONAL (ACCOUNT -rename)

function PatientPortal({providerOffice}) {
    const user = {
        firstName:"Jennifer", 
        lastName:"Smith", 
        birthday:"01/01/2000", 
        email:"jsmith@gmail.com", 
        address:"1234 Main St, Beaumont, TX, 77705", 
        gender:'female',
        photo: 'https://images.pexels.com/photos/3812742/pexels-photo-3812742.jpeg'
        // FIXME: find a generic pic to use as default
    }
    
    const defaultPhoto = <i class="fa fa-user-circle-o" aria-hidden="true"></i>
    console.log(providerOffice)
    return(
    // jsx here
    <div className='flexGrid'>
        <div className='all'>
        {/* USER PROFILE PIC - ROUND. INSERT DEFAULT PIC */}
        <img 
            src={user.photo || defaultPhoto}
            alt = {'{user.firstName} {user.lastName}'}
            className="userProfilePic"
        />
        <br/>
        <h1>{user.firstName} {user.lastName} </h1> {user.gender}
        <br/>
        <div className='userInfo'>
        {user.gender}
        <br/>
        {providerOffice.providerOfficeName} | {providerOffice.providerCity}, {providerOffice.providerState}
        <br/>
        {user.birthday}
        <br/>
        {user.email}

        <br/>
        
        {/* LIGHT COLORED LINE TO DIVIDE TOP FROM BUTTONS BELOW */}
        </div>
        <hr className="dividerLine" />
        {/* FIXME: icons not populating for buttons */}
    <div className="buttonContainer"> 
        {[
            { icon: "fa fa-heartbeat", label: "Vitals" },
            { icon: "fa fa-eye", label: "Allergies" },
            { icon: "fa fa-file-text", label: "Problems" },
            { icon: "fa fa-medkit", label: "Immunizations" },
            { icon: "fa fa-list", label: "Results" },
            { icon: "fa fa-user-md", label: "Messages" },
            { icon: "fa fa-calendar-check-o", label: "Appointments" },
            { icon: "fa fa-heart-o", label: "Medications" },
            { icon: "fa fa-paper-plane-o", label: "Referrals" },
            { icon: "fa fa-graduation-cap", label: "Education" },
            { icon: "fa fa-user-circle", label: "Account" }
        ].map((button, index) => (
            <button key = {index} className="styledButton">
                <i className={'fa ${button.icon}'} aria-hidden="true"></i>
                <span>{button.label}</span>
            </button>
        ))}

        {/* <i class="fa fa-eye" id="iconButton" aria-hidden="true">Allergies</i>
        <i class="fa fa-file-text" id="iconButton" aria-hidden="true">Problems</i>
        <i class="fa fa-medkit" id="iconButton" aria-hidden="true">Immunizations</i>
        <i class="fa fa-list" id="iconButton" aria-hidden="true">Results</i>
        <i class="fa fa-user-md" id="iconButton" aria-hidden="true">Messages</i>
        <i class="fa fa-calendar-check-o" id="iconButton" aria-hidden="true">Appointments</i>
        <i class="fa fa-heart-o" id="iconButton" aria-hidden="true">Medications</i>
        <i class="fa fa-paper-plane-o" id="iconButton" aria-hidden="true">Referrals</i>
        <i class="fa fa-graduation-cap" id="iconButton" aria-hidden="true">Education</i>
        <i class="fa fa-user-circle" id="iconButton" aria-hidden="true">Account</i> */}

    </div>
    </div>
    </div>
    )
}
    export default PatientPortal