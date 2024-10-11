#quick push file
git add .
read -p 'Commit message: ' commit
git commit -m "$commit"
git push