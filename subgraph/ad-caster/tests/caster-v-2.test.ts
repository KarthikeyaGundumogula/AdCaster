import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AdCreated } from "../generated/schema"
import { AdCreated as AdCreatedEvent } from "../generated/CasterV2/CasterV2"
import { handleAdCreated } from "../src/caster-v-2"
import { createAdCreatedEvent } from "./caster-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let totalFunds = BigInt.fromI32(234)
    let AdURI = "Example string value"
    let Advertiser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdCreatedEvent = createAdCreatedEvent(
      id,
      totalFunds,
      AdURI,
      Advertiser
    )
    handleAdCreated(newAdCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdCreated created and stored", () => {
    assert.entityCount("AdCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalFunds",
      "234"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "AdURI",
      "Example string value"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "Advertiser",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
