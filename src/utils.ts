import { ByteArray, crypto, ethereum } from "@graphprotocol/graph-ts";
import { Account, Domain } from "../generated/schema";

export const ZERO_ADDRESS = ByteArray.fromHexString(
  "0x0000000000000000000000000000000000000000"
);

const CRYPTO_NODE = ByteArray.fromHexString(
  "0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f"
);

export function getParentDomain(
  node: string,
  event: ethereum.Event
): Domain | null {
  let domain = Domain.load(node);
  return domain === null && ByteArray.fromHexString(node).equals(CRYPTO_NODE)
    ? createCryptoTldDomain(node, event)
    : domain;
}

function createCryptoTldDomain(node: string, event: ethereum.Event): Domain {
  const accountId = "0x000000000000000000000000000000000000dead";
  let account = Account.load(accountId);
  if (account === null) {
    account = new Account(accountId);
    account.save();
  }

  const domain = new Domain(node);
  domain.name = "crypto";
  domain.registry = event.address;
  domain.owner = account.id;
  domain.subdomainCount = 0;
  domain.createdAt = event.block.timestamp;
  domain.save();

  return domain;
}

export function getParentNode(name: string): string | null {
  const labels = name.split(".").filter((element) => !!element);
  return labels.length > 1 ? namehash(labels.slice(1)) : null;
}

export function concat(a: ByteArray, b: ByteArray): ByteArray {
  let out = new Uint8Array(a.length + b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i];
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j];
  }
  // return out as ByteArray
  return changetype<ByteArray>(out);
}

export function namehash(labels: string[]): string {
  let node = ByteArray.fromHexString(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  for (let i = labels.length - 1; i >= 0; i--) {
    const labelSha = crypto.keccak256(ByteArray.fromUTF8(labels[i]));
    node = crypto.keccak256(concat(node, labelSha));
  }
  return node.toHexString();
}
