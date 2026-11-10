param([string]$Pptx, [string]$OutDir, [string]$Pdf = "")
# Renders every slide of a deck with real PowerPoint (PNG 1600x900) and optionally saves a PDF.
New-Item -ItemType Directory -Force $OutDir | Out-Null
Get-ChildItem $OutDir -Filter *.png | Remove-Item -Confirm:$false
$pp = New-Object -ComObject PowerPoint.Application
try {
  $p = $pp.Presentations.Open($Pptx, $true, $false, $false)
  if ($Pdf) { $p.SaveAs($Pdf, 32) }
  for ($i = 1; $i -le $p.Slides.Count; $i++) { $p.Slides.Item($i).Export(("{0}\s{1:D2}.png" -f $OutDir, $i), "PNG", 1600, 900) }
  "{0}: {1} slides rendered in PowerPoint" -f (Split-Path $Pptx -Leaf), $p.Slides.Count
  $p.Close()
} finally { $pp.Quit() }
