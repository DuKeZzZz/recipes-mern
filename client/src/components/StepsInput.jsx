import React, {useState} from 'react';
import Step from './Step';

function StepsInput(props) {
    const [step, setStep] = useState({
        stepId: 1,
        stepTitle: "",
        stepDescription: "",
        stepImages: [{
            imageName: "",
            path: "",
            size: undefined
        }]
    });

    const steps = props.inputs.recpiesteps;

    function addStepToList(currentStep) {
        props.setInputs(values => ({...values, recpiesteps: [...values.recpiesteps, currentStep]}));
    }

    function deleteStepFromList(index) {
        setStep(prevValue => ({...prevValue, stepId: prevValue.stepId - 1}))

        props.setInputs(values => {
            return ({...values, recpiesteps: values.recpiesteps.filter((tag, i) => i !== index)});
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
    
        setStep((prevValue) => {
          return { ...prevValue, [name]: value };
        });
    }

    return (
        <div className="mb-3">
            <h4>Steps</h4>
            <hr></hr>
            <div className='mb-3'>
                {steps.map((currentStep, index) => (
                    <div key={index} className='mb-3 step'>
                        <h3>Step {currentStep.stepId} - {currentStep.stepTitle}</h3> <button className="btn btn-outline-dark" style={{position:"absolute", top: "10px", right: "10px"}} onClick={() => deleteStepFromList(index)}>x</button> <hr></hr>
                        <p>{currentStep.stepDescription}</p>   
                    </div>
                ))}                     
            </div>
            <div className='mb-3 row'>
                <div className ="mb-3 col-md-3">
                    <input
                        className ='form-control'
                        type="text"
                        onChange={handleChange}
                        name="stepTitle"
                        placeholder="Step Title"
                        value={step.stepTitle}
                    />
                </div>
                <div className ="mb-3 col-md-8">
                    <textarea
                        className ='form-control'
                        type="text"
                        onChange={handleChange}
                        name="stepDescription"
                        placeholder="Step Description"
                        value={step.stepDescription}
                    />
                </div>
                <div className='mb-3 col-md-1'>
                <button
                    className="btn btn-outline-dark"
                    onClick={(event) => {
                        event.preventDefault();
                        addStepToList(step);
                        setStep((prevValue) => ({
                            stepId: prevValue.stepId + 1,
                            stepTitle: "",
                            stepDescription: "",
                            stepImages: [{
                                imageName: "",
                                path: "",
                                size: undefined
                            }]
                        })); 
                        
                    }}
                    >
                    Add
                </button>
                </div>
            </div>    
        </div>
    );
}

export default StepsInput;