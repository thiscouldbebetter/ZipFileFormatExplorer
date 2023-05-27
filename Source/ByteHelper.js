
class ByteHelper
{
	static binaryStringToBytes(binaryString)
	{
		var bytesSoFar = [];
		for (var i = 0; i < binaryString.length; i++)
		{
			var byte = binaryString.charCodeAt(i);
			bytesSoFar.push(byte);
		}
		return bytesSoFar;
	}
 
	// "LE" = "Little Endian"
 
	static bytesToInteger16LE(bytes)
	{
		return (bytes[1] << 8) | bytes[0];
	}
 
	static bytesToInteger32LE(bytes)
	{
		return (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
	}
 
	static bytesToStringHexadecimal(bytes)
	{
		var returnValue = "";
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			var byteAsString = byte.toString(16);
			returnValue += byteAsString;
		}
		return returnValue;
	}
 
	static bytesToStringUTF8(bytes)
	{
		var returnValue = "";
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			var byteAsString = String.fromCharCode(byte);
			returnValue += byteAsString;
		}
		return returnValue;
	}
}
