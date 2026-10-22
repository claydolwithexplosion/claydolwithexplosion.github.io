gci .\_includes\out\ -Filter *.md | foreach-object {
	gc $_.FullName | sc -Encoding utf8 "${$_.FullName}_utf8"
	move-item -Path "${$_.FullName}_utf8" -Destination $_.FullName -Force
}