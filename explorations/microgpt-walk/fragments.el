;; Fortifies each backtick-delimited fragment of the buffer, as Fortify's fortick does, but one fragment's
;; error does not stop the rest: the fragment is replaced by @@ERR <message>@@. Writes <name>.tex.
(defun walk-fragments ()
  (goto-char (point-min))
  (while (search-forward "`" nil t)
    (let* ((open (- (point) 1))
           (close (progn (search-forward "`" nil t) (point)))
           (out (condition-case err
                    (newfortify-region (+ open 1) (- close 1))
                  (error (concat "@@ERR " (format "%S" err) "@@")))))
      (delete-region open close)
      (goto-char open)
      (insert out)))
  (write-region (point-min) (point-max) (concat (file-name-sans-extension (buffer-file-name)) ".tex")))

;; Fortifies the whole buffer as one block of code (a file may hold a backtick, which fortick would take
;; as the end of the code). Writes <name>.tex.
(defun walk-file ()
  (let ((out (newfortify-region (point-min) (point-max))))
    (erase-buffer)
    (insert out))
  (write-region (point-min) (point-max) (concat (file-name-sans-extension (buffer-file-name)) ".tex")))
