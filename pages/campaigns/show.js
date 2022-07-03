import React, {Component} from 'react';
import { Button, Card, Grid} from 'semantic-ui-react';
import campaign from '../../ethereum/campaign';
// import {Card} from "semantic-ui-react";
import Layout from '../../component/Layout';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../component/contributeForm';
import {Link} from '../../routes';


class Show extends Component {
   static async getInitialProps(props){
        console.log(props);
        const instance = campaign(props.query.address);
        const answer = await instance.methods.campaignSummary().call();
        console.log(answer);
        return {
            address: props.query.address,
            manager:answer[0],
            minimumAmount: answer[1],
            contributorCount: answer[2],
            balance: answer[3],
            timeCreated : answer[4],
            numberOfRequests : answer[5]
        };
    }

    renderCampaign(){
        
        const {manager, minimumAmount, contributorCount, balance, timeCreated, numberOfRequests} = this.props;
        const timing = timeCreated;
        const date = new Date(timing * 1000);
        const dateToReturn = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} UTC`
        const items = [
            
            {
                header: manager,
                meta: "Campaign creator",
                description: "This is the address of the person who created this campaign. View them on etherscan",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(minimumAmount, 'ether'),
                meta: "Least Amount Contributable(Ether)",
                description: "This is the minimum amount that can be contributed to this campaign",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: contributorCount,
                meta: "Number of Contributors",
                description: "This is the number of people who have contributed to this charity project since creation",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign balance(ether)",
                description: "This is the amount of money left to be used for various charity projects in this charity campaign",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: dateToReturn,
                meta: "Time created",
                description: "This is the time that the charity project was created",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: numberOfRequests,
                meta: "Amount of requests created",
                description: "This is the number of requests the manager has made to move funds out of this campaign",
                style: {overflowWrap: 'break-word'}
            },
        ]

        return (<Card.Group items ={items} />);
    }

    // renderRequestForm(){
    //     <Form>
    //         <Form.Field>
    //             <
    //             <Input></Input>
    //         </Form.Field>
    //     </Form>
    // }

    render(){
        return(
            
            <Layout>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width = {12}>
                                {this.renderCampaign()}
                            </Grid.Column>

                            <Grid.Column width = {4}>
                                <ContributeForm address={this.props.address} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Link route = {`/campaigns/${this.props.address}/requests`}>
                                    <a><Button primary >See Requests</Button></a>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                        
                    </Grid>
                
            </Layout>
            
        )
    }
  }
export default Show;