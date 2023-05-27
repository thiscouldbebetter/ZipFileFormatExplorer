
class ByteStream
{
	constructor(bytes)
	{
		this.bytes = bytes;
		this.byteOffset = 0;
	 
		this.byteBuffer = [];
	}

	hasMore()
	{
		return this.byteOffset < this.bytes.length;
	}
 
	readByte()
	{
		var byteRead = this.bytes[this.byteOffset];
		this.byteOffset++;
 
		return byteRead;
	}
 
	readBytes(byteCount)
	{
		return this.readBytesIntoBuffer(byteCount).slice();
	}
 
	readBytesIntoBuffer(byteCount)
	{
		this.byteBuffer.length = 0;
		for (var i = 0; i < byteCount; i++)
		{
			var byteRead = this.readByte();
			this.byteBuffer.push(byteRead);
		}
		return this.byteBuffer;
	}
 
	// "LE" = "Little Endian"
 
	readInteger16LE()
	{
		return ByteHelper.bytesToInteger16LE(this.readBytesIntoBuffer(2));
	}
 
	readInteger32LE()
	{
		return ByteHelper.bytesToInteger32LE(this.readBytesIntoBuffer(4));
	}
 
	readStringHexadecimal(length)
	{
		return ByteHelper.bytesToStringHexadecimal(this.readBytesIntoBuffer(length));
	}
 
	readStringUTF8(length)
	{
		return ByteHelper.bytesToStringUTF8(this.readBytesIntoBuffer(length));
	}
}
