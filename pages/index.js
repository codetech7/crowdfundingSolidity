import React, { Component } from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from '../component/Layout';
import {Link} from "../routes";
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";



class CampaignIndex extends Component {

  state = {
    minimumAmounts:''
  }

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();
    const minimumAmounts = await Promise.all(
      campaigns.map(campaign=>{
        
        return Campaign(campaign).methods.minimumAmount().call();
      }
      )
    )

    const noOfRequests = await Promise.all(
      campaigns.map((campaign) => {
       return Campaign(campaign).methods.getRequestCounts().call();
      })
    );
    return { campaigns, minimumAmounts, noOfRequests };
  }
 
  renderCampaign =  ()=>{
    // const list = await Promise.all(
      const list = this.props.campaigns.map( (item, index) =>{

       return {
            header: item,
            description: <Link route = {`/campaigns/${item}`}><a target = "blank">Minimum Possible Contribution: {web3.utils.fromWei(this.props.minimumAmounts[index], 'ether')} ether</a></Link>,
            fluid: true,
            meta: `Number of Request:${this.props.noOfRequests[index]}`
        }
    }
    
    );

    

   

    return <Card.Group items={list}/>
    }

    fetchMinimum = async ()=>{
      const campaign = this.props.campaigns;
      const campaigns = campaign.map((element) => {
        return Campaign(element);
      })
      const minimumAmounts = await Promise.all( 
        campaigns.map((element)=>{
        return element.methods.minimumAmount().call();
      }
      )
      )

      this.setState({minimumAmounts:2})
    }

    componentDidMount() {
      this.fetchMinimum();
      this.setState({minimumAmounts: '3'});
      console.log(this.props.minimumAmounts);
    }
  render() {
    // <link 
    //     async
    //     rel="stylesheet"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" 
    //     />
    return (
      <div>
        <Layout>
        <h3 style = {{floated:"left"}}>Charity Projects</h3>
        {/* <Button floated="right" content ="Please Click Me" color = "green" icon = "circle add"/> */}
        <Link route = "/campaigns/new-charity-project"><Button floated="right" content ="Create A Campaign" primary icon = "circle add"/></Link>
        {this.renderCampaign()}
     
        </Layout>
      </div>
    );
  }
}

export default CampaignIndex;