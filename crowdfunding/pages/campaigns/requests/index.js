import React, {Component} from 'react';
import {Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from 'semantic-ui-react';
import {Link} from '../../../routes';
import  Layout  from "../../../component/Layout";
import RequestRow from '../../../component/RequestRow';


class ShowRequest extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        // console.log(props);

        // console.log(address);
        return {address};
    }

    renderRow(){
        
    }

    render(){


        return(
            <Layout>

                <h3>Requests</h3>
                
                <Link route = {`/campaigns/${this.props.address}/requests/new`}><a><Button content = "Create a request" primary icon="add"/></a></Link> 

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
                                Amount
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Recipient
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
                        <TableRow><RequestRow/></TableRow>
                    </TableBody>
                </Table>
            </Layout>
                
                
            
            
            
        )
    }

}

export default ShowRequest;