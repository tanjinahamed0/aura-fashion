Add-Type -AssemblyName System.Drawing

$root = "D:\Qoder\Qwen\aura fashion showcase"
$src  = Join-Path $root "vibe_images"
$jpg  = [System.Drawing.Imaging.ImageFormat]::Jpeg
$enc  = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep   = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]84)

$map = @(
  @{ p='tee-essential-black*';        d='assets\images\products\essential-tee-black.jpg';        w=800 }
  @{ p='tee-essential-white*';        d='assets\images\products\essential-tee-white.jpg';        w=800 }
  @{ p='tee-oversized-black*';        d='assets\images\products\oversized-tee-black.jpg';        w=800 }
  @{ p='tee-oversized-sand*';         d='assets\images\products\oversized-tee-sand.jpg';         w=800 }
  @{ p='tee-heavyweight-charcoal*';   d='assets\images\products\heavyweight-tee-charcoal.jpg';   w=800 }
  @{ p='tee-longline-bone*';          d='assets\images\products\longline-tee-bone.jpg';          w=800 }
  @{ p='jersey-stripe-black*';        d='assets\images\products\retro-stripe-jersey.jpg';        w=800 }
  @{ p='jersey-club-white*';          d='assets\images\products\club-jersey-white.jpg';          w=800 }
  @{ p='jersey-mesh-black*';          d='assets\images\products\mesh-jersey-black.jpg';          w=800 }
  @{ p='jersey-vintage-grey*';        d='assets\images\products\vintage-jersey-grey.jpg';        w=800 }
  @{ p='jersey-pinstripe-black*';     d='assets\images\products\pinstripe-jersey-black.jpg';     w=800 }
  @{ p='jersey-colorblock-cream*';    d='assets\images\products\colorblock-jersey-cream.jpg';    w=800 }
  @{ p='hero-editorial*';             d='assets\images\editorial\hero.jpg';                      w=1600 }
  @{ p='cat-tshirts*';                d='assets\images\editorial\category-tshirts.jpg';          w=900 }
  @{ p='cat-jerseys*';                d='assets\images\editorial\category-jerseys.jpg';          w=900 }
  @{ p='about-editorial*';            d='assets\images\editorial\about-story.jpg';               w=1000 }
  @{ p='about-atelier*';              d='assets\images\editorial\about-atelier.jpg';             w=1000 }
  @{ p='detail-fabric*';              d='assets\images\editorial\detail-fabric.jpg';             w=900 }
)

foreach ($item in $map) {
  $file = Get-ChildItem -Path $src -Filter $item.p -File | Select-Object -First 1
  if (-not $file) { Write-Output "MISS  $($item.p)"; continue }

  $dest = Join-Path $root $item.d
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null

  $img = [System.Drawing.Image]::FromFile($file.FullName)
  $ratio = $item.w / $img.Width
  $tw = [int]($item.w)
  $th = [int]([math]::Round($img.Height * $ratio))

  $canvas = New-Object System.Drawing.Bitmap $tw, $th
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality= [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($img, 0, 0, $tw, $th)
  $canvas.Save($dest, $enc, $ep)

  $g.Dispose(); $canvas.Dispose(); $img.Dispose()
  Write-Output ("OK    {0}  {1}x{2}  {3:N0} KB" -f $item.d, $tw, $th, ((Get-Item $dest).Length/1KB))
}
