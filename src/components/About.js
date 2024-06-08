import {Component} from 'react'
import User from './User';
import UserClass from './UserClass'

class About extends Component{

  // constructor(props){
  //   super(props);
  //   console.log("parent constructor is called")
  // }

  // componentDidMount(){
  //   console.log("parent componentDIdMount id called")
  // }

  render(){

    // console.log("parent render method is called")

    return (
      <div>
          <h1>this is about page</h1>
          {/* <User name={"kiran palkuru"} location={"Heidelberg"}/> */}
          <UserClass name={"kiran classy component"} location={"Bengaluru"} num={"1st child "}/>
          {/* <UserClass name={"kiran classy component"} location={"Bengaluru"} num={"2nd child "}/> */}
      </div>
    )
  }
}

export default About