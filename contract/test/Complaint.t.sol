// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Complaint.sol";

contract ContractTest is Test {
    Complaint complaint;

    function setUp() public {
        complaint = new Complaint();
        registerComplaint();
    }

    // @user Register Complaint
    function registerComplaint() private {
        string memory name = "John Doe";
        string memory email = "johndoe@example.com";
        string memory addr = "123 Main St";
        uint256 mobile = 1234567890;
        string memory description = "Noisy neighbors";
        complaint.Register(name, email, addr, mobile, description);
    }
    // @dev test Register complaint
    function testRegister() public {
        assertEq(complaint.TotalCompalints(), 1, "Total Complaints Is 1");
    }
    // @dev test TotalResponded Complaints Number
    function testTotalRespondedComplaints() public {
        assertEq(complaint.TotalRespondedComplaints(), 0);
    }
    // @dev test Respond complaint
    function testRespond() public {
        registerComplaint();
        // respond to second complaint
        complaint.Respond(2,"Test Completed");
        // Responded Complaint == 1
        assertEq(complaint.TotalRespondedComplaints(), 1);
        // Id of lastResponded complaint == 2
        assertEq(complaint.LastRespondedComplaint(), 2);
    }
    function testUpdate() public {
        registerComplaint();
        complaint.UpdateStatus();
        assertEq(complaint.TotalStatusUpdate(),1);
        complaint.UpdateStatus();
        assertEq(complaint.TotalStatusUpdate(),1);
    }
}