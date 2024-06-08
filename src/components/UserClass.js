import React from 'react';

class UserClass extends React.Component {
    constructor(props) {
        super(props); // Calls the constructor of React.Component with props

        // console.log(props); // Now you can safely access this.props here if needed

        this.state={
            count:0,
            userInfo:{
                name:"default",
                location:"default"
            }
        }

        console.log(this.props.num + "constructor called")
    }


    async componentDidMount(){
        console.log(this.props.num + "componentDidMount is called")

        const data=await fetch("https://api.github.com/users/PonnadaKiran")
        const json= await data.json();

        this.setState({
            userInfo:json
        })
    }

    componentDidUpdate(){
        console.log("component did update is called");
    }

    componentWillUnmount(){
        console.log("component will unmount is called")
    }

    render() {
        // Destructuring props to extract name and location
        // const { name, location } = this.props;
        const {count}=this.state;
        const {name, location}=this.state.userInfo;

        console.log(this.props.num + "render method called")

        return (
            <div className="user-card">
                <h1>{count}</h1>
                <h2>Name : {name}</h2>
                <button onClick={()=>{
                    this.setState({
                        count:this.state.count+1
                    })
                }}>Click-Increase</button>
                <h3>Location : {location}</h3>
                <h4>Contact : @kiranNov28</h4>
            </div>
        );
    }
}

export default UserClass;
