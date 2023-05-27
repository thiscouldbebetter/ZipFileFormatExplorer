
class ZipFileCentralDirectoryEntry
{
	constructor
	(
		signature,
		versionMadeBy,
		versionNeededToExtract,
		flags,
		compressionMethod,
		timeLastModified,
		crc32,
		sizeCompressedInBytes,
		sizeUncompressedInBytes,
		filename,
		extraFieldAsHexadecimal,
		fileComment,
		diskNumber,
		fileAttributesInternal,
		fileAttributesExternal,
		offsetOfLocalHeader
	)
	{
		// A "central directory" entry
		// is an expanded version of the "local" file entry header.
	 
		this.signature = signature;
		this.versionMadeBy = versionMadeBy;
		this.versionNeededToExtract = versionNeededToExtract;
		this.flags = flags;
		this.compressionMethod = compressionMethod;
		this.timeLastModified = timeLastModified;
		this.crc32 = crc32; // "crc32" = "32-bit cyclical redundancy check" - Validates file not corrupt.
		this.sizeCompressedInBytes = sizeCompressedInBytes;
		this.sizeUncompressedInBytes = sizeUncompressedInBytes;
		this.filename = filename;
		this.extraFieldAsHexadecimal = extraFieldAsHexadecimal;
		this.fileComment = fileComment;
		this.diskNumber = diskNumber;
		this.fileAttributesInternal = fileAttributesInternal;
		this.fileAttributesExternal = fileAttributesExternal;
		this.offsetOfLocalHeader = offsetOfLocalHeader;
	}

	static Signature = 33639248;
}
