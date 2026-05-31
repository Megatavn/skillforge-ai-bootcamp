# Quick Update Commands

Use these commands in Codespace to apply this cleaned portfolio version to the current GitHub repo.

```bash
cd /workspaces/skillforge-ai-bootcamp

unzip -o skillforge-ai-bootcamp-github-final.zip
rsync -a skillforge-ai-bootcamp/ ./
rm -rf skillforge-ai-bootcamp
rm -f *.zip *.apk

git add -A
git commit -m "docs: polish final portfolio version"
git push origin main
```

After pushing, create a GitHub Release and upload the APK manually if needed.
