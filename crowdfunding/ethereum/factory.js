import web3 from './web3';
import CampaignFactory from './build/CrowdfundingLauncher.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x147459AAdA35e5cc34Fd103c6A2D895071d93Bb6'
);

export default instance;