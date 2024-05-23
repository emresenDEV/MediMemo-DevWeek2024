import React, { useState } from "react";

function CustomizeDataForm({dataProfile, setDataProfile}) {
  // edit button would make all of the pieces of the final form text inputs
  // so the final form would made from an object (retrieved from the database) and each of the lines would be props from that object
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState( //temporarily stores what the user has entered into the form
    {
      title: "Name of Form",
      subsections: [
        {
          sectionHeader: "Section Header (optional)",
          questions: [
            {
              questionText: "Question text",
              summary: "summary or more details (optional)",
              inputType: "text"
            },
            {
              questionText: "Question text",
              summary: "summary or more details (optional)",
              inputType: "checkbox"
            }
          ]
        }
      ]
    })

  function handleChange(e) { //adds any changes to the form to the temporary storage
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleEdit(e) {
    e.preventDefault()
    setIsEditing(false)
  }

  const subsectionsJSX = formData.subsections.map(subsection => {//return jsx for each subsection saved for this form
    // map over nested array of questions and return jsx for each question
    const questionsJSX = subsection.questions.map(questionObj => {
      return (
        <div className="question">
          <h3>{questionObj.questionText}</h3>
            <ul>
              <li><p>{questionObj.summary}</p></li>
              <li><p>{questionObj.inputType}</p></li>
            </ul>
        </div>
      )
    })
    return( //put all questions and the subsection header together
      <div className="subsection">
        <h2>{subsection.sectionHeader}</h2>
        {questionsJSX}
      </div>
    )
  })

  if (!isEditing) {
    return(
      <div>
        {/* <p>view/edit/delete data forms</p> */}
        <h1>{formData.title}
          <button onClick={() => setIsEditing(true)}>edit</button>
          <button>delete</button>
        </h1>
        <div>
          {subsectionsJSX}
        </div>
      </div>
    )
  }

  const editingSubsectionsJSX = formData.subsections.map(subsection => {//return jsx for each subsection saved for this form
    // map over nested array of questions and return jsx for each question
    const questionsJSX = subsection.questions.map(questionObj => {
      return (
        <div className="question">
          <br/>
          <label>Question Text:
            <input name="questionText" type="text" value={questionObj.questionText} onChange={console.log("need to modify change formula")}/>
          </label>
          {/* <h3>{questionObj.questionText}</h3>
            <ul>
              <li><p>{questionObj.summary}</p></li>
              <li><p>{questionObj.inputType}</p></li>
            </ul> */}
        </div>
      )
    })
    return( //put all questions and the subsection header together
      <div className="subsection">
        <h2>{subsection.sectionHeader}</h2>
        {questionsJSX}
      </div>
    )
  })

  return(
    <>
    <form onSubmit={handleEdit}>
      <label>Title:
        <input name="title" type="text" value={formData.title} onChange={handleChange}/>
      </label>
      <button className="submit" type="submit">Save</button>
      
      <br/>
      <label>Section Header:
        <input name="section1" type="text" value={formData.section1} onChange={handleChange}/>
      </label>
      {editingSubsectionsJSX}
    </form>



    {/* <div>
      <p>view/edit/delete data forms</p>
      <h1>Name of Form  
        <button>edit</button>
        <button>delete</button>
      </h1>
      <div>
        <h2>Section Header (optional)</h2>
        <div>
            <h3>Question</h3>
          <ul>
            <li><p>summary or more details (optional)</p></li>
            <li><p>input (options for input type)</p></li>
          </ul>
        </div>
        <div>
            <h3>Question</h3>
          <ul>
            <li><p>summary or more details (optional)</p></li>
            <li><p>input (options for input type)</p></li>
          </ul>
        </div>
      </div>
    </div> */}
    </>
  )
}

export default CustomizeDataForm