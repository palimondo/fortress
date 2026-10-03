(*******************************************************************************
    Copyright 2008, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************)

api Writer
import Stream.{...}

stdOut: Writer
stdErr: Writer

object Writer(fileName: String) extends WriteStream
    getter fileName(): String
end

object BufferedWriter(under: WriteStream, size: ZZ32) extends WriteStream
end

end
