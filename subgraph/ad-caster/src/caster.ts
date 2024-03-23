import {
  AdCreated as AdCreatedEvent,
  ApprovalForAll as ApprovalForAllEvent,
  CampaignStarted as CampaignStartedEvent,
  CampaignStopped as CampaignStoppedEvent,
  PublisherAdded as PublisherAddedEvent,
  PublisherCreated as PublisherCreatedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  adShowed as adShowedEvent,
  fundsAdded as fundsAddedEvent,
  fundsRemoved as fundsRemovedEvent,
  leadGenerated as leadGeneratedEvent
} from "../generated/Caster/Caster"
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
} from "../generated/schema"

export function handleAdCreated(event: AdCreatedEvent): void {
  let entity = new AdCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id
  entity.totalFunds = event.params.totalFunds
  entity.AdURI = event.params.AdURI
  entity.Advertiser = event.params.Advertiser

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignStarted(event: CampaignStartedEvent): void {
  let entity = new CampaignStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignStopped(event: CampaignStoppedEvent): void {
  let entity = new CampaignStopped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePublisherAdded(event: PublisherAddedEvent): void {
  let entity = new PublisherAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id
  entity.publisher = event.params.publisher

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePublisherCreated(event: PublisherCreatedEvent): void {
  let entity = new PublisherCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.clickReward = event.params.clickReward
  entity.displayReward = event.params.displayReward
  entity.publisher = event.params.publisher
  entity.fid = event.params.fid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.Caster_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.Caster_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleadShowed(event: adShowedEvent): void {
  let entity = new adShowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Adid = event.params.Adid
  entity.publisher = event.params.publisher
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlefundsAdded(event: fundsAddedEvent): void {
  let entity = new fundsAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id
  entity.AddedAmount = event.params.AddedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlefundsRemoved(event: fundsRemovedEvent): void {
  let entity = new fundsRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id
  entity.RemovedAmount = event.params.RemovedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleleadGenerated(event: leadGeneratedEvent): void {
  let entity = new leadGenerated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Caster_id = event.params.id
  entity.publisher = event.params.publisher
  entity.ClickReward = event.params.ClickReward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
