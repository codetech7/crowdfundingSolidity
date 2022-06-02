const assert = require("assert");
const ganache = require("ganache-cli");
const { DefaultDeserializer } = require("v8");
const Web3 = require("web3");
const Crowdfunding = require("../ethereum/build/Crowdfunding.json");
const {interface, bytecode} = require("../ethereum/build/CrowdfundingLauncher.json");

const web3 = new Web3(ganache.provider());
let accounts;
let crowdfundinglauncher;
let crowdfunding;
let address;


beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    crowdfundinglauncher = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: 1000000});

    await crowdfundinglauncher.methods.createCampaign(0).send({from: accounts[0], gas: 1000000});

    [address] = await crowdfundinglauncher.methods.getDeployedContracts().call();
    
    crowdfunding = new web3.eth.Contract(JSON.parse(Crowdfunding.interface), address);
} )

describe("crowdlauncher working", async () => {
    it("can be deployed ", async () => {
      assert(crowdfundinglauncher.options.address);
    })

    it("can deploy other contracts", async () => {
      assert(crowdfunding.options.address);
    })

    it("restricted modifier works", async () => {
      try{
          crowdfunding.methods.createRequest("We want to flex", accounts[2], "1000000").send({from: accounts[1], gas: "1000000"});
          assert(false);
      }catch(err){
          assert.ok(err);
        }
    } )


  
})