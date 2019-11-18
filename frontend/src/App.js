import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import DisplayProduct from "./components/DisplayProduct";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "./components/SearchBar";

class App extends Component {
  state = {
    products: [],
    searchTerm: "",
    message: ""
  };

  // set state after component has rendered
  componentDidMount = () => {
    this.getAllData();
  };

  // Get all data
  getAllData = () => {
    axios
      .get("http://localhost:5000/products")
      .then(result => {
        // console.log(this.state.products);
        this.setState({
          products: result.data,
          message: ""
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // For search bar, to look for data with same phrase
  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.checkSearchTerm();
      }
    );
  };

  // Callback function for handleChange, call findData with phrase is searchTerm isn't empty, if it is empty(cleared), then call getAllData to display it
  checkSearchTerm = () => {
    var { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.findData(searchTerm);
    } else {
      this.getAllData();
    }
  };

  findData = searchTerm => {
    axios.get("http://localhost:5000/products/" + searchTerm).then(result => {
      if (result.data.msg) {
        this.setState({
          message: result.data.msg
        });
      } else {
        this.setState({
          products: result.data
        });
      }
    });
  };

  // Render components
  render() {
    var { products, message } = this.state;
    return (
      <Container>
        <Row>
          <SearchBar handleChange={this.handleChange} />
        </Row>

        {message === "" ? (
          <Row className="mt-4 d-flex flex-column ">
            {products.length > 0 ? (
              <DisplayProduct products={products} />
            ) : (
              "Nothing"
            )}
          </Row>
        ) : (
          <h1>{message}</h1>
        )}
      </Container>
    );
  }
}

export default App;
