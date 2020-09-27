import React, { Component } from "react";

class ResultsUpdate extends Component {
  render() {
    const {
      Username,
      City,
      Country,
      DOB,
      ContactNo,
      handleChange,
      handleModalClose,
      handleUpdate,
    } = this.props;

    return (
      <div className="results-edit">
        <form
          id="editResultsForm"
          className="ui-form"
          autoComplete="off"
          onSubmit={(e) => {
            handleUpdate(e);
          }}
        >
          <h2>Update Entry</h2>
          <label>Username:</label>
          <input
            name="Username"
            type="text"
            required
            placeholder="Username"
            value={Username}
            onChange={handleChange}
          />
          <label>City:</label>
          <input
            name="City"
            type="text"
            required
            placeholder="City"
            value={City}
            onChange={handleChange}
          />
          <label>Country:</label>
          <input
            name="Country"
            type="text"
            required
            placeholder="Country"
            value={Country}
            onChange={handleChange}
          />
          <label>DOB:</label>
          <input
            name="DOB"
            type="date"
            required
            placeholder="DOB"
            value={DOB}
            onChange={handleChange}
          />
          <label>ContactNO:</label>
          <input
            name="ContactNo"
            type="text"
            required
            placeholder="ContactNo"
            value={ContactNo}
            onChange={handleChange}
          />
          <input type="submit" value="Update" />
        </form>
        <button className="close-btn" onClick={() => handleModalClose()}>
          Close
        </button>
      </div>
    );
  }
}

export default ResultsUpdate;
