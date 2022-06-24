import React, { Component } from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from '../component/Layout';
import {Link} from "../routes";



class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();

    return { campaigns };
  }

  renderCampaign(){
    const list = this.props.campaigns.map( item =>{
       return {
            header: item,
            description: <Link route = {`/campaigns/${item}`}><a target = "blank">This is an item in our list</a></Link>,
            fluid: true
        }
    }
    );

    return <Card.Group items={list}/>
    }
  render() {
    <link 
        async
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" 
        />
    return (
      <div>
        <Layout>
        <h3 style = {{floated:"left"}}>Charity Projects</h3>
        {/* <Button floated="right" content ="Please Click Me" color = "green" icon = "circle add"/> */}
        <Button floated="right" content ="Please Click Me" color = "green" icon = "circle add"/>
        {this.renderCampaign()}
     
        </Layout>
      </div>
    );
  }
}

export default CampaignIndex;