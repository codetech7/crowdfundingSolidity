import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import  Layout  from "../../../component/Layout";

class ShowRequest extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        // console.log(props);

        // console.log(address);
        return {address};
    }

    render(){
        

        return(
            <Layout>

                <h3>Requests</h3>
                
                <Link route = {`/campaigns/${this.props.address}/requests/new`}><a><Button content = "Create a request" primary icon="add"/></a></Link> 
            </Layout>
                
                
            
            
            
        )
    }

}

export default ShowRequest;