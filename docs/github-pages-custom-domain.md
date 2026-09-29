# GitHub Pages custom-domain handoff

This repository is the account Pages site for `SonJunHyuck`, so its default address is
`https://sonjunhyuck.github.io/`. Do not add a custom domain until you own it and have
verified it in GitHub.

## Values to choose

Replace these placeholders only after choosing the domain:

| Placeholder | Example | Purpose |
| --- | --- | --- |
| `<APEX_DOMAIN>` | `example.com` | The registered root domain. |
| `<CANONICAL_DOMAIN>` | `www.example.com` | The one public address the site will use. Recommended. |
| `<GITHUB_PAGES_HOST>` | `sonjunhyuck.github.io` | The GitHub Pages hostname; do not append the repository name. |

Using `www` as the canonical domain is recommended. Configure both the apex and
`www` records so GitHub can redirect the non-canonical address.

## Safe order of operations

1. In GitHub account settings, open **Pages** → **Verified domains**, add
   `<APEX_DOMAIN>`, and create the TXT record GitHub gives you. Keep that TXT record
   permanently after verification.
2. In the repository, open **Settings** → **Pages**. Confirm GitHub Pages is enabled
   and the deployment source is the intended GitHub Actions workflow. The site must
   stay enabled while its DNS records point to GitHub.
3. In the same Pages screen, set **Custom domain** to `<CANONICAL_DOMAIN>` and save.
   Do this *before* adding the public DNS records.
4. At the DNS provider, create the following records. Remove conflicting records at
   the same host; do not use a wildcard (`*`) record.

   | Type | Name/host | Value |
   | --- | --- | --- |
   | `A` | `@` | `185.199.108.153` |
   | `A` | `@` | `185.199.109.153` |
   | `A` | `@` | `185.199.110.153` |
   | `A` | `@` | `185.199.111.153` |
   | `AAAA` (optional but recommended) | `@` | `2606:50c0:8000::153` |
   | `AAAA` (optional but recommended) | `@` | `2606:50c0:8001::153` |
   | `AAAA` (optional but recommended) | `@` | `2606:50c0:8002::153` |
   | `AAAA` (optional but recommended) | `@` | `2606:50c0:8003::153` |
   | `CNAME` | `www` | `sonjunhyuck.github.io` |

   If your provider supports `ALIAS` or `ANAME`, it may be used for `@` instead of
   the `A`/`AAAA` records; point it to `sonjunhyuck.github.io`.
5. Wait for DNS propagation (it can take up to 24 hours), then run the validation
   command below.
6. Back in **Settings** → **Pages**, enable **Enforce HTTPS** once GitHub makes the
   option available. Test both `https://<APEX_DOMAIN>` and
   `https://<CANONICAL_DOMAIN>`; one should redirect to the canonical HTTPS URL.
7. Update Astro's production URL so sitemap and canonical links use the custom
   domain. In `astro.config.mjs` (or `astro.config.ts`), add the exact chosen URL:

   ```js
   export default defineConfig({
     site: 'https://<CANONICAL_DOMAIN>',
   });
   ```

   Do not create `public/CNAME` for the GitHub Actions deployment workflow: GitHub
   Pages uses the Custom domain setting above, and ignores a `CNAME` file in a custom
   Actions deployment artifact.

## Validate from Windows PowerShell

After DNS propagation, run:

```powershell
.\scripts\Test-GitHubPagesDomain.ps1 -ApexDomain '<APEX_DOMAIN>' -CanonicalDomain '<CANONICAL_DOMAIN>'
```

The script only reads DNS and HTTPS responses; it does not change any provider or
GitHub settings. A DNS check can pass before GitHub has completed TLS certificate
issuance, so retry later if HTTPS enforcement is still unavailable.

## References

- [GitHub: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Astro: configuration overview](https://docs.astro.build/en/guides/configuring-astro/)
