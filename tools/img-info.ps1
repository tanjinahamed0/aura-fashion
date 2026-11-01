param([string]$dir = ".")
Add-Type -AssemblyName System.Drawing
Get-ChildItem -Path (Join-Path $dir '*') -Include *.png,*.jpg -File | ForEach-Object {
  $b = [System.Drawing.Image]::FromFile($_.FullName)
  "{0,-34} {1,5} x {2,5}   {3,7:N0} KB" -f $_.Name, $b.Width, $b.Height, ($_.Length / 1KB)
  $b.Dispose()
}
