import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  NewURI as NewURIEvent,
  NewURIPrefix as NewURIPrefixEvent,
  RemoveReverse as RemoveReverseEvent,
  ResetRecords as ResetRecordsEvent,
  Set as SetEvent,
  SetReverse as SetReverseEvent,
  Transfer as TransferEvent,
} from "../generated/UNSRegistry/UNSRegistry";
import {
  Approval,
  ApprovalForAll,
  NewURI,
  NewURIPrefix,
  RemoveReverse,
  ResetRecords,
  Set,
  SetReverse,
  Transfer,
  Domain,
  Account,
  DomainResolver,
  Record,
} from "../generated/schema";
import { getParentNode } from "./utils";

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
    return;
  }

  const parentNode = getParentNode(event.params.uri);
  if (parentNode && !domain.parent) {
    const parentDomain = Domain.load(parentNode);
    if (parentDomain === null) {
      return;
    }

    parentDomain.subdomainCount = parentDomain.subdomainCount + 1;
    parentDomain.save();

    domain.parent = parentDomain.id;
  }
  domain.subdomainCount = 0;
  domain.name = event.params.uri;

  const resolverId = event.address.toHexString().concat(node);
  let resolver = DomainResolver.load(resolverId);
  if (resolver === null) {
    resolver = new DomainResolver(resolverId);
    resolver.domain = domain.id;
    resolver.address = event.address;
    resolver.save();
  }
  domain.resolver = resolver.id;
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

export function handleRemoveReverse(event: RemoveReverseEvent): void {
  const accountId = event.params.addr.toHexString();
  let account = Account.load(accountId);
  if (account === null) {
    account = new Account(accountId);
  }
  account.reverse = null;
  account.save();

  let entity = new RemoveReverse(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = account.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

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

  const recordId = resolver.id.concat(event.params.key);
  let record = Record.load(recordId);
  if (record === null) {
    record = new Record(recordId);
  }
  record.key = event.params.key;
  record.value = event.params.value;
  record.resolver = event.params.value ? resolver.id : null;
  record.save();

  let entity = new Set(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.resolver = resolver.id;
  entity.key = event.params.key;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetReverse(event: SetReverseEvent): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  if (domain === null) {
    return;
  }

  const accountId = event.params.addr.toHexString();
  let account = Account.load(accountId);
  if (account === null) {
    account = new Account(accountId);
  }
  account.reverse = domain.id;
  account.save();

  let entity = new SetReverse(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = account.id;
  entity.domain = domain.id;

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
