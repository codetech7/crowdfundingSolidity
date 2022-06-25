import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import instance from '../ethereum/factory';
import web3 from '../ethereum/web3';


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

    onSubmitHandler = async (event)=>{
        event.preventDefault();
        
        this.setState({loading : true, error : false});
        try {
        const accounts = web3.eth.getAccounts();
        instance = campaign(this.props.address);
        await instance.methods.contribute().send({from:accounts[1], value: this.state.value});

        } catch (error) {
            this.setState({error: error.message});
        }
        this.setState({loading : false});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmitHandler} error = {!!this.state.error}>
                
                <Input label = "ether" labelPosition='right' floated='right' type = 'number'  value = {this.state.value} onChange = {this.onChangeHandler} />
                <Button content = "Donate" primary loading = {this.state.loading} floating= "right"/>
                
                <Message content = {this.state.error} error/>
                
            </Form>
        );
    }
}

export default ContributeForm;

