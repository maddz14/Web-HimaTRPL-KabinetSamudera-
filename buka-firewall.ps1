# Script untuk membuka port 3000 dan 8000 di Windows Firewall
# Jalankan script ini sebagai Administrator

$rules = @(
    @{Name="Himaprodi TRPL Frontend Port 3000"; Port=3000},
    @{Name="Himaprodi TRPL Backend Port 8000"; Port=8000}
)

foreach ($rule in $rules) {
    # Hapus rule lama jika ada
    $existing = Get-NetFirewallRule -DisplayName $rule.Name -ErrorAction SilentlyContinue
    if ($existing) {
        Remove-NetFirewallRule -DisplayName $rule.Name
        Write-Host "Dihapus rule lama: $($rule.Name)"
    }
    
    # Buat rule baru
    New-NetFirewallRule `
        -DisplayName $rule.Name `
        -Direction Inbound `
        -Protocol TCP `
        -LocalPort $rule.Port `
        -Action Allow `
        -Profile Any
    
    Write-Host "Berhasil dibuka port $($rule.Port)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Selesai! Coba buka di HP:" -ForegroundColor Cyan
Write-Host "http://10.252.212.109:3000" -ForegroundColor Yellow
