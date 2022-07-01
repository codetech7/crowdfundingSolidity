const assert = require("assert");
const ganache = require("ganache-cli");
const { addAbortSignal } = require("stream");
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
    });

    it("can deploy other contracts", async () => {
      assert(crowdfunding.options.address);
    });

    it("restricted modifier works", async () => {
      try{
          crowdfunding.methods.createRequest("We want to flex", accounts[2], "1000000").send({from: accounts[1], gas: "1000000"});
          assert(false);
      }catch(err){
          assert.ok(err);
        }
    } );

    it("the person who called campaign launcher is registered as manager", async () => {
         const manager =  await crowdfunding.methods.manager().call();
         assert(accounts[0], manager);
    });

    it("the manager cant make himself a vendor", async () => {
        try{
      crowdfunding.methods.createRequest("TO make meera happy", accounts[0], '100').send({from:accounts[0], gas: "1000000" });
        assert(false);
    }catch(err){
            assert(err);
        }
    });

    it("someone who hasnt contributed can't vote", async () => {
      try{
          await crowdfunding.methods.createRequest("A sample project", accounts[2], "100").send({from: accounts[0], gas: "1000000"});
          await crowdfunding.methods.voteRequest(0).send({from: accounts[2], gas: "1000000"});
        assert(false);
      }catch(err){
          assert(err);
      }
    });

    it("someone who contributes can vote", async () => {
        await crowdfunding.methods.createRequest("A sample project", accounts[2], "100").send({from: accounts[0], gas: "1000000"});
           await  crowdfunding.methods.contribute().send({from: accounts[2], gas: "1000000"});
           await  crowdfunding.methods.voteRequest(0).send({from: accounts[2], gas: "1000000"});
    });

     it("the manager cant vote a request", async () => {
         try{
        await crowdfunding.methods.createRequest("A sample project", accounts[2], "100").send({from: accounts[0], gas: "1000000"});
        await  crowdfunding.methods.voteRequest(0).send({from: accounts[2], gas: "1000000"});
         }catch(err){
             assert(err);
         }
         });

    it("the manager cant contribute to a campaign", async () => {
        try{
        crowdfunding.methods.contribute().send({from: accounts[0], value:"3000", gas: "1000000" });
        assert(false);
    }catch(err){
        assert.ok(err);
    }
});
    it("end to end test", async () => {
        const initialBalance = web3.eth.getBalance(accounts[2]); //initial balance of the address we want to fund
        await crowdfunding.methods.createRequest("A sample project", accounts[2], "100").send({from: accounts[0], gas: "1000000"}); //manager creates a request
        await crowdfunding.methods.contribute().send({from: accounts[3], value: "10000000000", gas: "1000000"});
        try {
            await crowdfunding.methods.finalizeRequest(0).send({from:accounts[0], gas:"1000000"}); //trying to finalize a request that has not been voted. Should throw an error.
            assert(false);
        } catch (error) {
            assert(error);
        }
        await crowdfunding.methods.voteRequest(0).send({from: accounts[3] , gas: "1000000"});
        await crowdfunding.methods.finalizeRequest(0).send({from:accounts[0], gas:"1000000"});
      
    })
    

    it("adds a contributor to list of approvers", async () => {
        await crowdfunding.methods.contribute().send({from: accounts[1], value:"3000", gas: "1000000" });// contribute to campaign from certain account
        assert((await crowdfunding.methods.contributors(accounts[1]).call()) === true); //ensure that the contributor is added to the lsit of contributors:aprovers
    })


  
})