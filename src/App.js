import React from "react";
import web3 from "./web3";                         
import lottery from "./lottery";

class App extends React.Component {

  state = {                                                                                                            // Here we are defining our "App" Component 'state' property and initializing it to empty string.
    Manager_Address : "",
    Players_Addresses : [],
    Contract_Balance : "",
    Winner : "",
    Value : "",
    Message : ""
  };                                                              
  

  async componentDidMount(){
      const manager = await lottery.methods.manager().call();                                                          // "manager()" is the function created by solidity compiler itself, as it is a public storage variable.
      const players = await lottery.methods.getPlayers().call();
      const balance_wei = await web3.eth.getBalance(lottery.options.address);
      const balance  = await web3.utils.fromWei(balance_wei);
      this.setState({                                                                                                  // Here we are modifying the 'state' hence re-rendering occurs.
        Manager_Address : manager, 
        Players_Addresses : players,
        Contract_Balance : balance
      });                      
    }  

    onInputChange = (event) => {                                                                                        // This is our event handler.
      this.setState({Value : event.target.value});                                                                      // We are setting 'value' of our component equal to the amount user have entered.
    }
    
    onSubmit = async (event) => {                                                                                                                                   // This Event Handler is responsible for making our user enter into the lottery.
      event.preventDefault();                                                                                           // It will create a transaction on behaf of our user , ether specified by user will be sent to our contract.
      const accounts = await web3.eth.getAccounts();    
      this.setState({Message : "Waiting on transaction success.........."});
      await lottery.methods.enter().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.Value, 'ether')
      });   
      this.setState({Message : "You have been entered!!!"}); 
    }

    onClick = async () => {
      const accounts = await web3.eth.getAccounts();
      this.setState({Message : "Waiting on transaction success.........."});
      await lottery.methods.pickWinner().send({
        from : accounts[0]
      });
      this.setState({Winner : await lottery.methods.winner().call()});
      this.setState({Message : "A winner has been picked!!! "}); 

      
    }

    render() {                                                                                                   // We already know each react component has a render() method in which JSX is returned.
  
      console.log(`Replaced Web3 Instance : ${web3.version}`);                                                   // You can see which version of web3 our application is using.
      console.log(`Our Application is connected to : ${web3.eth.getAccounts().then(console.log)}`);                                // Promise Object is returned, here we can see the "Metamask Account" address with which our application is connected. 
  
      return (                                                                   
        <div>
          <h2> Lottery Contract</h2>
          <p>                                                                                                     {/* From here we are actually using our contract, when rendering occurs information of our contract is displayed on our react app.  */}
            Contract Manager : {this.state.Manager_Address}
            <br></br>
            Number of Players : {this.state.Players_Addresses.length}
            <br></br>
            Current Contract Balance : {this.state.Contract_Balance}
            </p>       
  
            <hr/>
  
            <form onSubmit = { this.onSubmit}>                                                                     {/* "onSubmit" is the property of the "<form></form> were we can attach "Event Handler" which will be called after submitting the form. */}
              <h4>Want to try your luck?</h4>
              <div>
                <label>Amount of ether to enter</label>
                <input
                  value = { this.state.value}
                  onChange = { this.onInputChange }                                                                // "onChange" is the property of "<input/>" tag were we can attach event handlers.
                />
              </div>
              
              <button>Enter</button>
  
            </form>

            <hr />

            <h4>Ready to pick a winner?</h4>
            <button onClick = {this.onClick}>Pick a winner</button>                                                {/* On click is the property of the button were we can attach "Event Handler" which will be called if someone clicks the button. */}

            <hr />
  
            <h1>{this.state.Message}</h1>                                                                          {/* This will allow user to see current state of transaction. */}
            
            <hr />                                                         
            
            <h1>Winner : {this.state.Winner}</h1>
        </div>
      );
  
    }
}
export default App;


/* NOTES :- 
1] We cannot use async/await inside render() method of our "React Components".
2] "componentDidMount()" method :- i) It is a lifecycle method.
                                   ii) If we define it on our component then it gets automatically called when our componnet renders.

*/
