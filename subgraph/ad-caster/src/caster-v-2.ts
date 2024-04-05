import {
  AdCreated as AdCreatedEvent,
  CampaignStarted as CampaignStartedEvent,
  CampaignStopped as CampaignStoppedEvent,
  PublisherAdded as PublisherAddedEvent,
  PublisherCreated as PublisherCreatedEvent,
  adShowed as adShowedEvent,
  frameCasted as frameCastedEvent,
  frameCreated as frameCreatedEvent,
  fundsAdded as fundsAddedEvent,
  fundsRemoved as fundsRemovedEvent,
  leadGenerated as leadGeneratedEvent,
} from "../generated/CasterV2/CasterV2";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Ad, Publisher, Frame } from "../generated/schema";

export function handleAdCreated(event: AdCreatedEvent): void {
  let ad = new Ad(event.params.id.toString());
  ad.AdId = event.params.id;
  ad.Advertiser = event.params.Advertiser;
  ad.TotalFunds = event.params.totalFunds;
  ad.CurrentFunds = event.params.totalFunds;
  ad.TotalClicks = new BigInt(0);
  ad.TotalViews = new BigInt(0);
  ad.Publishers = new Array<Bytes>();
  ad.AdData = event.params.AdURI;
  ad.AdStatus = false;
  ad.BlockNumber = event.block.number;
  ad.BlockTimestamp = event.block.timestamp;
  ad.TransactionHash = event.transaction.hash;
  ad.save();
}

export function handleframeCreated(event: frameCreatedEvent): void {
  let frame = new Frame(event.params.frameId);
  frame.FrameId = event.params.frameId;
  frame.FrameOwner = event.params.publisher;
  frame.AdId = event.params.AdId;
  frame.TotalClicks = new BigInt(0);
  frame.TotalViews = new BigInt(0);
  frame.CastedURL = "not-yet-casted";
  frame.TotalEarnings = new BigInt(0);
  frame.BlockNumber = event.block.number;
  frame.BlockTimestamp = event.block.timestamp;
  frame.TransactionHash = event.transaction.hash;
  frame.save();
}

export function handlePublisherCreated(event: PublisherCreatedEvent): void {
  let publisher = new Publisher(event.params.publisher.toString());
  publisher.PublisherFId = event.params.fid;
  publisher.Publisher = event.params.publisher;
  publisher.TotalEarnings = new BigInt(0);
  publisher.TotalLeadEarnings = new BigInt(0);
  publisher.TotalDisplayEarnings = new BigInt(0);
  publisher.UnClaimedEarnings = new BigInt(0);
  publisher.ClickReward = event.params.clickReward;
  publisher.ViewReward = event.params.displayReward;
  publisher.Ads = new Array<BigInt>();
  publisher.BlockNumber = event.block.number;
  publisher.BlockTimestamp = event.block.timestamp;
  publisher.TransactionHash = event.transaction.hash;
  publisher.save();
}

export function handleCampaignStarted(event: CampaignStartedEvent): void {
  let entity = Ad.load(event.params.id.toString());
  if (entity != null) {
    entity.AdStatus = true;
    entity.save();
  } else {
    return;
  }
}

export function handleCampaignStopped(event: CampaignStoppedEvent): void {
  let entity = Ad.load(event.params.id.toString());
  if (entity != null) {
    entity.AdStatus = true;
    entity.save();
  } else {
    return;
  }
}

export function handlePublisherAdded(event: PublisherAddedEvent): void {
  let ad = Ad.load(event.params.id.toString());
  let publisher = Publisher.load(event.params.publisher.toString());
  if (ad != null && publisher != null) {
    let publishers = ad.Publishers;
    publishers.push(event.params.publisher);
    ad.Publishers = publishers;
    ad.save();
    let ads = publisher.Ads;
    ads.push(event.params.id);
    publisher.Ads = ads;
    publisher.save();
  }
}

