pragma solidity ^0.4.17;

contract CrowdfundingLauncher{  //used to launch the crowndfunding campaigns

    uint numberOfContracts;
    address[] public deployedContracts;

    function createCampaign(uint newMinimum) public { //constructor that creates an instance of crowdfunding
        address deployedContractsList = new Crowdfunding(newMinimum, msg.sender);
        deployedContracts.push(deployedContractsList);
        numberOfContracts++;
    }

    function getDeployedContracts() public view returns(address[]) { //used to retrieve the list of crowndfund campaigns launched
        return deployedContracts;
    }

}

contract Crowdfunding {
    
    struct Request {        //define struct type for requests. Structs and arrays are  storage type by default.
        string description;
        uint amount;
        address vendor;
        uint voterCount;
        bool completed;
        mapping (address => bool) voters;
    }

    address public manager;
    uint public minimumAmount;
    mapping (address => bool) public contributors;
    uint public contributorCount;
    Request[] public requests;


     function Crowdfunding(uint minimum, address creator) public { //constructor function
        manager = creator;
        minimumAmount = minimum;

    }

    modifier restricted(){ //modifier to show that only manager can call a certain function
        require (msg.sender == manager);
        _;
    }

   

    function contribute() public payable {  //used to send money to the campaign. Only those who contribute can vote
        require(msg.value >= minimumAmount);
        require(!(msg.sender  == manager)); //ensures that the manager canot contribute;
        
        contributors[msg.sender] = true;
        contributorCount++;

    }


    function createRequest(string description, address vendor, uint amount ) restricted public { //should only be callable by the manager
       
       require(!(vendor == msg.sender)); //require that the creator is not sending money to himself.
        Request memory newRequest = Request({
            description : description,
            vendor: vendor,
            amount: amount,
            voterCount: 0,
            completed: false
        });

        requests.push(newRequest);
    }

    function voteRequest(uint index) public {
        require(contributors[msg.sender] == true); //only contributors can vote.
        require(!(msg.sender == manager));  //ascertain that a manager cannot vote
        
        
        Request storage currentRequest = requests[index];
        require(!(currentRequest.voters[msg.sender] == true)); //prevents multiple voting

        currentRequest.voterCount++;
        currentRequest.voters[msg.sender] = true; //registers voter on list of voters mapping for given request


    }

    function finalizeRequest(uint index) public restricted {
        Request storage currentRequest = requests[index];
        require(currentRequest.completed == false);
        require(currentRequest.voterCount > (contributorCount/2));


        currentRequest.vendor.transfer(currentRequest.amount);
        currentRequest.completed = true;




    }



    function campaignSummary() public view returns(address, uint, uint, uint, uint, uint){
        return(
            manager,
            minimumAmount,
            contributorCount,
            this.balance,
            block.timestamp,
            requests.length
        );
    }

    function getRequestCounts() public view returns(uint){
        return requests.length;
    }


}