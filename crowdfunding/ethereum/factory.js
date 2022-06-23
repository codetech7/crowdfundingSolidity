import factory from "./build/CrowdfundingLauncher";
import web3 from "./web3";

const contract = async ()=>{
    try{
    const contract2 = await new web3.eth.Contract(JSON.parse(factory.interface), 0x147459AAdA35e5cc34Fd103c6A2D895071d93Bb6);
    return contract2
    }catch(err){};
}

const factory1 = contract();
export default factory1;