export function handleadShowed(event: adShowedEvent): void {
  let ad = Ad.load(event.params.Adid.toString());
  let frame = Frame.load(event.params.frameId);
  let publisher = Publisher.load(event.params.publisher.toString());
  if (ad != null && frame != null && publisher != null) {
    let inc = BigInt.fromString("1");
    let totalViews = ad.TotalViews;
    totalViews = totalViews.plus(inc);
    ad.TotalViews = totalViews;
    let currentFunds = ad.CurrentFunds;
    inc = publisher.ViewReward;
    currentFunds = currentFunds.minus(inc);
    ad.CurrentFunds = currentFunds;
    ad.save();
    let totalViewsFrame = frame.TotalViews;
    inc = BigInt.fromString("1");
    totalViewsFrame = totalViewsFrame.plus(inc);
    frame.TotalViews = totalViewsFrame;
    let earnings = frame.TotalEarnings;
    inc = publisher.ViewReward;
    earnings = earnings.plus(inc);
    frame.TotalEarnings = earnings;
    frame.save();
    let totalViewsPublisher = publisher.TotalDisplayEarnings;
    inc = publisher.ViewReward;
    totalViewsPublisher = totalViewsPublisher.plus(inc);
    publisher.TotalDisplayEarnings = totalViewsPublisher;
    let unClaimEarnings = publisher.UnClaimedEarnings;
    unClaimEarnings = unClaimEarnings.plus(inc);
    publisher.UnClaimedEarnings = unClaimEarnings;
    publisher.save();
  }
}

export function handleframeCasted(event: frameCastedEvent): void {
  let frame = Frame.load(event.params.frameId);
  if (frame != null) {
    frame.CastedURL = event.params.cast;
    frame.save();
  }
}

export function handlefundsAdded(event: fundsAddedEvent): void {
  let ad = Ad.load(event.params.id.toString());
  if (ad != null) {
    let CurrentFunds = ad.CurrentFunds;
    let totalFunds = ad.TotalFunds;
    let inc = event.params.AddedAmount;
    totalFunds = totalFunds.plus(inc);
    CurrentFunds = CurrentFunds.plus(inc);
    ad.CurrentFunds = CurrentFunds;
    ad.TotalFunds = totalFunds;
    ad.save();
  }
}

export function handlefundsRemoved(event: fundsRemovedEvent): void {
  let ad = Ad.load(event.params.id.toString());
  if (ad != null) {
    let CurrentFunds = ad.CurrentFunds;
    let totalFunds = ad.TotalFunds;
    let inc = event.params.RemovedAmount;
    totalFunds = totalFunds.minus(inc);
    CurrentFunds = CurrentFunds.minus(inc);
    ad.CurrentFunds = CurrentFunds;
    ad.TotalFunds = totalFunds;
    ad.save();
  }
}

export function handleleadGenerated(event: leadGeneratedEvent): void {
  let ad = Ad.load(event.params.id.toString());
  let frame = Frame.load(event.params.frameId);
  let publisher = Publisher.load(event.params.publisher.toString());
  if (ad != null && frame != null && publisher != null) {
    let inc = BigInt.fromString("1");
    let totalClicks = ad.TotalClicks;
    totalClicks = totalClicks.plus(inc);
    ad.TotalClicks = totalClicks;
    let currentFunds = ad.CurrentFunds;
    inc = publisher.ClickReward;
    currentFunds = currentFunds.minus(inc);
    ad.CurrentFunds = currentFunds;
    ad.save();
    let totalClicksFrame = frame.TotalClicks;
    inc = BigInt.fromString("1");
    totalClicksFrame = totalClicksFrame.plus(inc);
    frame.TotalClicks = totalClicksFrame;
    let earnings = frame.TotalEarnings;
    inc = publisher.ClickReward;
    earnings = earnings.plus(inc);
    frame.TotalEarnings = earnings;
    frame.save();
    let totalClicksPublisher = publisher.TotalEarnings;
    inc = publisher.ClickReward;
    totalClicksPublisher = totalClicksPublisher.plus(inc);
    publisher.TotalEarnings = totalClicksPublisher;
    let unClaimEarnings = publisher.UnClaimedEarnings;
    unClaimEarnings = unClaimEarnings.plus(inc);
    publisher.UnClaimedEarnings = unClaimEarnings;
    publisher.save();
  }
}
