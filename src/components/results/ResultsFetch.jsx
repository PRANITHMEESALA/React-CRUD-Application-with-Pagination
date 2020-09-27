import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
class ResultsFetch extends Component {
  render() {
    const {
      results,
      handleRemove,
      handleUpdate,
      handleChange,
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
      <div className="results-display">
        <h2>{results.length} - Results Found</h2>
        {results.reverse().map((result) => (
          <ResultsDisplay
            key={result.id}
            Username={Username}
            City={City}
            Country={Country}
            DOB={DOB}
            ContactNo={ContactNo}
            modalIsOpen = {modalIsOpen}
            result={result}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
            handleChange={handleChange}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}
          />
        ))}
      </div>
    );
  }
}

export default ResultsFetch;
