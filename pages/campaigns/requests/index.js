import React, {Component} from 'react';
import {Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from 'semantic-ui-react';
import {Link} from '../../../routes';
import  Layout  from "../../../component/Layout";
import RequestRow from '../../../component/RequestRow';
import Campaign from '../../../ethereum/campaign';


class ShowRequest extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = await Campaign(address);
        const requestCount = await campaign.methods.getRequestCounts().call();
        const contributorCount = await campaign.methods.contributorCount().call();
        console.log(contributorCount);
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index)=>{
                return campaign.methods.requests(index).call();
            })
        );
        
        return {address, requests, contributorCount};
    }

    renderRow(){  //an helper function to return return row wth some props
        
        //create a variable that contains requestRow components for each element that is present in the requests array
       const requestRows = this.props.requests.map((element, index)=>{
            return (
                <RequestRow request = {element} key= {index} id={index} contributorCount = {this.props.contributorCount} address = {this.props.address}/>
                )
        })

        return requestRows;
       
    }

    render(){


        return(
            <Layout>

                <h3>Requests</h3>
                
                <Link route = {`/campaigns/${this.props.address}/requests/new`}><a><Button floated='right' style = {{marginBottom: "10px"}} content = "Create a request" primary icon="add"/></a></Link> 

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                ID
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Description
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Amount(Ether)
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Recipient
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Approvals
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Approve(Contributors Only)
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Finalize(Manager Only)
                            </TableHeaderCell>

                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {this.renderRow()}
                    </TableBody>
                </Table>
            </Layout>
                
                
            
            
            
        )
    }

}

export default ShowRequest;