(*******************************************************************************
    Copyright 2008,2009, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************)

api Reader
import FlatString.FlatString
import Stream.{...}
stdIn: Reader

Reader(fileName: String): Reader

object Reader(fileName: String, under: JavaBufferedReader) (* extends ReadStream *)
    getter asString(): String
    getter eof(): Boolean
    getter isReady(): Boolean

    whenUnconsumed(): ()
    consume(): ()
    uncheckedReadLine(): String
    uncheckedReadChar(): ZZ32
    uncheckedRead(k: ZZ32): String
    close(): ()
end

end
