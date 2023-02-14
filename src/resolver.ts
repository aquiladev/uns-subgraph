import {
  Address,
  BigInt,
  Bytes,
  TypedMap,
  ByteArray,
  ethereum,
  crypto,
  log,
} from "@graphprotocol/graph-ts";
import {
  ResetRecords as ResetRecordsEvent,
  Set as SetEvent,
  Set1 as Set1Event,
} from "../generated/Resolver/Resolver";
import {
  Domain,
  DomainResolver,
  Record,
  ResetRecords,
  Set,
} from "../generated/schema";

export function handleResetRecords(event: ResetRecordsEvent): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    return;
  }

  const resolverId = event.address.toHexString().concat(node);
  let resolver = DomainResolver.load(resolverId);
  if (resolver === null) {
    resolver = new DomainResolver(resolverId);
    resolver.address = event.address;
    resolver.domain = domain.id;
    resolver.save();
  }

  const records = resolver.records;
  if (records) {
    for (let i = 0; i <= records.length; i++) {
      const recordId = (records as string[])[i];
      const record = Record.load(recordId);
      if (record == null) continue;
      record.resolver = null;
      record.save();
    }
  }

  let entity = new ResetRecords(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.resolver = resolver.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSet(event: SetEvent): void {
  _handleSet(
    event.params.tokenId,
    event.params.key,
    event.params.value,
    event.address,
    event.block.number,
    event.block.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

// @dev Legacy Set event
export function handleSet1(event: Set1Event): void {
  const map = _getKeyMap(event.transaction.input);
  if (!map.isSet(event.params.key)) {
    log.error(
      `Indexed key ${event.params.key.toHexString()} not found [txHash: ${event.transaction.hash.toHexString()}]`,
      []
    );
  }
  _handleSet(
    event.params.tokenId,
    map.get(event.params.key)!,
    event.params.value,
    event.address,
    event.block.number,
    event.block.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

function _handleSet(
  tokenId: BigInt,
  key: string,
  value: string,
  evtAddress: Address,
  evtBlockNumber: BigInt,
  evtBlockTimestamp: BigInt,
  evtTxHash: Bytes,
  evtLogIndex: BigInt
): void {
  const node = tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    return;
  }

  const resolverId = evtAddress.toHexString().concat(node);
  let resolver = DomainResolver.load(resolverId);
  if (resolver === null) {
    resolver = new DomainResolver(resolverId);
    resolver.address = evtAddress;
    resolver.domain = domain.id;
    resolver.save();
  }

  const recordId = resolver.id.concat(key);
  let record = Record.load(recordId);
  if (record === null) {
    record = new Record(recordId);
  }
  record.key = key;
  record.value = value;
  record.resolver = value ? resolver.id : null;
  record.save();

  let entity = new Set(evtTxHash.concatI32(evtLogIndex.toI32()));
  entity.resolver = resolver.id;
  entity.key = key;
  entity.value = value;

  entity.blockNumber = evtBlockNumber;
  entity.blockTimestamp = evtBlockTimestamp;
  entity.transactionHash = evtTxHash;

  entity.save();
}

// mintSLDToDefaultResolver(address to, string label, string[] keys, string[] values)       0x3d7989fe
// set(string key, string value, uint256 tokenId)                                           0x47c81699
// setFor(string key, string value, uint256 tokenId, bytes signature)                       0xc5974073
// preconfigure(string[] keys, string[] values, uint256 tokenId)                            0xe837ae74
// setMany(string[] keys, string[] values, uint256 tokenId)                                 0xce92b33e
// setManyFor(string[] keys, string[] values, uint256 tokenId, bytes signature)             0x8f69c188
// setValidation(string username, string signature, uint256 tokenId, uint256 requestId)     0xf615dcd8
function _getKeyMap(input: Bytes): TypedMap<Bytes, string> {
  const map = new TypedMap<Bytes, string>();
  const fnSelector = Bytes.fromUint8Array(input.subarray(0, 4)).toHexString();
  const fnInput = input.subarray(4);
  const tuplePrefix = ByteArray.fromHexString(
    "0x0000000000000000000000000000000000000000000000000000000000000020"
  );

  const functionInputAsTuple = new Uint8Array(
    tuplePrefix.length + fnInput.length
  );

  // concat prefix & original input
  functionInputAsTuple.set(tuplePrefix, 0);
  functionInputAsTuple.set(fnInput, tuplePrefix.length);
  const tupleInputBytes = Bytes.fromUint8Array(functionInputAsTuple);

  if (fnSelector == "0x3d7989fe") {
    const decoded = ethereum.decode(
      "(address,string,string[],string[])",
      tupleInputBytes
    );
    if (decoded) {
      const keySs = decoded.toTuple()[2].toStringArray();
      for (let i = 0; i < keySs.length; i++) {
        const keyB = Bytes.fromByteArray(
          crypto.keccak256(ByteArray.fromUTF8(keySs[i]))
        );
        if (!map.isSet(keyB)) {
          map.set(keyB, keySs[i]);
        }
      }
    }
  } else if (fnSelector == "0x47c81699") {
    const decoded = ethereum.decode("(string,string,uint256)", tupleInputBytes);
    if (decoded) {
      const keyS = decoded.toTuple()[0].toString();
      const keyB = Bytes.fromByteArray(
        crypto.keccak256(ByteArray.fromUTF8(keyS))
      );
      if (!map.isSet(keyB)) {
        map.set(keyB, keyS);
      }
    }
  } else if (fnSelector == "0xc5974073") {
    const decoded = ethereum.decode(
      "(string,string,uint256,bytes)",
      tupleInputBytes
    );
    if (decoded) {
      const keyS = decoded.toTuple()[0].toString();
      const keyB = Bytes.fromByteArray(
        crypto.keccak256(ByteArray.fromUTF8(keyS))
      );
      if (!map.isSet(keyB)) {
        map.set(keyB, keyS);
      }
    }
  } else if (fnSelector == "0xe837ae74" || fnSelector == "0xce92b33e") {
    const decoded = ethereum.decode(
      "(string[],string[],uint256)",
      tupleInputBytes
    );
    if (decoded) {
      const keySs = decoded.toTuple()[0].toStringArray();
      for (let i = 0; i < keySs.length; i++) {
        const keyB = Bytes.fromByteArray(
          crypto.keccak256(ByteArray.fromUTF8(keySs[i]))
        );
        if (!map.isSet(keyB)) {
          map.set(keyB, keySs[i]);
        }
      }
    }
  } else if (fnSelector == "0x8f69c188") {
    const decoded = ethereum.decode(
      "(string[],string[],uint256,bytes)",
      tupleInputBytes
    );
    if (decoded) {
      const keySs = decoded.toTuple()[0].toStringArray();
      for (let i = 0; i < keySs.length; i++) {
        const keyB = Bytes.fromByteArray(
          crypto.keccak256(ByteArray.fromUTF8(keySs[i]))
        );
        if (!map.isSet(keyB)) {
          map.set(keyB, keySs[i]);
        }
      }
    }
  } else if (fnSelector == "0xf615dcd8") {
    map.set(
      Bytes.fromHexString(
        "0x2bb42d0566a0b73fd6dce72c8837da23faa3b7efa351cdbaaa952a721473d7b5"
      ),
      "social.twitter.username"
    );
    map.set(
      Bytes.fromHexString(
        "0x8fe3e830ca61528424690232b8d3b3e3153981d5e735c8e7cff7848bc4bd03bd"
      ),
      "validation.social.twitter.username"
    );
  } else {
    log.error(`=== Unknown function selector ${fnSelector}`, []);
  }

  return map;
}
