# פתיחת ShowShelf ב־Visual Studio Code

## במחשב הנוכחי

1. פתח Visual Studio Code.
2. בחר **File → Open Folder** ופתח את התיקייה הבאה (התיקייה שבה package.json):

```text
C:\Users\asaf0\Documents\Codex\2026-10-30\https-app-notion-com-p-4255\outputs\ShowShelf
```

אפשר גם לבחור **File → Open Workspace from File** ולפתוח את `ShowShelf.code-workspace` שבתיקייה הזאת. הקובץ מפנה לתיקיית הפרויקט באמצעות נתיב יחסי, ולכן עובד גם אם מעבירים את כל הפרויקט.

3. בחר **Terminal → New Terminal**. ודא שהטרמינל נמצא בתיקיית ShowShelf.
4. במחשב הנוכחי node זמין, אך npm לא נמצא ב־PATH. לכן הרץ:

```powershell
node ../../work/npm-runtime/package/bin/npm-cli.js run dev
```

5. פתח בדפדפן את כתובת Local שהטרמינל מציג. אם פורט תפוס, Vite יכול לבחור פורט אחר; אין להניח שתמיד מדובר ב־5173 או ב־5174. השאר את הטרמינל פועל; Ctrl+C עוצר את השרת שהפעלת.

הפקודה הזאת משתמשת בהתקנת npm המקומית של סביבת העבודה, מחוץ למאגר. היא אינה דרך ההתקנה למחשב אחר. אין צורך להתקין שוב את התלויות שכבר קיימות כאן.

## במחשב עם Node.js ו־npm מותקנים כרגיל

מתוך תיקיית הפרויקט:

```powershell
npm ci
npm run dev
```

אם PowerShell חוסם את npm.ps1, אפשר להשתמש ב־`npm.cmd ci` ו־`npm.cmd run dev` בלי לשנות את מדיניות האבטחה. אם גם npm.cmd אינו מזוהה, יש לבדוק את התקנת Node/npm ואת PATH ולפתוח טרמינל חדש.

## מה עורכים

- `src/pages` — ארבעת עמודי האפליקציה ועמוד כתובת לא קיימת.
- `src/components` — רכיבים משותפים כגון כרטיס סדרה וכפתור מועדפים.
- `src/App.tsx` — הנתיבים ורשימת המועדפים המשותפת.
- `src/utils` — חיפוש, מועדפים ועיבוד נתונים עם בדיקות.
- `src/App.css` ו־`src/index.css` — העיצוב.

שומרים קובץ עם Ctrl+S; Vite מעדכן את התצוגה. לא עורכים את dist או node_modules. GitHub מציג את הקוד והקומיטים; הדפדפן בכתובת Local מציג את האפליקציה.

## לפני קומיט

במחשב הנוכחי:

```powershell
node ../../work/npm-runtime/package/bin/npm-cli.js test
node ../../work/npm-runtime/package/bin/npm-cli.js run build
node ../../work/npm-runtime/package/bin/npm-cli.js run lint
```

בהתקנה רגילה: `npm test`, `npm run build`, `npm run lint`. לפתיחת Vitest UI: `npm run test:ui` (או אותה החלפה ל־node במחשב הנוכחי).

בדוק את השינוי באתר, הוסף רק הערה אישית אמיתית על מה שבדקת ושינית, ועבור ב־Source Control על הקבצים לפני קומיט. כל משימה צריכה שינוי ותיאור משלה; אין ליצור קומיטים ריקים כדי להגדיל את המספר. אל תוסיף סודות לפרומפטים או לקוד, כי המאגר ציבורי.

פתיחת VS Code לבדה לא מוכיחה שיומן הפרומפטים האוטומטי פעיל. יש לבדוק שהודעה חדשה לסוכן מתוך הפרויקט מופיעה ב־PROMPTS.md, בהתאם ל־STARTER-README.md. מגבלות ההיסטוריה הקיימת מתועדות ב־course-audit.md.
