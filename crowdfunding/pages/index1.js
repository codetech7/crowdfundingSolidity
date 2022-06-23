import React, { Component } from "react";
import factory from "../ethereum/factory";
import {Card} from "semantic-ui-react";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();

    return { campaigns };
  }

  render() {
    return <div>{this.props.campaigns[0]}</div>;
  }
}

export default CampaignIndex;