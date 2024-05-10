export declare interface DataTypeSize {
  get size(): number;
}

export declare interface DataType<T> extends DataTypeSize {
  get value(): T;
  set value(value: T);
  decode(data: DataView, offset: number): void;
  encode(data: DataView, offset: number): void;
}

export declare interface Struct {
  buffer(): Uint8Array
}

export class array<T extends DataType<V>, V = T> implements DataType<V[]> {
  private v: V[] = []

  constructor(
    private factory: () => T,
    private count: number,
  ) {
    const inst = factory()
    for(let i=0; i<count; i++) {
      this.v.push(inst.value)
    }
  }

  splice(start: number, deleteCount?: number, ...items: V[]) {
    if (deleteCount !== undefined) {
      this.v.splice(start, deleteCount, ...items);
    } else {
      this.v.splice(start, deleteCount);
    }
    this.count = this.v.length
  }

  push(...v: V[]) {
    this.v.push(...v);
    this.count = this.v.length
  }

  get length() {
    return this.count
  }

  get size() {
    let sizer = this.v[0] as DataTypeSize
    if (sizer.size) {
      let size = 0
      for (let i = 0; i < this.v.length; i++) {
        sizer = this.v[i] as DataTypeSize
        size += sizer.size
      }
      return size
    } else {
      const inst = this.factory()
      return inst.size * this.length
    }
  }

  get value() {
    return this.v
  }

  decode(data: DataView, offset: number): void {
    this.v = []
    for (let i = 0; i < this.length; i++) {
      const inst = this.factory()
      inst.decode(data, offset)
      this.v.push(inst.value)
      offset += inst.size
    }
  }

  encode(data: DataView, offset: number): void {
    if ((this.v[0] as DataType<V>).encode) {
      for (let i = 0; i < this.length; i++) {
        const setter = this.v[i] as DataType<V>
        setter.encode(data, offset)
        offset += setter.size
      }
    } else {
      const setter = this.factory()
      for (let i = 0; i < this.length; i++) {
        setter.value = this.v[i]
        setter.encode(data, offset)
        offset += setter.size
      }
    }
  }
}

export class int8_t implements DataType<number> {
  private v: number = 0
  public size = 1

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getInt8(offset)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setInt8(offset, this.v)
  }
}

export class uint8_t implements DataType<number> {
  private v: number = 0
  public size = 1

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getUint8(offset)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setUint8(offset, this.v)
  }
}

export class int16_t implements DataType<number> {
  private v: number = 0
  public size = 2

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getInt16(offset, true)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setInt16(offset, this.v, true)
  }
}

export class uint16_t implements DataType<number> {
  private v: number = 0
  public size = 2

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getUint16(offset, true)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setUint16(offset, this.v, true)
  }
}

export class int32_t implements DataType<number> {
  private v: number = 0
  public size = 4

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getInt32(offset, true)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setInt32(offset, this.v, true)
  }
}

export class uint32_t implements DataType<number> {
  private v: number = 0
  public size = 4

  constructor() {
  }

  get value() {
    return this.v
  }

  public decode(data: DataView, offset: number) {
    this.v = data.getUint32(offset, true)
  }

  set value(v: number) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {
    data.setUint32(offset, this.v, true)
  }
}

export class bytes implements DataType<Uint8Array> {
  private v: Uint8Array

  constructor(length: number) {
    this.v = new Uint8Array(length)
  }

  get size() {
    return this.v.length
  }

  get value() {
    return this.v
  }

  set value(value: Uint8Array) {
    this.v = new Uint8Array(value)
  }

  decode(data: DataView, offset: number): void {
    this.v = new Uint8Array(data.buffer.slice(offset, offset + this.v.length))
  }

  encode(data: DataView, offset: number): void {
    for (const b of this.v) {
      data.setUint8(offset, b)
      offset ++
    }
  }
}

export class internal<T> implements DataType<T> {
  private v: T

  constructor(v: T) {
    this.v = v
  }

  get size() {
    return 0
  }

  get value() {
    return this.v
  }
  set value(v: T) {
    this.v = v
  }

  public encode(data: DataView, offset: number): void {}
  public decode(data: DataView, offset: number): void {}
}
