import React, { PureComponent } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { responsiveFontSizes } from "@material-ui/core";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      carName: "",
      carType: "",
      color: "",
      details: [],
      newData: "",
      table: false,
    };
  }

  componentDidMount = () => {
    this.getBlogPost();
  };

  handleManufacturer = (event) => {
    this.setState({
      manufacturer: event.target.value,
    });
  };

  handleName = (event) => {
    this.setState({
      carName: event.target.value,
    });
  };

  handleType = (event) => {
    this.setState({
      carType: event.target.value,
    });
  };

  handleColor = (event) => {
    this.setState({
      color: event.target.value,
    });
  };

  saveData = () => {
    const data = {
      manufacturer: this.state.manufacturer,
      carName: this.state.carName,
      carType: this.state.carType,
      color: this.state.color,
    };

    axios({
      method: "POST",
      url: "http://localhost:4000/app/carDetails",
      data: data,
    })
      .then(function (response) {
        console.log(response);
        this.setState({
          manufacturer: "",
          carName: "",
          carType: "",
          color: "",
        });
      })
      .catch(function (error) {
        setTimeout(function () {
          console.log(error);
        });
      });
  };

  getBlogPost = () => {
    axios
      .get("/app")
      .then((response) => {
        const data = response.data;
        this.setState({
          details: data,
        });
        console.log("data recived");
      })
      .catch(() => {
        alert("error in reciving data");
      });
  };

  handleClick = () => {
    this.setState({
      table: true,
    });
  };

  setData = (e) => {
    this.setState({
      newData: e.target.value,
    });
  };

  search = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toLowerCase().index(this.state.newData.toLowerCase()) > -1
      )
    );
  };

  displayTable = () => {
    const { details, newData } = this.state;
    let data = [];
    data.push(
      <div>
        <div>
          <input
            type="text"
            value={newData}
            onChange={(e) => {
              this.setData(e);
            }}
          />
        </div>
        <div>
          <table data={this.search(details)} />
        </div>
      </div>
    );
    return data;
  };

  prepareLayout = () => {
    return (
      <div class="root">
        <Paper class="paperRoot" square>
          <Grid item xs={12} class="mainDiv">
            <h3 class="header">
              Enter car details /{" "}
              <Button
                id="collectionMenu"
                onClick={(event) => this.handleClick(event)}
              >
                {"View Car Details"}
              </Button>
            </h3>
            <div class="data">
              {" Manufacturer "}
              <TextField
                id="outlined-margin-dense"
                placeholder="Enter Manufacturer"
                class="textField"
                variant="outlined"
                onBlur={this.handleManufacturer}
              />
            </div>
            <div class="data">
              {" Name of the car"}
              <TextField
                id="outlined-margin-dense"
                placeholder="Enter Name of the car"
                class="textField"
                variant="outlined"
                onBlur={this.handleName}
              />
            </div>
            <div class="data">
              {" Type of the car "}
              <TextField
                id="outlined-margin-dense"
                placeholder="Enter Type of the car"
                class="textField"
                variant="outlined"
                onBlur={this.handleType}
              />
            </div>
            <div class="data">
              {" Car Color "}
              <TextField
                id="outlined-margin-dense"
                placeholder="Enter Color"
                class="textField"
                variant="outlined"
                onBlur={this.handleColor}
              />
            </div>
            <Grid item xs={12} class="addBtn">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.saveData()}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  render() {
    return (
      <div>{this.state.table ? this.displayTable() : this.prepareLayout()}</div>
    );
  }
}

export default App;
