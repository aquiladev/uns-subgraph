// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewKey extends ethereum.Event {
  get params(): NewKey__Params {
    return new NewKey__Params(this);
  }
}

export class NewKey__Params {
  _event: NewKey;

  constructor(event: NewKey) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get keyIndex(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get key(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class ResetRecords extends ethereum.Event {
  get params(): ResetRecords__Params {
    return new ResetRecords__Params(this);
  }
}

export class ResetRecords__Params {
  _event: ResetRecords;

  constructor(event: ResetRecords) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Set extends ethereum.Event {
  get params(): Set__Params {
    return new Set__Params(this);
  }
}

export class Set__Params {
  _event: Set;

  constructor(event: Set) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get keyIndex(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get valueIndex(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get key(): string {
    return this._event.parameters[3].value.toString();
  }

  get value(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class Set1 extends ethereum.Event {
  get params(): Set1__Params {
    return new Set1__Params(this);
  }
}

export class Set1__Params {
  _event: Set1;

  constructor(event: Set1) {
    this._event = event;
  }

  get preset(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get key(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get value(): string {
    return this._event.parameters[2].value.toString();
  }

  get tokenId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Resolver__getByHashResult {
  value0: string;
  value1: string;

  constructor(value0: string, value1: string) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    return map;
  }

  getKey(): string {
    return this.value0;
  }

  getValue(): string {
    return this.value1;
  }
}

export class Resolver__getManyByHashResult {
  value0: Array<string>;
  value1: Array<string>;

  constructor(value0: Array<string>, value1: Array<string>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromStringArray(this.value0));
    map.set("value1", ethereum.Value.fromStringArray(this.value1));
    return map;
  }

  getKeys(): Array<string> {
    return this.value0;
  }

  getValues(): Array<string> {
    return this.value1;
  }
}

export class Resolver extends ethereum.SmartContract {
  static bind(address: Address): Resolver {
    return new Resolver("Resolver", address);
  }

  get(key: string, tokenId: BigInt): string {
    let result = super.call("get", "get(string,uint256):(string)", [
      ethereum.Value.fromString(key),
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_get(key: string, tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("get", "get(string,uint256):(string)", [
      ethereum.Value.fromString(key),
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getByHash(keyHash: BigInt, tokenId: BigInt): Resolver__getByHashResult {
    let result = super.call(
      "getByHash",
      "getByHash(uint256,uint256):(string,string)",
      [
        ethereum.Value.fromUnsignedBigInt(keyHash),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return new Resolver__getByHashResult(
      result[0].toString(),
      result[1].toString()
    );
  }

  try_getByHash(
    keyHash: BigInt,
    tokenId: BigInt
  ): ethereum.CallResult<Resolver__getByHashResult> {
    let result = super.tryCall(
      "getByHash",
      "getByHash(uint256,uint256):(string,string)",
      [
        ethereum.Value.fromUnsignedBigInt(keyHash),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Resolver__getByHashResult(value[0].toString(), value[1].toString())
    );
  }

  getMany(keys: Array<string>, tokenId: BigInt): Array<string> {
    let result = super.call("getMany", "getMany(string[],uint256):(string[])", [
      ethereum.Value.fromStringArray(keys),
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toStringArray();
  }

  try_getMany(
    keys: Array<string>,
    tokenId: BigInt
  ): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getMany",
      "getMany(string[],uint256):(string[])",
      [
        ethereum.Value.fromStringArray(keys),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getManyByHash(
    keyHashes: Array<BigInt>,
    tokenId: BigInt
  ): Resolver__getManyByHashResult {
    let result = super.call(
      "getManyByHash",
      "getManyByHash(uint256[],uint256):(string[],string[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(keyHashes),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return new Resolver__getManyByHashResult(
      result[0].toStringArray(),
      result[1].toStringArray()
    );
  }

  try_getManyByHash(
    keyHashes: Array<BigInt>,
    tokenId: BigInt
  ): ethereum.CallResult<Resolver__getManyByHashResult> {
    let result = super.tryCall(
      "getManyByHash",
      "getManyByHash(uint256[],uint256):(string[],string[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(keyHashes),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Resolver__getManyByHashResult(
        value[0].toStringArray(),
        value[1].toStringArray()
      )
    );
  }

  hashToKey(keyHash: BigInt): string {
    let result = super.call("hashToKey", "hashToKey(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(keyHash)
    ]);

    return result[0].toString();
  }

  try_hashToKey(keyHash: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("hashToKey", "hashToKey(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(keyHash)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  hashesToKeys(hashes: Array<BigInt>): Array<string> {
    let result = super.call(
      "hashesToKeys",
      "hashesToKeys(uint256[]):(string[])",
      [ethereum.Value.fromUnsignedBigIntArray(hashes)]
    );

    return result[0].toStringArray();
  }

  try_hashesToKeys(hashes: Array<BigInt>): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "hashesToKeys",
      "hashesToKeys(uint256[]):(string[])",
      [ethereum.Value.fromUnsignedBigIntArray(hashes)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  nonceOf(tokenId: BigInt): BigInt {
    let result = super.call("nonceOf", "nonceOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toBigInt();
  }

  try_nonceOf(tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("nonceOf", "nonceOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  registry(): Address {
    let result = super.call("registry", "registry():(address)", []);

    return result[0].toAddress();
  }

  try_registry(): ethereum.CallResult<Address> {
    let result = super.tryCall("registry", "registry():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get registry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get mintingController(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class PreconfigureCall extends ethereum.Call {
  get inputs(): PreconfigureCall__Inputs {
    return new PreconfigureCall__Inputs(this);
  }

  get outputs(): PreconfigureCall__Outputs {
    return new PreconfigureCall__Outputs(this);
  }
}

export class PreconfigureCall__Inputs {
  _call: PreconfigureCall;

  constructor(call: PreconfigureCall) {
    this._call = call;
  }

  get keys(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get values(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class PreconfigureCall__Outputs {
  _call: PreconfigureCall;

  constructor(call: PreconfigureCall) {
    this._call = call;
  }
}

export class ReconfigureCall extends ethereum.Call {
  get inputs(): ReconfigureCall__Inputs {
    return new ReconfigureCall__Inputs(this);
  }

  get outputs(): ReconfigureCall__Outputs {
    return new ReconfigureCall__Outputs(this);
  }
}

export class ReconfigureCall__Inputs {
  _call: ReconfigureCall;

  constructor(call: ReconfigureCall) {
    this._call = call;
  }

  get keys(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get values(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ReconfigureCall__Outputs {
  _call: ReconfigureCall;

  constructor(call: ReconfigureCall) {
    this._call = call;
  }
}

export class ReconfigureForCall extends ethereum.Call {
  get inputs(): ReconfigureForCall__Inputs {
    return new ReconfigureForCall__Inputs(this);
  }

  get outputs(): ReconfigureForCall__Outputs {
    return new ReconfigureForCall__Outputs(this);
  }
}

export class ReconfigureForCall__Inputs {
  _call: ReconfigureForCall;

  constructor(call: ReconfigureForCall) {
    this._call = call;
  }

  get keys(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get values(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get signature(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ReconfigureForCall__Outputs {
  _call: ReconfigureForCall;

  constructor(call: ReconfigureForCall) {
    this._call = call;
  }
}

export class ResetCall extends ethereum.Call {
  get inputs(): ResetCall__Inputs {
    return new ResetCall__Inputs(this);
  }

  get outputs(): ResetCall__Outputs {
    return new ResetCall__Outputs(this);
  }
}

export class ResetCall__Inputs {
  _call: ResetCall;

  constructor(call: ResetCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ResetCall__Outputs {
  _call: ResetCall;

  constructor(call: ResetCall) {
    this._call = call;
  }
}

export class ResetForCall extends ethereum.Call {
  get inputs(): ResetForCall__Inputs {
    return new ResetForCall__Inputs(this);
  }

  get outputs(): ResetForCall__Outputs {
    return new ResetForCall__Outputs(this);
  }
}

export class ResetForCall__Inputs {
  _call: ResetForCall;

  constructor(call: ResetForCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get signature(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ResetForCall__Outputs {
  _call: ResetForCall;

  constructor(call: ResetForCall) {
    this._call = call;
  }
}

export class SetCall extends ethereum.Call {
  get inputs(): SetCall__Inputs {
    return new SetCall__Inputs(this);
  }

  get outputs(): SetCall__Outputs {
    return new SetCall__Outputs(this);
  }
}

export class SetCall__Inputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }

  get key(): string {
    return this._call.inputValues[0].value.toString();
  }

  get value(): string {
    return this._call.inputValues[1].value.toString();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetCall__Outputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }
}

export class SetForCall extends ethereum.Call {
  get inputs(): SetForCall__Inputs {
    return new SetForCall__Inputs(this);
  }

  get outputs(): SetForCall__Outputs {
    return new SetForCall__Outputs(this);
  }
}

export class SetForCall__Inputs {
  _call: SetForCall;

  constructor(call: SetForCall) {
    this._call = call;
  }

  get key(): string {
    return this._call.inputValues[0].value.toString();
  }

  get value(): string {
    return this._call.inputValues[1].value.toString();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get signature(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SetForCall__Outputs {
  _call: SetForCall;

  constructor(call: SetForCall) {
    this._call = call;
  }
}

export class SetManyCall extends ethereum.Call {
  get inputs(): SetManyCall__Inputs {
    return new SetManyCall__Inputs(this);
  }

  get outputs(): SetManyCall__Outputs {
    return new SetManyCall__Outputs(this);
  }
}

export class SetManyCall__Inputs {
  _call: SetManyCall;

  constructor(call: SetManyCall) {
    this._call = call;
  }

  get keys(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get values(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetManyCall__Outputs {
  _call: SetManyCall;

  constructor(call: SetManyCall) {
    this._call = call;
  }
}

export class SetManyForCall extends ethereum.Call {
  get inputs(): SetManyForCall__Inputs {
    return new SetManyForCall__Inputs(this);
  }

  get outputs(): SetManyForCall__Outputs {
    return new SetManyForCall__Outputs(this);
  }
}

export class SetManyForCall__Inputs {
  _call: SetManyForCall;

  constructor(call: SetManyForCall) {
    this._call = call;
  }

  get keys(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get values(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get signature(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SetManyForCall__Outputs {
  _call: SetManyForCall;

  constructor(call: SetManyForCall) {
    this._call = call;
  }
}