import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { NewKey, ResetRecords, Set } from "../generated/Resolver/Resolver"

export function createNewKeyEvent(
  tokenId: BigInt,
  keyIndex: string,
  key: string
): NewKey {
  let newKeyEvent = changetype<NewKey>(newMockEvent())

  newKeyEvent.parameters = new Array()

  newKeyEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  newKeyEvent.parameters.push(
    new ethereum.EventParam("keyIndex", ethereum.Value.fromString(keyIndex))
  )
  newKeyEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )

  return newKeyEvent
}

export function createResetRecordsEvent(tokenId: BigInt): ResetRecords {
  let resetRecordsEvent = changetype<ResetRecords>(newMockEvent())

  resetRecordsEvent.parameters = new Array()

  resetRecordsEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return resetRecordsEvent
}

export function createSetEvent(
  tokenId: BigInt,
  keyIndex: string,
  valueIndex: string,
  key: string,
  value: string
): Set {
  let setEvent = changetype<Set>(newMockEvent())

  setEvent.parameters = new Array()

  setEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  setEvent.parameters.push(
    new ethereum.EventParam("keyIndex", ethereum.Value.fromString(keyIndex))
  )
  setEvent.parameters.push(
    new ethereum.EventParam("valueIndex", ethereum.Value.fromString(valueIndex))
  )
  setEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  setEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )

  return setEvent
}
