import React, {Component} from 'react';
import factory from '../ethereum/factory';

class DeployedProjects  extends Component {
    async ComponentDidMount(){

        const campaigns = await factory.methods.getDeployedContracts.call();
    }

    render(){
        return(
            <div><h1>Just To Make Our guys happy</h1></div>
            );
    }
}

export default DeployedProjects;