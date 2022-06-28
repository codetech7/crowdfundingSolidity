import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3'
import Layout from '../../../component/Layout';


class CreateRequest extends Component{

    state = {
        amount: '',
        loading: false,
        description: '',
        recipient: '',
        errorMessage: ''
    }

    static async getInitialProps(props){
        const {address} = props.query;

        return {address};
    }

    submitHandler = async (event)=>{
        event.preventDefault();

        this.setState({loading:true, errorMessage: ''});
        try{
        const instance = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await instance.methods.createRequest(this.state.description, this.state.vendor, web3.utils.toWei(this.state.amount, 'ether')).send({from: accounts[0]}); //convert ether to wei before function call
    }catch(error){
        this.setState({errorMessage: error.message});
    }

        this.setState({loading:false});
    }

    render(){
        return (
            <Layout>
                <Form onSubmit={this.submitHandler} error={!!this.state.errorMessage} >
                    <Form.Field >
                        <label>Description</label>
                        <Input placeholder="What do you wnat to use the funds for?"  onChange = {(event)=>{this.setState({description: event.target.value})}} value = {this.state.description}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Recipeint</label>
                        <Input placeholder="Who are you sending the funds to?"  onChange = {(event)=>{this.setState({recipient:event.target.value})}} value = {this.state.recipient}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Amount in ether</label>
                        <Input placeholder={`How much is required? Max is `}  onChange = {(event)=>{this.setState({amount:event.target.value})}} value = {this.state.amount}/>
                        
                    </Form.Field>

                    <Message error content={this.state.errorMessage} />

                    <Button primary loading= {this.state.loading}>Create Request</Button>
                </Form>
            </Layout>
        )
    }
}

export default CreateRequest;