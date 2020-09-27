import React, { Component } from "react";
import ResultsFetch from "./ResultsFetch";
import ResultsAdd from "./ResultsAdd";
import './pagination.css';
import instance from "../../firebase/instance";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate'
import Modal from 'react-modal';
    var today = new Date(),
    date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
class Results extends Component {
  
  state = {
    results: [],
    Username: '',
    City: '',
    Country: '',
    DOB:'',
    ContactNo:'',
    modalIsOpen: false,
    modal:false,
    Currentdate:date,
    offset: 0,
    tdata:[],
    orgtableData: [],
    perPage: 15,
    currentPage: 0
  };

  componentDidMount() {
    trackPromise(
      instance.get("/results.json").then((response) => {
        const fetchedResults = [];

        for (let key in response.data) {
            fetchedResults.push({
            ...response.data[key],
            id: key,
          });
        }
        console.log('data-->'+JSON.stringify(fetchedResults))
        var slice = fetchedResults.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(fetchedResults.length / this.state.perPage),
          orgtableData :fetchedResults,
          results:slice
        });
      })
    );
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });

};

loadMoreData() {
const data = this.state.orgtableData;
const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

this.setState({
  pageCount: Math.ceil(data.length / this.state.perPage),
  results:slice
})

}
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handlePost = (e) => {
    e.preventDefault();

    const Data = {
      Username: this.state.Username,
      City: this.state.City,
      Country: this.state.Country,
      DOB:this.state.DOB,
      ContactNo:this.state.ContactNo,
      Currentdate:this.state.Currentdate
    };

    trackPromise(
      instance.post("./results.json", Data).then((response) => {
        console.log(response);

        const results = [
          ...this.state.results,
          { ...Data, id: response.data.name },
        ];
        
        this.setState({
          results: results,
          Username: '',
          City: '',
          Country: '',
          ContactNo: '',
          Currentdate:date,
          modal:false
        });

        toast.success("You added a new entry!");
      })
    );
  };

  handleRemove = (id) => {
    instance.delete(`results/${id}.json`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      results: this.state.results.filter((result) => result.id !== id),
    });

    toast.error("Entry Removed!");
  };

  OpenModal = () => {
    this.setState({
      modal: true,
    });
  }
  handleModalOpen = (id) => {
    const result = this.state.results.find((result) => result.id === id);
    this.setState({
      Username: result.Username,
      City: result.City,
      Country: result.Country,
      DOB:result.DOB,
      ContactNo:result.ContactNo,
      id: result.id,
      modalIsOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      Username: '',
      City: '',
      Country: '',
      DOB:'',
      ContactNo:'',
      modalIsOpen: false,
    });
  };

  ModalClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();

    this.setState({
      modalIsOpen: false,
    });

    const Data = {
      Username: this.state.Username,
      City: this.state.City,
      Country: this.state.Country,
      DOB:this.state.DOB,
      ContactNo:this.state.ContactNo,
      Currentdate:this.state.Currentdate
    };

    trackPromise(
      instance.put(`results/${this.state.id}.json`, Data).then((response) => {
        console.log(response);

        instance.get("/results.json").then((response) => {
          const fetchedResults = [];

          for (let key in response.data) {
            fetchedResults.push({
              ...response.data[key],
              id: key,
            });
          }
          console.log('data-->'+JSON.stringify(fetchedResults))
          var slice = fetchedResults.slice(this.state.offset, this.state.offset + this.state.perPage)
        
    

          this.setState({
            pageCount: Math.ceil(fetchedResults.length / this.state.perPage),
            orgtableData :fetchedResults,
            results:slice,
            Username: '',
            City: '',
            Country: '',
            DOB:'',
            ContactNo:'',
            Currentdate:date
          });
          toast.info("Entry Updated!")
        });
      })
    );
  };

  render() {
    const { results, Username, City, Country,DOB,ContactNo,Currentdate ,modalIsOpen,modal } = this.state;
    return (
      <div style={{height:'800px'}}>
        <div className="container">
           
       <button style={{height:'50px',width:'150px',fontSize:'20px'}}
         onClick={ this.OpenModal}
       >
         Add New User
       </button>
       <hr />
       <Modal
         isOpen={modal}
         onRequestClose={this.ModalClose}
         style={{
           overlay: {
             backgroundColor: "rgba(255, 255, 255, 0.2)",
           },
           content: {
             border: "none",
             background: "white",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
           },
         }}
       >
           
       <ResultsAdd
         Username={Username}
         City={City}
         Country={Country}
         DOB={DOB}
         ContactNo={ContactNo}
         Currentdate={Currentdate}
         handleModal={this.OpenModal}
         handleChange={this.handleChange}
         handlePost={this.handlePost}
         handleModalClose={this.handleModalClose}
         ModalClose={this.ModalClose}

       /> 
     
     </Modal>
 
       <ResultsFetch
        Username={Username}
        City={City}
        Country={Country}
        DOB={DOB}
        ContactNo={ContactNo}
        Currentdate={Currentdate}
         modalIsOpen={modalIsOpen}
         results={results}
         handleRemove={this.handleRemove}
         handleChange={this.handleChange}
         handleModalOpen={this.handleModalOpen}
         handleModalClose={this.handleModalClose}
         handleUpdate={this.handleUpdate}
       />
      
       
   </div>
   <div style={{display:'flex',flexDirection:'row'}}>
   <ReactPaginate
                 
                 previousLabel={"prev"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 breakClassName={"break-me"}
                 pageCount={this.state.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"}/>

  
   </div>
      </div>
      
    );
  }
}

export default Results;
