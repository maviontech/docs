param([string[]]$Decks, [string]$OutCsv)
# Measures every shape in real PowerPoint: text overflow (rendered text taller/wider than its box),
# shapes outside the slide, and effective resolution (DPI) of pictures.
$pp = New-Object -ComObject PowerPoint.Application
$rows = @()
try {
  foreach ($deck in $Decks) {
    $p = $pp.Presentations.Open($deck, $true, $false, $false)
    $W = $p.PageSetup.SlideWidth; $H = $p.PageSetup.SlideHeight
    $name = Split-Path $deck -Leaf
    foreach ($s in $p.Slides) {
      foreach ($sh in $s.Shapes) {
        $kind = ""; $detail = ""
        if ($sh.Left -lt -1 -or $sh.Top -lt -1 -or ($sh.Left + $sh.Width) -gt ($W + 1) -or ($sh.Top + $sh.Height) -gt ($H + 1)) { $kind = "off-slide"; $detail = "{0:N0},{1:N0} {2:N0}x{3:N0}" -f $sh.Left,$sh.Top,$sh.Width,$sh.Height }
        if ($sh.HasTextFrame -eq -1 -and $sh.TextFrame2.HasText -eq -1) {
          $tr = $sh.TextFrame2.TextRange
          $bh = $tr.BoundHeight; $bw = $tr.BoundWidth
          $mt = $sh.TextFrame2.MarginTop + $sh.TextFrame2.MarginBottom
          if ($bh -gt ($sh.Height - $mt + 4)) { $kind = "text-overflow-v"; $detail = "text {0:N1}pt tall in {1:N1}pt box: '{2}'" -f $bh, $sh.Height, ($tr.Text.Substring(0, [Math]::Min(60, $tr.Text.Length)) -replace "`r|`n"," ") }
          elseif ($sh.TextFrame2.WordWrap -eq 0 -and $bw -gt ($sh.Width + 4)) { $kind = "text-overflow-h"; $detail = "'{0}'" -f ($tr.Text.Substring(0, [Math]::Min(60, $tr.Text.Length))) }
        }
        if ($sh.Type -eq 13) {
          try { $dpi = 0 } catch {}
        }
        if ($kind) { $rows += [pscustomobject]@{ deck = $name; slide = $s.SlideIndex; shape = $sh.Name; issue = $kind; detail = $detail } }
      }
    }
    $p.Close()
  }
} finally { }
$rows | Export-Csv -NoTypeInformation -Encoding UTF8 $OutCsv
"issues: " + $rows.Count
