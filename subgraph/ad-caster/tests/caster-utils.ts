import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AdCreated,
  ApprovalForAll,
  CampaignStarted,
  CampaignStopped,
  PublisherAdded,
  PublisherCreated,
  TransferBatch,
  TransferSingle,
  URI,
  adShowed,
  fundsAdded,
  fundsRemoved,
  leadGenerated
} from "../generated/Caster/Caster"

export function createAdCreatedEvent(
  id: BigInt,
  totalFunds: BigInt,
  AdURI: string,
  Advertiser: Address
): AdCreated {
  let adCreatedEvent = changetype<AdCreated>(newMockEvent())

  adCreatedEvent.parameters = new Array()

  adCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalFunds",
      ethereum.Value.fromUnsignedBigInt(totalFunds)
    )
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("AdURI", ethereum.Value.fromString(AdURI))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "Advertiser",
      ethereum.Value.fromAddress(Advertiser)
    )
  )

  return adCreatedEvent
}

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCampaignStartedEvent(id: BigInt): CampaignStarted {
  let campaignStartedEvent = changetype<CampaignStarted>(newMockEvent())

  campaignStartedEvent.parameters = new Array()

  campaignStartedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return campaignStartedEvent
}

export function createCampaignStoppedEvent(id: BigInt): CampaignStopped {
  let campaignStoppedEvent = changetype<CampaignStopped>(newMockEvent())

  campaignStoppedEvent.parameters = new Array()

  campaignStoppedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return campaignStoppedEvent
}

export function createPublisherAddedEvent(
  id: BigInt,
  publisher: Address
): PublisherAdded {
  let publisherAddedEvent = changetype<PublisherAdded>(newMockEvent())

  publisherAddedEvent.parameters = new Array()

  publisherAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  publisherAddedEvent.parameters.push(
    new ethereum.EventParam("publisher", ethereum.Value.fromAddress(publisher))
  )

  return publisherAddedEvent
}

export function createPublisherCreatedEvent(
  clickReward: BigInt,
  displayReward: BigInt,
  publisher: Address,
  fid: string
): PublisherCreated {
  let publisherCreatedEvent = changetype<PublisherCreated>(newMockEvent())

  publisherCreatedEvent.parameters = new Array()

  publisherCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "clickReward",
      ethereum.Value.fromUnsignedBigInt(clickReward)
    )
  )
  publisherCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "displayReward",
      ethereum.Value.fromUnsignedBigInt(displayReward)
    )
  )
  publisherCreatedEvent.parameters.push(
    new ethereum.EventParam("publisher", ethereum.Value.fromAddress(publisher))
  )
  publisherCreatedEvent.parameters.push(
    new ethereum.EventParam("fid", ethereum.Value.fromString(fid))
  )

  return publisherCreatedEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createadShowedEvent(
  Adid: BigInt,
  publisher: Address,
  reward: BigInt
): adShowed {
  let adShowedEvent = changetype<adShowed>(newMockEvent())

  adShowedEvent.parameters = new Array()

  adShowedEvent.parameters.push(
    new ethereum.EventParam("Adid", ethereum.Value.fromUnsignedBigInt(Adid))
  )
  adShowedEvent.parameters.push(
    new ethereum.EventParam("publisher", ethereum.Value.fromAddress(publisher))
  )
  adShowedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return adShowedEvent
}

export function createfundsAddedEvent(
  id: BigInt,
  AddedAmount: BigInt
): fundsAdded {
  let fundsAddedEvent = changetype<fundsAdded>(newMockEvent())

  fundsAddedEvent.parameters = new Array()

  fundsAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  fundsAddedEvent.parameters.push(
    new ethereum.EventParam(
      "AddedAmount",
      ethereum.Value.fromUnsignedBigInt(AddedAmount)
    )
  )

  return fundsAddedEvent
}

export function createfundsRemovedEvent(
  id: BigInt,
  RemovedAmount: BigInt
): fundsRemoved {
  let fundsRemovedEvent = changetype<fundsRemoved>(newMockEvent())

  fundsRemovedEvent.parameters = new Array()

  fundsRemovedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  fundsRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "RemovedAmount",
      ethereum.Value.fromUnsignedBigInt(RemovedAmount)
    )
  )

  return fundsRemovedEvent
}

export function createleadGeneratedEvent(
  id: BigInt,
  publisher: Address,
  ClickReward: BigInt
): leadGenerated {
  let leadGeneratedEvent = changetype<leadGenerated>(newMockEvent())

  leadGeneratedEvent.parameters = new Array()

  leadGeneratedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  leadGeneratedEvent.parameters.push(
    new ethereum.EventParam("publisher", ethereum.Value.fromAddress(publisher))
  )
  leadGeneratedEvent.parameters.push(
    new ethereum.EventParam(
      "ClickReward",
      ethereum.Value.fromUnsignedBigInt(ClickReward)
    )
  )

  return leadGeneratedEvent
}
