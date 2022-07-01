import React, {Component} from 'react';
import {TableCell, TableRow, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign'

class RequestRow extends Component{
    // static async getInitialProps(props){
    //     const campaign = await Campaign(props.query.address);
    //     const contributorCount = await campaign.methods.contributorCount().call();

    //     console.log(contributorCount);
    //     return { contributorCount};
    // }

    render(){
        const {id, request, contributorCount} = this.props;

        return (
            
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{web3.utils.fromWei(request.amount,"ether")}</TableCell>
                <TableCell>{request.vendor}</TableCell>
                <TableCell>{request.voterCount}/{contributorCount}</TableCell>
                <TableCell><Button content = 'Approve' color = 'green' basic/></TableCell>
                <TableCell><Button color = 'teal' content = 'Finalize' basic/></TableCell>

            </TableRow> 
            )
    }
}

export default RequestRow;