import React, { Component } from "react";
import Modal from "react-modal";
import ResultsUpdate from "./ResultsUpdate";

Modal.setAppElement("#root");

class ResultsDisplay extends Component {
  render() {
    const {
      result,
      handleRemove,
      handleUpdate,
      handleChange,
      Currentdate,
      handleModalOpen,
      handleModalClose,
      Username,
      City,
      Country,
      DOB,
      ContactNo,
      modalIsOpen,
    } = this.props;
    return (
      <div className="allProperties">
        <span className="display">Username: {result.Username}</span>
        <span className="display">City: {result.City}</span>
        <span className="display">Country: {result.Country}</span>
        <span className="display">DOB: {result.DOB}</span>
        <span className="display">ContactNo: {result.ContactNo}</span>
        <span className="display">Created Date: {result.Currentdate}</span>
        <button className="remove-btn" onClick={() => handleRemove(result.id)}>
          Remove
        </button>
        <button
          className="edit-btn"
          onClick={() => {
            handleModalOpen(result.id);
          }}
        >
          Update
        </button>
        <hr />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModalClose()}
          style={{
            overlay: {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            content: {
              border: "none",
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <ResultsUpdate
            Username={Username}
            City={City}
            Country={Country}
            DOB={DOB}
            ContactNo={ContactNo}
            Currentdate={Currentdate}
            handleModalClose={handleModalClose}
            handleUpdate={handleUpdate}
            handleChange={handleChange}
          />
        </Modal>
      </div>
    );
  }
}

export default ResultsDisplay;
