import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  UNSRegistryApproval,
  UNSRegistryApprovalForAll,
  Initialized,
  UNSRegistryNewKey,
  UNSRegistryNewURI,
  UNSRegistryNewURIPrefix,
  RemoveReverse,
  UNSRegistryResetRecords,
  UNSRegistrySet,
  SetReverse,
  UNSRegistryTransfer,
  Upgraded,
  WithdrawnBatch
} from "../generated/UNSRegistry/UNSRegistry"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createUNSRegistryApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): UNSRegistryApproval {
  let unsRegistryApprovalEvent = changetype<UNSRegistryApproval>(newMockEvent())

  unsRegistryApprovalEvent.parameters = new Array()

  unsRegistryApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  unsRegistryApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  unsRegistryApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return unsRegistryApprovalEvent
}

export function createUNSRegistryApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): UNSRegistryApprovalForAll {
  let unsRegistryApprovalForAllEvent = changetype<UNSRegistryApprovalForAll>(
    newMockEvent()
  )

  unsRegistryApprovalForAllEvent.parameters = new Array()

  unsRegistryApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  unsRegistryApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  unsRegistryApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return unsRegistryApprovalForAllEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createUNSRegistryNewKeyEvent(
  tokenId: BigInt,
  keyIndex: string,
  key: string
): UNSRegistryNewKey {
  let unsRegistryNewKeyEvent = changetype<UNSRegistryNewKey>(newMockEvent())

  unsRegistryNewKeyEvent.parameters = new Array()

  unsRegistryNewKeyEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  unsRegistryNewKeyEvent.parameters.push(
    new ethereum.EventParam("keyIndex", ethereum.Value.fromString(keyIndex))
  )
  unsRegistryNewKeyEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )

  return unsRegistryNewKeyEvent
}

export function createUNSRegistryNewURIEvent(
  tokenId: BigInt,
  uri: string
): UNSRegistryNewURI {
  let unsRegistryNewUriEvent = changetype<UNSRegistryNewURI>(newMockEvent())

  unsRegistryNewUriEvent.parameters = new Array()

  unsRegistryNewUriEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  unsRegistryNewUriEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return unsRegistryNewUriEvent
}

export function createUNSRegistryNewURIPrefixEvent(
  prefix: string
): UNSRegistryNewURIPrefix {
  let unsRegistryNewUriPrefixEvent = changetype<UNSRegistryNewURIPrefix>(
    newMockEvent()
  )

  unsRegistryNewUriPrefixEvent.parameters = new Array()

  unsRegistryNewUriPrefixEvent.parameters.push(
    new ethereum.EventParam("prefix", ethereum.Value.fromString(prefix))
  )

  return unsRegistryNewUriPrefixEvent
}

export function createRemoveReverseEvent(addr: Address): RemoveReverse {
  let removeReverseEvent = changetype<RemoveReverse>(newMockEvent())

  removeReverseEvent.parameters = new Array()

  removeReverseEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return removeReverseEvent
}

export function createUNSRegistryResetRecordsEvent(
  tokenId: BigInt
): UNSRegistryResetRecords {
  let unsRegistryResetRecordsEvent = changetype<UNSRegistryResetRecords>(
    newMockEvent()
  )

  unsRegistryResetRecordsEvent.parameters = new Array()

  unsRegistryResetRecordsEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return unsRegistryResetRecordsEvent
}

export function createUNSRegistrySetEvent(
  tokenId: BigInt,
  keyIndex: string,
  valueIndex: string,
  key: string,
  value: string
): UNSRegistrySet {
  let unsRegistrySetEvent = changetype<UNSRegistrySet>(newMockEvent())

  unsRegistrySetEvent.parameters = new Array()

  unsRegistrySetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  unsRegistrySetEvent.parameters.push(
    new ethereum.EventParam("keyIndex", ethereum.Value.fromString(keyIndex))
  )
  unsRegistrySetEvent.parameters.push(
    new ethereum.EventParam("valueIndex", ethereum.Value.fromString(valueIndex))
  )
  unsRegistrySetEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  unsRegistrySetEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )

  return unsRegistrySetEvent
}

export function createSetReverseEvent(
  addr: Address,
  tokenId: BigInt
): SetReverse {
  let setReverseEvent = changetype<SetReverse>(newMockEvent())

  setReverseEvent.parameters = new Array()

  setReverseEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  setReverseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return setReverseEvent
}

export function createUNSRegistryTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): UNSRegistryTransfer {
  let unsRegistryTransferEvent = changetype<UNSRegistryTransfer>(newMockEvent())

  unsRegistryTransferEvent.parameters = new Array()

  unsRegistryTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  unsRegistryTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  unsRegistryTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return unsRegistryTransferEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createWithdrawnBatchEvent(
  user: Address,
  tokenIds: Array<BigInt>
): WithdrawnBatch {
  let withdrawnBatchEvent = changetype<WithdrawnBatch>(newMockEvent())

  withdrawnBatchEvent.parameters = new Array()

  withdrawnBatchEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawnBatchEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIds",
      ethereum.Value.fromUnsignedBigIntArray(tokenIds)
    )
  )

  return withdrawnBatchEvent
}
