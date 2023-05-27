
class ZipFile
{
	constructor
	(
		entriesLocal, entriesCentralDirectory, centralDirectoryEndRecord
	)
	{
		this.entriesLocal = entriesLocal;
		this.entriesCentralDirectory = entriesCentralDirectory;
		this.centralDirectoryEndRecord = centralDirectoryEndRecord;
	}

	static fromBytes(bytes)
	{
		var entriesLocal = [];
		var entriesCentralDirectory = [];
		var centralDirectoryEndRecord = null;
 
		var reader = new ByteStream(bytes);
 
		while (reader.hasMore() == true)
		{
			var signature = reader.readInteger32LE();
			if (signature == ZipFileLocalFileHeader.Signature)
			{
				// It's a local file header.
				var versionNeededToExtract = reader.readInteger16LE();
				var flags = reader.readInteger16LE();
				var compressionMethod = reader.readStringUTF8(2);
 
				var timeLastModified = ZipFile.fromBytes_ReadTimeFromByteStream(reader);
 
				var crc32 = reader.readInteger32LE();
				var sizeCompressedInBytes = reader.readInteger32LE();
				var sizeUncompressedInBytes = reader.readInteger32LE();
				var filenameLength = reader.readInteger16LE();
				var extraFieldLength = reader.readInteger16LE();
				var filename = reader.readStringUTF8(filenameLength);
				var extraFieldAsHexadecimal = reader.readStringHexadecimal(extraFieldLength);
 
				var entryHeader = new ZipFileLocalFileHeader
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
				);
 
				var entryDataCompressedAsStringHexadecimal =
					reader.readStringHexadecimal(sizeCompressedInBytes);
 
				var entry = new ZipFileLocalFileEntry(entryHeader, entryDataCompressedAsStringHexadecimal);
 
				entriesLocal.push(entry);
			}
			else if (signature == ZipFileCentralDirectoryEntry.Signature)
			{
				// It's a central directory file header.
				var versionMadeBy = reader.readInteger16LE();
				var versionNeededToExtract = reader.readInteger16LE();
				var flags = reader.readInteger16LE();
				var compressionMethod = reader.readStringUTF8(2);
				var timeLastModified = ZipFile.fromBytes_ReadTimeFromByteStream(reader);
				var crc32 = reader.readInteger32LE();
				var sizeCompressedInBytes = reader.readInteger32LE();
				var sizeUncompressedInBytes = reader.readInteger32LE();
				var filenameLength = reader.readInteger16LE();
				var extraFieldLength = reader.readInteger16LE();
				var fileCommentLength = reader.readInteger16LE();
				var diskNumber = reader.readInteger16LE();
				var fileAttributesInternal = reader.readInteger16LE();
				var fileAttributesExternal = reader.readInteger32LE();
				var offsetOfLocalHeader = reader.readInteger32LE();
				var filename = reader.readStringUTF8(filenameLength);
				var extraFieldAsHexadecimal = reader.readStringHexadecimal(extraFieldLength);
				var fileComment = reader.readStringUTF8(fileCommentLength);
 
				var entry = new ZipFileCentralDirectoryEntry
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
				);
 
				entriesCentralDirectory.push(entry);
			}
			else if (signature == ZipFileCentralDirectoryEndRecord.Signature)
			{
				// It's an end of central directory record.
				var diskNumber = reader.readInteger16LE();
				var diskStart = reader.readInteger16LE();
				var recordsOnDisk = reader.readInteger16LE();
				var recordsTotal = reader.readInteger16LE();
				var sizeInBytes = reader.readInteger32LE();
				var offset = reader.readInteger32LE();
				var commentLength = reader.readInteger16LE();
				var comment = reader.readStringUTF8(commentLength);
 
				centralDirectoryEndRecord = new ZipFileCentralDirectoryEndRecord
				(
					diskNumber,
					diskStart,
					recordsOnDisk,
					recordsTotal,
					sizeInBytes,
					offset,
					comment
				);
			}
			else
			{
				throw "Unexpected format."
			}
		}
 
		var returnValue = new ZipFile(entriesLocal, entriesCentralDirectory, centralDirectoryEndRecord);
		return returnValue;
	}
 
	static fromBytes_ReadTimeFromByteStream(reader)
	{
		// Based on the timestamp format for the FAT filesystem,
		// made popular by Microsoft's MS-DOS.
 
		var hours5Bits_Minutes6Bits_DualSeconds5Bits = reader.readInteger16LE();
		var hours = (hours5Bits_Minutes6Bits_DualSeconds5Bits >> 11);
		var minutes = (hours5Bits_Minutes6Bits_DualSeconds5Bits >> 5) & 0x3F;
		var secondsOver2 = hours5Bits_Minutes6Bits_DualSeconds5Bits & 0x1F;
		var seconds = secondsOver2 * 2;
 
		var years7Bits_Month4Bits_Days5Bits = reader.readInteger16LE();
		var fatFilesystemEpochYear = 1980;
		var year = (years7Bits_Month4Bits_Days5Bits >> 9) + fatFilesystemEpochYear;
		var month = ((years7Bits_Month4Bits_Days5Bits >> 5) & 0xF) - 1;
		var day = (years7Bits_Month4Bits_Days5Bits) & 0x1F;
 
		var returnValue = new Date(year, month, day, hours, minutes, seconds, 0);
		return returnValue;
	}
 
	// instance methods
 
	toStringJSON()
	{
		var indentSizeInSpaces = 2;
		var returnValue = JSON.stringify(this, null, indentSizeInSpaces);
		return returnValue;
	}
}
