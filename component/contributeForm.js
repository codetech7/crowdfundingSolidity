import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import instance from '../ethereum/factory';
import web3 from '../ethereum/web3';
import {Router} from "../routes"


//function to render product and prices in HTML divs


class ContributeForm extends Component{
    state = {
        value:'',
        error: '',
        loading: false
    }

    onChangeHandler = (event) =>{
       
        this.setState({value : event.target.value});

    }

    onSubmitHandler = async (event)=>{ //runs when form is submitted
        event.preventDefault();
        
        this.setState({loading : true, error : false});
        const accounts = await web3.eth.getAccounts();
        try {
        
        const instance = campaign(this.props.address);
        await instance.methods.contribute().send({from:accounts[0], value: (web3.utils.toWei(this.state.value, "ether"))});
        this.setState({error:"Success"});

        } catch (error) {
            this.setState({error: error.message});
        }
        this.setState({loading : false, value:''});
        Router.replaceRoute(`/campaigns/${this.props.address}`);
    }

    render(){
        return (
            <Form onSubmit={this.onSubmitHandler} error = {!!this.state.error}> 
                
                <Input label = "ether" labelPosition='right' floated='right' type = 'number'  value = {this.state.value} onChange = {this.onChangeHandler} />
                <Button content = "Donate" style={{marginTop: "10px"}} primary loading = {this.state.loading} floated= "left"/>
                
                <Message content = {this.state.error} error/>
                
            </Form>
        );
    }
}

export default ContributeForm;

