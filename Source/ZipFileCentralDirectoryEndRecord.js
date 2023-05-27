
class ZipFileCentralDirectoryEndRecord
{
	constructor
	(
		diskNumber,
		diskStart,
		recordsOnDisk,
		recordsTotal,
		sizeInBytes,
		offset,
		comment
	)
	{
		this.diskNumber = diskNumber;
		this.diskStart = diskStart;
		this.recordsOnDisk = recordsOnDisk;
		this.recordsTotal = recordsTotal;
		this.sizeInBytes = sizeInBytes;
		this.offset = offset;
		this.comment = comment;
	}

	static Signature = 101010256;
}
