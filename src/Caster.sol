//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "./Token.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

enum CampaignStatus {
    CREATED,
    RUNNING,
    STOPPED
}

struct Ad {
    uint256 totalFunds;
    uint256 currentFunds;
    uint256 clicks;
    uint256 views;
    address advertiser;
}

struct Publisher {
    string fid;
    address publisher;
    uint256 leadReward;
    uint256 showReward;
    uint256 totalLeadEarnings;
    uint256 totalShowEarnings;
    uint256 unclaimedEarnings;
    uint256[] AdIds;
}

struct Frames {
    string frameId; //frameID is the URI of the frame
    uint AdId;
    uint256 clicks;
    uint256 views;
    address publisher;
    string cast;
}

contract Caster is Token, ERC1155Holder {
    address public owner;
    uint256 public nativeTokenId;
    uint256 public AdIds;

    mapping(uint256 => Ad) public IdToCampaign;
    mapping(address => Publisher) public addressToPublisher;
    mapping(uint256 => CampaignStatus) public campaignStatus;
    mapping(address => uint256[]) public AdIdsListByAdvertiser;
    mapping(uint256 => mapping(address => bool)) IsPublisherAdded;
    mapping(address => bool) public IsPublisher;
    mapping(string => Frames) public frameIdToFrame;

    event AdCreated(
        uint256 id,
        uint256 totalFunds,
        string AdURI,
        address Advertiser
    );

    event leadGenerated(
        uint256 id,
        address publisher,
        uint256 ClickReward,
        string frameId
    );
    event CampaignStarted(uint256 id);
    event CampaignStopped(uint256 id);
    event PublisherAdded(uint256 id, address publisher);

    event fundsAdded(uint256 id, uint256 AddedAmount);

    event fundsRemoved(uint256 id, uint256 RemovedAmount);

    event PublisherCreated(
        uint256 clickReward,
        uint256 displayReward,
        address publisher,
        string fid
    );

    event adShowed(
        uint256 Adid,
        address publisher,
        uint reward,
        string frameId
    );
    event frameCreated(string frameId, address publisher, uint AdId);
    event frameCasted(string frameId, string cast);

    constructor() {
        nativeTokenId = 0;
        AdIds = 0;
        owner = msg.sender;
    }

    function getAdTokens() external {
        _mint(msg.sender, 0, 100, "");
    }

    function createFrame(string memory _frameId, uint _adId) public {
        //this function creates a frame
        require(
            IsPublisher[msg.sender] == true,
            "You are not a publisher, please register as a publisher"
        );
        frameIdToFrame[_frameId] = Frames(
            _frameId,
            _adId,
            0,
            0,
            msg.sender,
            ""
        );
        emit frameCreated(_frameId, msg.sender, _adId);
    }

    function castFrame(string memory _frameId, string memory _cast) public {
        //this function casts the frame
        require(
            frameIdToFrame[_frameId].publisher == msg.sender,
            "You are not the publisher of this frame"
        );
        frameIdToFrame[_frameId].cast = _cast;
        emit frameCasted(_frameId, _cast);
    }

    function createAd(string memory _AdURI, uint256 _totalFunds) public {
        // we will mint every ad as an NFT
        require(
            balanceOf(msg.sender, nativeTokenId) >= _totalFunds,
            "not Enough funds to start the campaign"
        );
        uint256 id = AdIds + 1;
        AdIds = id;
        _mint(msg.sender, id, 1, "");
        _setURI(id, _AdURI);
        IdToCampaign[id] = Ad(_totalFunds, _totalFunds, 0, 0, msg.sender);
        campaignStatus[id] = CampaignStatus.CREATED;
        AdIdsListByAdvertiser[msg.sender].push(id);
        emit AdCreated(id, _totalFunds, _AdURI, msg.sender);
    }

    function startCampaign(uint256 Id) public {
        //this function starts the campaign
        require(
            campaignStatus[Id] != CampaignStatus.RUNNING,
            "No campaign found"
        );
        require(
            IdToCampaign[Id].advertiser == msg.sender,
            "You are not the Advertiser"
        );
        require(
            IdToCampaign[Id].totalFunds <= balanceOf(msg.sender, nativeTokenId),
            "Insufficient funds"
        );
        campaignStatus[Id] = CampaignStatus.RUNNING;
        _safeTransferFrom(
            msg.sender,
            address(this),
            nativeTokenId,
            IdToCampaign[Id].totalFunds,
            ""
        );
        emit CampaignStarted(Id);
    }

    function stopCampaign(uint256 _id) public {
        //this function stops the campaign
        require(
            IdToCampaign[_id].advertiser == msg.sender,
            "You are not the Advertiser"
        );
        require(
            campaignStatus[_id] == CampaignStatus.RUNNING,
            "Campaign is not running"
        );
        campaignStatus[_id] = CampaignStatus.STOPPED;

        emit CampaignStopped(_id);
    }

    function addFundsToCampaign(uint256 _id, uint256 amount) public {
        //this function adds funds to the Ad
        require(
            IdToCampaign[_id].advertiser == msg.sender,
            "only advertiser can add funds"
        );
        require(
            balanceOf(msg.sender, nativeTokenId) >= amount,
            "Insufficient Funds"
        );
        require(
            campaignStatus[_id] == CampaignStatus.RUNNING,
            "Campaign is not running"
        );
        IdToCampaign[_id].totalFunds += amount;
        IdToCampaign[_id].currentFunds += amount;
        emit fundsAdded(_id, amount);
    }

    function removeFundsFromCampaign(uint256 _id, uint256 amount) public {
        //this function removes funds from the Ad
        require(
            msg.sender == IdToCampaign[_id].advertiser,
            "only Advertiser can remove funds from the campaign"
        );
        require(
            IdToCampaign[_id].currentFunds >= amount,
            "Current funds are less than the amount"
        );
        IdToCampaign[_id].currentFunds -= amount;
        IdToCampaign[_id].totalFunds -= amount;
        emit fundsRemoved(_id, amount);
    }

    function createPublisher(
        uint256 _clickReward,
        uint256 _displayReward,
        string memory _fid
    ) public {
        //this function makes the user a publisher
        require(
            IsPublisher[msg.sender] == false,
            "You are already a publisher"
        );
        addressToPublisher[msg.sender] = Publisher(
            _fid,
            msg.sender,
            _clickReward,
            _displayReward,
            0,
            0,
            0,
            new uint256[](0)
        );
        IsPublisher[msg.sender] = true;
        emit PublisherCreated(_clickReward, _displayReward, msg.sender, _fid);
    }

    function SubscribetoPublisher(uint256 _id, address _publisher) public {
        //this function adds the publisher to the list of  a particular Ad publishers
        require(
            campaignStatus[_id] == CampaignStatus.RUNNING,
            "Campaign is not running"
        );
        require(IsPublisher[_publisher] == true, "Publisher is not registered");
        require(
            IsPublisherAdded[_id][_publisher] == false,
            "Publisher is already added"
        );
        require(
            IdToCampaign[_id].currentFunds >=
                addressToPublisher[_publisher].leadReward +
                    addressToPublisher[_publisher].showReward,
            "Insufficient funds"
        );
        IsPublisherAdded[_id][_publisher] = true;
        addressToPublisher[_publisher].AdIds.push(_id);
        emit PublisherAdded(_id, _publisher);
    }

    function serveAd(
        uint256 _id,
        address _publisher,
        string memory _frameId
    ) public returns (string memory adURI) {
        //this function serves the Ad to the user

        IdToCampaign[_id].currentFunds -= addressToPublisher[_publisher]
            .showReward;
        IdToCampaign[_id].views += 1;
        addressToPublisher[_publisher].totalShowEarnings += addressToPublisher[
            _publisher
        ].showReward;
        addressToPublisher[_publisher].unclaimedEarnings += addressToPublisher[
            _publisher
        ].showReward;
        emit adShowed(
            _id,
            _publisher,
            addressToPublisher[_publisher].showReward,
            _frameId
        );
        frameIdToFrame[_frameId].views += 1;
        return uri(_id);
    }

    function transferClickReward(
        uint256 _adID,
        address _publisher,
        string memory _frameId
    ) public {
        //this function transfers the click reward to the publisher
        IdToCampaign[_adID].totalFunds -= addressToPublisher[_publisher]
            .leadReward;
        IdToCampaign[_adID].currentFunds -= addressToPublisher[_publisher]
            .leadReward;
        addressToPublisher[_publisher].totalLeadEarnings += addressToPublisher[
            _publisher
        ].leadReward;
        addressToPublisher[_publisher].unclaimedEarnings += addressToPublisher[
            _publisher
        ].leadReward;
        IdToCampaign[_adID].clicks += 1;
        frameIdToFrame[_frameId].clicks += 1;
        emit leadGenerated(
            _adID,
            _publisher,
            addressToPublisher[_publisher].leadReward,
            _frameId
        );
    }

    function claimEarnings() public {
        //this function allows the publisher to claim their earnings
        require(IsPublisher[msg.sender] == true, "You are not a publisher");
        require(
            addressToPublisher[msg.sender].unclaimedEarnings > 0,
            "No earnings to claim"
        );
        _safeTransferFrom(
            address(this),
            msg.sender,
            nativeTokenId,
            addressToPublisher[msg.sender].unclaimedEarnings,
            ""
        );
        addressToPublisher[msg.sender].unclaimedEarnings = 0;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
