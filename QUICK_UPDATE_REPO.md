# Quick Update Repo

Use this package to update the GitHub repository with the bilingual README version.

```bash
cd /workspaces/skillforge-ai-bootcamp

unzip -o skillforge-ai-bootcamp-bilingual-readme.zip
rsync -a skillforge-ai-bootcamp/ ./
rm -rf skillforge-ai-bootcamp
rm -f *.zip *.apk

git add -A
git commit -m "docs: add bilingual Vietnamese and English README"
git push origin main
```

After pushing, refresh GitHub. The README should include both Vietnamese and English sections.
