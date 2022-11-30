import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { NewKey } from "../generated/schema"
import { NewKey as NewKeyEvent } from "../generated/Resolver/Resolver"
import { handleNewKey } from "../src/resolver"
import { createNewKeyEvent } from "./resolver-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenId = BigInt.fromI32(234)
    let keyIndex = "Example string value"
    let key = "Example string value"
    let newNewKeyEvent = createNewKeyEvent(tokenId, keyIndex, key)
    handleNewKey(newNewKeyEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewKey created and stored", () => {
    assert.entityCount("NewKey", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewKey",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "NewKey",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "keyIndex",
      "Example string value"
    )
    assert.fieldEquals(
      "NewKey",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "key",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
