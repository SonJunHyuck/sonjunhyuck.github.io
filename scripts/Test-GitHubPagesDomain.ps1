[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidatePattern('^[A-Za-z0-9.-]+$')]
    [string]$ApexDomain,

    [Parameter(Mandatory)]
    [ValidatePattern('^[A-Za-z0-9.-]+$')]
    [string]$CanonicalDomain
)

$ExpectedIPv4 = @(
    '185.199.108.153',
    '185.199.109.153',
    '185.199.110.153',
    '185.199.111.153'
)

function Get-DnsValues {
    param([string]$Name, [string]$Type)

    try {
        @(Resolve-DnsName -Name $Name -Type $Type -ErrorAction Stop |
            Where-Object { $_.Type -eq $Type } |
            ForEach-Object { $_.IPAddress ?? $_.NameHost })
    }
    catch {
        @()
    }
}

$apexA = Get-DnsValues -Name $ApexDomain -Type 'A'
$canonicalCname = Get-DnsValues -Name $CanonicalDomain -Type 'CNAME'

Write-Host "A records for $ApexDomain: $($apexA -join ', ')"
Write-Host "CNAME record for $CanonicalDomain: $($canonicalCname -join ', ')"

$missingA = $ExpectedIPv4 | Where-Object { $_ -notin $apexA }
if ($missingA) {
    Write-Warning "Missing expected GitHub Pages A record(s): $($missingA -join ', ')"
}
else {
    Write-Host 'Apex A records match GitHub Pages.'
}

if ($canonicalCname -match '(^|\.)sonjunhyuck\.github\.io\.?$') {
    Write-Host 'Canonical CNAME points to the GitHub Pages host.'
}
else {
    Write-Warning 'Canonical CNAME does not yet resolve to sonjunhyuck.github.io.'
}

foreach ($url in @("https://$ApexDomain", "https://$CanonicalDomain")) {
    try {
        $response = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -SkipHttpErrorCheck -ErrorAction Stop
        Write-Host "$url -> HTTP $($response.StatusCode)"
    }
    catch {
        Write-Warning "$url could not be reached over HTTPS: $($_.Exception.Message)"
    }
}

if ($missingA -or -not ($canonicalCname -match '(^|\.)sonjunhyuck\.github\.io\.?$')) {
    exit 1
}
