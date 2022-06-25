import web3 from './web3';
import CampaignFactory from './build/CrowdfundingLauncher.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x07a7Faf2C6E1B741c282d2bBE03B267BaA98e69f'
);

export default instance;