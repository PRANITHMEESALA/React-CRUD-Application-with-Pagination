import React, { Component } from "react";

class ResultsAdd extends Component {
  render() {
    const {Username,City,Country,DOB,ContactNo,ModalClose, handleChange, handlePost } = this.props;
    return (
      <div className="results-add">
      
           <form
           id="addResultsForm"
           className="ui-form"
           autoComplete="off"
           onSubmit={handlePost}
           >
          <h2>Add new user</h2>
          <label>Username:</label>
          <input
            autoFocus
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
          style={{width:'410px',height:'35px'}}
          type="date" 
          name="DOB"
          required
          placeholder="DOB"
          value={DOB}
          onChange={handleChange}
           id=""/>
          <label>ContactNo:</label>
          <input
            name="ContactNo"
            type="text"
            required
            placeholder="ContactNo"
            value={ContactNo}
            onChange={handleChange}
          />
          <input type="submit" value="Submit" />
       

         
        </form>
      
        <button className="close-btn" onClick={() => ModalClose()}>
          Close
        </button> 
     </div>
    );
  }
}

export default ResultsAdd;
