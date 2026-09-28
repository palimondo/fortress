;; drive.el: batch region-mode fortify of each %-source block in the files named on the command line
(load (expand-file-name "Fortify/fortify.el" (getenv "FORTRESS_HOME")))
(dolist (f command-line-args-left)
  (with-temp-buffer
    (insert-file-contents f)
    (latex-mode)
    (goto-char (point-max))
    (set-mark (point-min))
    (goto-char (point-max))
    (fortify 4)
    (princ (format "=== %s\n%s\n" f (buffer-string)))))
(setq command-line-args-left nil)
