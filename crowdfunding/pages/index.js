import React, { Component } from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from '../component/Layout';


class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();

    return { campaigns };
  }

  renderCampaign(){
    const list = this.props.campaigns.map(item=>{
       return {
            header: item,
            description: <a href = "https://www.google.com" target = "blank">This is an item in our list</a>,
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
      {this.renderCampaign()}
      <Button content ="Please Click Me" color = "green" icon = "circle add"/>
        </Layout>
      </div>
    );
  }
}

export default CampaignIndex;