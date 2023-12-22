    import React from 'react';
    import Dropzone from 'react-dropzone';
    import './StepTwo.css';
    //import { AiOutlineWarning } from 'react-icons/ai';

    const StepTwo = ({ formData, handleChange, prevStep, handleSendDataToServer, loading }) => {
    const onDropFront = (acceptedFiles) => {
        const file = acceptedFiles[0];
        handleChange({
        target: {
            id: 'licenseFront',
            value: file,
        },
        });
    };

    const onDropBack = (acceptedFiles) => {
        const file = acceptedFiles[0];
        handleChange({
        target: {
            id: 'licenseBack',
            value: file,
        },
        });
    };

    return (
        <form className="row g-3 submission-form" encType="multipart/form-data">
        {/* First Column */}
        <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="ssn" className="form-label">
                SSN/SIN:
            </label>
            <input
                type="text"
                className="form-control"
                id="ssn"
                value={formData.ssn}
                onChange={handleChange}
            />
            </div>

            <div className="mb-3">
            <label htmlFor="dob" className="form-label">
                Date of Birth:
            </label>
            <input
                type="date"
                className="form-control"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
            />
            </div>
        </div>

        {/* Second Column */}
        <div className="col-md-6">
            {/* Dropzone for license Front */}
            <div className="col-md-8 dropzone-container">
            <div className="drop-title">Drivers License (front page) *</div>
            <Dropzone onDrop={onDropFront} className="Drop-zone">
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {formData.licenseFront ? (
                    <div className="preview-container">
                        <p>Preview Drivers License Front:</p>
                        <img
                        src={URL.createObjectURL(formData.licenseFront)}
                        alt="License Front Preview"
                        className="preview-image"
                        />
                    </div>
                    ) : (
                    <p className="text-center mb-0 drop-text">
                        Drag 'n' drop Drivers License Front file here, or click to select a file
                    </p>
                    )}
                </div>
                )}
            </Dropzone>
            </div>

            {/* Dropzone for license Back */}
            <div className="col-md-8 dropzone-container">
            <div className="drop-title">Drivers License (back page) *</div>
            <Dropzone onDrop={onDropBack}>
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {formData.licenseBack ? (
                    <div className="preview-container">
                        <p>Preview Drivers License Back:</p>
                        <img
                        src={URL.createObjectURL(formData.licenseBack)}
                        alt="License Back Preview"
                        className="preview-image"
                        />
                    </div>
                    ) : (
                    <p className="text-center mb-0 drop-text">
                        Drag 'n' drop Drivers License Back file here, or click to select a file
                    </p>
                    )}
                </div>
                )}
            </Dropzone>
            </div>

            <div className="mb-12 btn-navcomponent">
            <button type="button" className="btn btn-secondary me-2 btn-navform" onClick={prevStep}>
                Back
            </button>
            <button
                type="button"
                className="btn btn-primary btn-navform"
                onClick={handleSendDataToServer}
                disabled={loading}
            >
                {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
            </div>
        </div>
        </form>
    );
    };

    export default StepTwo;
