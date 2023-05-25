// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Complaint {
    address public owner;
    uint256 internal count; // Total number of complaints
    uint256 internal lastRespondedComplaint; // @admin responded complaint id
    uint256 internal respondedComplaints; // Total @admin responded complaints count
    uint256 internal totalStatusUpdates; // @user total status update complaints

    constructor() {
        owner = msg.sender;
        count = 1; // initial value for the compaints count
    }
    // modifier

    modifier OnlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    // events

    event ComplaintRegistered(address, string);
    event ComplaintUpdated(address);
    event ReponseAdded(address, uint256);

    // function for the user => Register complaint => Search complaint => Update Status
    struct complaint {
        uint256 id;
        string name;
        string email;
        string addr;
        uint256 mobile;
        address wallet;
        string description;
        uint256 time;
        string repsonse;
        uint256 repsonse_time;
        bool status;
    }

    mapping(address => complaint) internal userComplaint;
    mapping(uint256 => complaint) internal adminComplaint;
    // Register a complaint

    function Register(
        string calldata _name,
        string calldata _email,
        string calldata _addr,
        uint256 _mobile,
        string calldata _description
    ) public {
        userComplaint[msg.sender] =
            complaint(count, _name, _email, _addr, _mobile, msg.sender, _description, block.timestamp, "", 0, false);
        // upload data for admin
        adminComplaint[count] =
            complaint(count, _name, _email, _addr, _mobile, msg.sender, _description, block.timestamp, "", 0, false);
        count = count + 1;
        emit ComplaintRegistered(msg.sender, "Complaint Registerd");
    }
    // Search complaint by address

    function Search(address _address) public view returns (complaint memory) {
        return (userComplaint[_address]);
    }
    // Change complaint status

    function UpdateStatus() public {
        if (userComplaint[msg.sender].status == false) {
            ++totalStatusUpdates;
        }
        userComplaint[msg.sender].status = !userComplaint[msg.sender].status;
        uint256 ComplaintId = userComplaint[msg.sender].id;
        adminComplaint[ComplaintId].status = !adminComplaint[ComplaintId].status;
        emit ComplaintUpdated(msg.sender);
    }

    // <------------------ Admin function ----------------->
    //  get total compliants
    function TotalCompalints() public view returns (uint256) {
        return (count - 1);
    }
    // number of Responded complaints

    function TotalRespondedComplaints() public view returns (uint256) {
        return (respondedComplaints);
    }
    // get the complaint for admin

    function getComplaint(uint256 _count) public view returns (complaint memory) {
        return (adminComplaint[_count]);
    }
    // Respond to complaint

    function Respond(uint256 _count, string calldata _response) public OnlyOwner {
        require(_count >= 1 && _count <= count - 1, "Invalid Count");
        // update the admin mapping
        adminComplaint[_count].repsonse = _response;
        adminComplaint[_count].repsonse_time = block.timestamp;
        lastRespondedComplaint = _count;
        // update the user mapping
        address userAddress = adminComplaint[_count].wallet;
        userComplaint[userAddress].repsonse = _response;
        userComplaint[userAddress].repsonse_time = block.timestamp;
        ++respondedComplaints;
        emit ReponseAdded(userAddress, _count);
    }

    function LastRespondedComplaint() public view returns (uint256) {
        return (lastRespondedComplaint);
    }

    function TotalStatusUpdate() public view returns (uint256) {
        return (totalStatusUpdates);
    }

    function TransferOwner(address _newOwner) external OnlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}