
class ZipFileLocalFileHeader
{
	constructor
	(
		signature,
		versionNeededToExtract,
		flags,
		compressionMethod,
		timeLastModified,
		crc32,
		sizeCompressedInBytes,
		sizeUncompressedInBytes,
		filename,
		extraFieldAsHexadecimal
	)
	{
		// This is a "central directory" file header,
		// which is an expanded version of the "local" file header.
	 
		this.signature = signature;
		this.versionNeededToExtract = versionNeededToExtract;
		this.flags = flags;
		this.compressionMethod = compressionMethod;
		this.timeLastModified = timeLastModified;
		this.crc32 = crc32;
		this.sizeCompressedInBytes = sizeCompressedInBytes;
		this.sizeUncompressedInBytes = sizeUncompressedInBytes;
		this.filename = filename;
		this.extraFieldAsHexadecimal = extraFieldAsHexadecimal;
	}

	static Signature = 67324752;
}