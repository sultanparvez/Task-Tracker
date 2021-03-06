import React, {Component} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
import {getUser} from "../API"

export default class CreateExercises extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            loading: false,
            users: []
        }
    }

    // componentDidMount() {
    //     getUser()
    //        .then(response =>{
    //            if(response.data.length>0){
    //                this.setState({
    //                        users: response.data.map(user => user.username),
    //                        username: response.data[0].username
    //                    }
    //                )
    //            }
    //        })
    // }
   async componentDidMount() {
        this.setState({
            loading: true
        })
        let response = await getUser();
                  if(response.data.length>0){
                      this.setState({
                              users: response.data.map(user => user.username),
                              username: response.data[0].username
                          }
                      )
                  }
       this.setState({
           loading: false
       })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(res => console.log(res.data))
        console.log(exercise);
        window.location = "/";
    }

    render() {
        return (
            <>
                {(this.state.loading)?(
                    <h2>Loading ...</h2>
                ) :(
                    <div>
                        <h3> New Task Log</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className=" mb-3">
                                <label>Username:</label>
                                <select ref="user-input" required className="form-control" value={this.state.username} on
                                        onChange={this.onChangeUsername}>
                                    {
                                        this.state.users.map(function (user) {
                                            return <option key={user} value={user}>{user}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Description:</label>
                                <input type="text" className="form-control" placeholder="e.g: Who this"  value={this.state.description} on
                                       onChange={this.onChangeDescription}/>
                            </div>
                            <div className="mb-3">
                                <label>Duration:(in minute)</label>
                                <input type="text" className="form-control" value={this.state.duration} on
                                       onChange={this.onChangeDuration}/>
                            </div>
                            <div className= "mb-3">
                                <label>Date </label>
                                <div>
                                    <DatePicker selected={this.state.date} onChange ={this.onChangeDate} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <input type="submit" value="Create Task Log" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>

                )}
            </>

        )
    }
}