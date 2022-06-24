import {Form, Input, Button, Message} from 'semantic-ui-react';
import React, {Component} from 'react';
// import "semantic-ui-css/semantic.min.css";
import Layout from '../../component/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from "../../routes";

class SignUp extends Component{
    state = {
        minimumContribution : "",
        errorMessage: "",
        loading: false
    }

    submittal = async (event) => {
        event.preventDefault();
        this.setState({errorMessage:""});
        this.setState({loading:true});

        try {
            const accounts = await web3.eth.getAccounts();
        
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({from:accounts[0]});
            Router.pushRoute("/");
        } catch (error) {
            this.setState({errorMessage: error.message});
        }

       this.setState({loading:false});

     
   }

   render(){
    return (
    <Layout>
        <Form onSubmit={this.submittal} error = {!!this.state.errorMessage}>
            <Form.Field>
                <Input 
                label = "wei"
                labelPosition='right'
                value = {this.state.minimumContribution}

                onChange={(event)=>{
                    this.setState({minimumContribution: event.target.value});
                }}
                />
                
            </Form.Field>

            <Message error content={this.state.errorMessage}/>

            <Button primary loading={this.state.loading} content = "Create"/>
        </Form>
    </Layout>
   )
}
}

export default SignUp;