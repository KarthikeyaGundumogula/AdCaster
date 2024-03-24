import {
  AdCreated as AdCreatedEvent,
  ApprovalForAll as ApprovalForAllEvent,
  CampaignStarted as CampaignStartedEvent,
  CampaignStopped as CampaignStoppedEvent,
  PublisherAdded as PublisherAddedEvent,
  PublisherCreated as PublisherCreatedEvent,
  adShowed as adShowedEvent,
  fundsAdded as fundsAddedEvent,
  fundsRemoved as fundsRemovedEvent,
  leadGenerated as leadGeneratedEvent,
  frameCreated as frameCreatedEvent,
} from "../generated/Caster/Caster";
import { Ad, Frame, Publisher } from "../generated/schema";

export function handleAdCreated(event: AdCreatedEvent): void {}

export function handleframeCreated(event: frameCreatedEvent): void {}


export function handleCampaignStarted(event: CampaignStartedEvent): void {}

export function handleCampaignStopped(event: CampaignStoppedEvent): void {}

export function handlePublisherAdded(event: PublisherAddedEvent): void {}

export function handlePublisherCreated(event: PublisherCreatedEvent): void {}

export function handleadShowed(event: adShowedEvent): void {}

export function handlefundsAdded(event: fundsAddedEvent): void {}

export function handlefundsRemoved(event: fundsRemovedEvent): void {}

export function handleleadGenerated(event: leadGeneratedEvent): void {}
