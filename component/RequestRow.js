import React, {Component} from 'react';
import {TableCell, TableRow, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign'
import { Router } from 'next/router';

class RequestRow extends Component{
    // static async getInitialProps(props){
    //     const campaign = await Campaign(props.query.address);
    //     const contributorCount = await campaign.methods.contributorCount().call();

    //     console.log(contributorCount);
    //     return { contributorCount};

    // }

    ApproveHandler = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
           await campaign.methods.voteRequest(this.props.id).send({from:accounts[0]});
            
        } catch (error) {
            console.log(error);
        }
   
    }

    FinalizeHandler = async ()=>{
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
           await campaign.methods.finalizeRequest(this.props.id).send({from:accounts[0]});
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        const {id, request, contributorCount} = this.props;

        return (
            
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{web3.utils.fromWei(request.amount,"ether")}</TableCell>
                <TableCell>{request.vendor}</TableCell>
                <TableCell>{request.voterCount}/{contributorCount}</TableCell>
                <TableCell><Button onClick={this.ApproveHandler} content = 'Approve' color = 'green' basic/></TableCell>
                <TableCell><Button onClick={this.FinalizeHandler} color = 'teal' content = 'Finalize' basic/></TableCell>

            </TableRow> 
            )
    }
}

export default RequestRow;