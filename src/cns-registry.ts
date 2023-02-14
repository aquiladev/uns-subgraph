import { Bytes, ByteArray, ethereum, log } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  NewURI as NewURIEvent,
  NewURIPrefix as NewURIPrefixEvent,
  Resolve as ResolveEvent,
  Transfer as TransferEvent,
} from "../generated/CNSRegistry/CNSRegistry";
import {
  Account,
  Approval,
  ApprovalForAll,
  Domain,
  NewURI,
  NewURIPrefix,
  Resolve,
  DomainResolver,
  Transfer,
} from "../generated/schema";
import { getParentDomain, getParentNode } from "./utils";

export function handleApproval(event: ApprovalEvent): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    return;
  }

  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.domain = domain.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewURI(event: NewURIEvent): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    log.error(`Domain not found ${node}`, []);
    throw new Error("aaaa");
  }

  const parentNode = getParentNode(event.params.uri);
  if (parentNode && !domain.parent) {
    const parentDomain = getParentDomain(parentNode, event);
    if (parentDomain === null) {
      log.error(
        `Parent domain not found ${parentNode} [txHash: ${event.transaction.hash.toHexString()}]`,
        []
      );
      return;
    }

    parentDomain.subdomainCount = parentDomain.subdomainCount + 1;
    parentDomain.save();

    domain.parent = parentDomain.id;
  }
  domain.name = event.params.uri;
  domain.save();

  let entity = new NewURI(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.domain = domain.id;
  entity.uri = event.params.uri;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewURIPrefix(event: NewURIPrefixEvent): void {
  let entity = new NewURIPrefix(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.prefix = event.params.prefix;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleResolve(event: ResolveEvent): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    return;
  }

  const resolverId = event.params.to.toHexString().concat(node);
  let resolver = DomainResolver.load(resolverId);
  if (resolver === null) {
    resolver = new DomainResolver(resolverId);
    resolver.domain = domain.id;
    resolver.address = event.params.to;
    resolver.save();
  }
  domain.resolver = resolver.id;
  domain.save();

  let entity = new Resolve(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.domain = domain.id;
  entity.resolver = resolver.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  const node = event.params.tokenId.toHexString();
  let domain = Domain.load(node);
  if (domain === null) {
    domain = new Domain(node);
    domain.createdAt = event.block.timestamp;
    domain.subdomainCount = 0;
  }

  const accountId = event.params.to.toHexString();
  let account = Account.load(accountId);
  if (account === null) {
    account = new Account(accountId);
    account.save();
  }

  const fnSelector = Bytes.fromUint8Array(
    event.transaction.input.subarray(0, 4)
  ).toHexString();

  // CNSRegistry.setOwner               0xab3b87fe
  // DomainZoneController.mintChild     0x841cb28e
  if (fnSelector == "0xab3b87fe") {
    // skip reseting resolver
  } else if (fnSelector == "0x841cb28e") {
    const fnInput = event.transaction.input.subarray(4);
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
    const decoded = ethereum.decode(
      "(address,uint256,string,string[],string[])",
      tupleInputBytes
    );
    if (decoded) {
      const keys = decoded.toTuple()[3].toStringArray();
      if (!keys.length) {
        // reset resolver if no keys
        domain.resolver = null;
      }
    } else {
      log.error(`Imposible to decode tx ${event.transaction.input}`, [
        event.transaction.input.toHexString(),
      ]);
      throw new Error("aaaa");
    }
  } else {
    domain.resolver = null;
  }

  domain.registry = event.address;
  domain.owner = account.id;
  domain.save();

  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = account.id;
  entity.domain = domain.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
